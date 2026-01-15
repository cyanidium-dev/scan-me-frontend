"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { getUserProfile, type UserProfileData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";

export default function UserProfileData() {
  const { user } = useAuth();
  const t = useTranslations("dashboardPage");
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getUserProfile(user.uid);
        setProfileData(data);
      } catch (err) {
        console.error("Помилка завантаження профілю:", err);
        setError("Не вдалося завантажити дані профілю");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">Завантаження...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {error}
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-600">Профіль користувача ще не заповнений.</p>
      </div>
    );
  }

  return (
    <>
      {/* Особисті дані */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("personalData.title")}
        </h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          {profileData.personalData.name && (
            <p>
              <span className="font-medium">Ім'я:</span> {profileData.personalData.name}
            </p>
          )}
          {profileData.personalData.surname && (
            <p>
              <span className="font-medium">Прізвище:</span> {profileData.personalData.surname}
            </p>
          )}
          {profileData.personalData.dateOfBirth && (
            <p>
              <span className="font-medium">Дата народження:</span> {profileData.personalData.dateOfBirth}
            </p>
          )}
          {profileData.personalData.gender && (
            <p>
              <span className="font-medium">Стать:</span> {profileData.personalData.gender}
            </p>
          )}
          {profileData.personalData.photo && (
            <div className="mt-4 relative w-32 h-32">
              <Image 
                src={profileData.personalData.photo} 
                alt="Фото профілю" 
                fill
                className="object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Медичні дані */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("medicalData.title")}
        </h2>
        <div className="space-y-2">
          {profileData.medicalData.bloodType && (
            <p>
              <span className="font-medium">Група крові:</span> {profileData.medicalData.bloodType}
            </p>
          )}
          {profileData.medicalData.rhFactor && (
            <p>
              <span className="font-medium">Резус-фактор:</span> {profileData.medicalData.rhFactor}
            </p>
          )}
          {profileData.medicalData.allergies && profileData.medicalData.allergies.length > 0 && (
            <p>
              <span className="font-medium">Алергії:</span> {profileData.medicalData.allergies.join(", ")}
            </p>
          )}
          {profileData.medicalData.chronicDiseases && (
            <p>
              <span className="font-medium">Хронічні захворювання:</span> {profileData.medicalData.chronicDiseases}
            </p>
          )}
        </div>
      </div>

      {/* Екстрені дані */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("emergencyData.title")}
        </h2>
        {profileData.emergencyData.emergencyContacts && 
         profileData.emergencyData.emergencyContacts.length > 0 && (
          <div className="space-y-4">
            {profileData.emergencyData.emergencyContacts.map((contact, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                {contact.name && <p><span className="font-medium">Ім'я:</span> {contact.name}</p>}
                {contact.phone && <p><span className="font-medium">Телефон:</span> {contact.phone}</p>}
                {contact.relationship && <p><span className="font-medium">Ступінь зв'язку:</span> {contact.relationship}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

