"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserProfileByQRId, UserProfileData } from "@/lib/firebase/userService";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/shared/container/Container";
import Loader from "@/components/shared/loader/Loader";
import EmergencyProfileCard from "./EmergencyProfileCard";
import PersonalDataSection from "./PersonalDataSection";
import MedicalDataSection from "./MedicalDataSection";
import EmergencyContactsSection from "./EmergencyContactsSection";

function getFirstEmergencyContactPhone(
  emergencyContacts: UserProfileData["emergencyData"]["emergencyContacts"]
): string | null {
  const validContact = emergencyContacts.find((contact) => contact.phone);
  return validContact?.phone || null;
}

export default function EmergencyInfoPage() {
  const params = useParams();
  const qrId = params?.qrId as string;
  const locale = useLocale();
  const t = useTranslations("emergencyInfoPage");
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!qrId) {
        setError("QR-ID not provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfileByQRId(qrId);
        setProfileData(data);
        if (!data) {
          setError("User profile not found");
          setLoading(false);
          return;
        }

        // Відправляємо SMS на всі екстрені контакти тільки якщо користувач дозволив
        const shouldSendSMS = data.emergencyData?.sendSMS === true;
        
        if (shouldSendSMS) {
          const emergencyContacts = data.emergencyData?.emergencyContacts || [];
          const phoneNumbers = emergencyContacts
            .map((contact) => contact.phone)
            .filter((phone): phone is string => Boolean(phone));

          if (phoneNumbers.length > 0) {
            const fullName = `${data.personalData.name || ""} ${
              data.personalData.surname || ""
            }`.trim();
            const ownerName = fullName || t("profile.ownerName") || "Власник QR-коду";
            const qrIdFromProfile = data.qrId || qrId;
            
            // Запитуємо дозвіл на геопозицію
            let locationInfo = "";
            let locationSent = false;
            
            try {
              const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                if (!navigator.geolocation) {
                  reject(new Error("Geolocation is not supported"));
                  return;
                }
                
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    resolve(pos);
                  },
                  (err) => {
                    reject(err);
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                  }
                );
              });

              const { latitude, longitude } = position.coords;
              // Формуємо посилання на Google Maps
              const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
              locationInfo = `\n${t("smsLocation", { location: mapsLink })}`;
              locationSent = true;
            } catch (geoError) {
              // Якщо дозвіл не надано або геолокація недоступна - продовжуємо без координат
              console.warn("Geolocation not available or permission denied:", geoError);
              
              // Спробуємо отримати геолокацію пізніше, якщо користувач надасть дозвіл
              if (navigator.geolocation) {
                // Використовуємо watchPosition для відстеження зміни дозволу
                const watchId = navigator.geolocation.watchPosition(
                  (pos) => {
                    // Якщо отримали позицію після першої відправки, відправляємо додаткове SMS
                    if (!locationSent) {
                      const { latitude, longitude } = pos.coords;
                      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                      const locationOnlyMessage = t("smsLocation", { location: mapsLink });
                      
                      // Відправляємо додаткове SMS тільки з геолокацією
                      fetch("/api/sms", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          phoneNumbers,
                          message: locationOnlyMessage,
                          qrId: qrIdFromProfile,
                          ownerName,
                        }),
                      }).catch((err) => {
                        console.error("Error sending location-only SMS:", err);
                      });
                      
                      locationSent = true;
                      // Зупиняємо відстеження після першого успішного отримання
                      navigator.geolocation.clearWatch(watchId);
                    }
                  },
                  (err) => {
                    // Помилка отримання геолокації - зупиняємо відстеження через 30 секунд
                    setTimeout(() => {
                      navigator.geolocation.clearWatch(watchId);
                    }, 30000);
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                  }
                );
                
                // Зупиняємо відстеження через 30 секунд, якщо дозвіл так і не надано
                setTimeout(() => {
                  navigator.geolocation.clearWatch(watchId);
                }, 30000);
              }
            }
            
            // Формуємо повідомлення з використанням перекладів
            const smsTemplate = t("smsNotification", {
              qrId: qrIdFromProfile,
              ownerName: ownerName,
            });
            const baseMessage = smsTemplate || `QrCode ScanMe номер ${qrIdFromProfile}. ${ownerName} було відскановано. Ймовірно трапилась екстренна ситуація.`;
            const message = baseMessage + locationInfo;

            try {
              const smsResponse = await fetch("/api/sms", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  phoneNumbers,
                  message,
                  qrId: qrIdFromProfile,
                  ownerName,
                }),
              });
              
              const smsResult = await smsResponse.json();
              
              if (!smsResponse.ok) {
                console.error("SMS API error:", smsResult);
              }
            } catch (smsError) {
              console.error("Error sending SMS notifications:", smsError);
              // Тиха помилка - не впливає на відображення сторінки
            }
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [qrId]);

  const handleCallEmergency = () => {
    if (!profileData) return;

    const phone = getFirstEmergencyContactPhone(
      profileData.emergencyData.emergencyContacts
    );
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getSMSLink = (): string | null => {
    if (!profileData) return null;

    const phone = getFirstEmergencyContactPhone(
      profileData.emergencyData.emergencyContacts
    );
    if (!phone) return null;

    // Отримуємо повне ім'я
    const fullName = `${profileData.personalData.name || ""} ${
      profileData.personalData.surname || ""
    }`.trim();
    const ownerName = fullName || t("profile.ownerName") || "Власник QR-коду";
    const qrIdFromProfile = profileData.qrId || qrId;

    // Використовуємо той самий текст, що відправляється через API
    const smsTemplate = t("smsNotification", {
      qrId: qrIdFromProfile,
      ownerName: ownerName,
    });
    const message = smsTemplate || `QrCode ScanMe номер ${qrIdFromProfile}. ${ownerName} було відскановано. Ймовірно трапилась екстренна ситуація.`;

    return `sms:${phone}?body=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">
              {error || t("notFound")}
            </h1>
            <p className="text-black">{t("errorDescription")}</p>
          </div>
        </Container>
      </div>
    );
  }

  const qrIdFromProfile = profileData?.qrId || qrId;
  const emergencyPhone = getFirstEmergencyContactPhone(
    profileData.emergencyData.emergencyContacts
  );
  const smsLink = getSMSLink();

  return (
    <div className="pb-15 lg:py-15">
      <EmergencyProfileCard
            profileData={profileData}
            qrId={qrIdFromProfile}
            emergencyPhone={emergencyPhone}
            smsLink={smsLink}
            onCallEmergency={handleCallEmergency}
               className="block lg:hidden"
          />

      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 pt-[252px] lg:pt-0">
          {/* Profile Card */}
          <EmergencyProfileCard
            profileData={profileData}
            qrId={qrIdFromProfile}
            emergencyPhone={emergencyPhone}
            smsLink={smsLink}
            onCallEmergency={handleCallEmergency}
            className="hidden lg:block"
          />

        <div className="flex-1">  {/* Personal Data */}
   
          <PersonalDataSection personalData={profileData.personalData} />

          {/* Medical Data */}
          <MedicalDataSection 
            medicalData={profileData.medicalData}
            isLast={
              !profileData.emergencyData.emergencyContacts ||
              profileData.emergencyData.emergencyContacts.length === 0
            }
          />

          {/* Emergency Contacts */}
          {profileData.emergencyData.emergencyContacts &&
            profileData.emergencyData.emergencyContacts.length > 0 && (
              <EmergencyContactsSection
                emergencyContacts={profileData.emergencyData.emergencyContacts}
                onCallContact={handleCallContact}
                isLast={true}
              />
            )}</div>
        </div>
      </Container>
    </div>
  );
}
