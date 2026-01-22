"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserProfileByQRId, UserProfileData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";
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

  const handleSendSMS = () => {
    if (!profileData) return;

    const phone = getFirstEmergencyContactPhone(
      profileData.emergencyData.emergencyContacts
    );
    if (phone) {
      // Отримуємо повне ім'я
      const fullName = `${profileData.personalData.name || ""} ${
        profileData.personalData.surname || ""
      }`.trim();

      // Створюємо текст SMS
      const message = `Екстрена ситуація! Потрібна допомога для ${fullName || "власника QR-коду"}.`;

      window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
    }
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

  return (
    <div className="pb-15 lg:py-15">
      <EmergencyProfileCard
            profileData={profileData}
            qrId={qrIdFromProfile}
            onCallEmergency={handleCallEmergency}
            onSendSMS={handleSendSMS}
               className="block lg:hidden"
          />

      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 pt-[252px] lg:pt-0">
          {/* Profile Card */}
          <EmergencyProfileCard
            profileData={profileData}
            qrId={qrIdFromProfile}
            onCallEmergency={handleCallEmergency}
            onSendSMS={handleSendSMS}
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
