"use client";

import { UserProfileData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";

interface EmergencyDataTabProps {
  profileData: UserProfileData | null;
}

export default function EmergencyDataTab({ profileData }: EmergencyDataTabProps) {
  const t = useTranslations("dashboardPage");

  if (!profileData) {
    return (
      <div className="text-gray-400">
        <p>Профіль користувача ще не заповнений.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-300 uppercase mb-8">
        {t("emergencyData.title")}
      </h1>

      <div className="space-y-4">
        {/* Emergency Contacts */}
        {profileData.emergencyData.emergencyContacts && 
         profileData.emergencyData.emergencyContacts.length > 0 && (
          <div className="space-y-4">
            {profileData.emergencyData.emergencyContacts.map((contact, index) => (
              <div key={index} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={contact.name || ""}
                    placeholder={t("emergencyData.emergencyContactPlaceholder")}
                    readOnly
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M8 2.66667V13.3333M2.66667 8H13.3333"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={contact.phone || ""}
                    placeholder={t("emergencyData.emergencyContactPhonePlaceholder")}
                    readOnly
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M8 2.66667V13.3333M2.66667 8H13.3333"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={contact.relationship || ""}
                    placeholder={t("emergencyData.emergencyContactRelationshipPlaceholder")}
                    readOnly
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M8 2.66667V13.3333M2.66667 8H13.3333"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SMS Permission */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.emergencyData.sendSMS || false}
              readOnly
              className="w-5 h-5 text-red-500 rounded"
            />
            <span className="text-white">{t("emergencyData.sendMessage")}</span>
          </label>
        </div>

        {/* GPS Permission */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.emergencyData.allowGPS || false}
              readOnly
              className="w-5 h-5 text-red-500 rounded"
            />
            <span className="text-white">{t("emergencyData.gps")}</span>
          </label>
        </div>
      </div>
    </div>
  );
}


