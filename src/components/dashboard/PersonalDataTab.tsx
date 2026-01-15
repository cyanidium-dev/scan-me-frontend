"use client";

import { UserProfileData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";

interface PersonalDataTabProps {
  profileData: UserProfileData | null;
  userEmail?: string | null;
}

export default function PersonalDataTab({ profileData, userEmail }: PersonalDataTabProps) {
  const t = useTranslations("dashboardPage");

  if (!profileData) {
    return (
      <div className="">
        <p>Профіль користувача ще не заповнений.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-300 uppercase mb-8">
        {t("personalData.title")}
      </h1>

      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={userEmail || ""}
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
                  d="M11.3333 4.66667L4.66667 11.3333M4.66667 4.66667L11.3333 11.3333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {t("personalData.name")}
          </label>
          <div className="relative">
            <input
              type="text"
              value={profileData.personalData.name || ""}
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

        {/* Surname */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {t("personalData.surname")}
          </label>
          <div className="relative">
            <input
              type="text"
              value={profileData.personalData.surname || ""}
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

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {t("personalData.dateOfBirth")}
          </label>
          <div className="relative">
            <input
              type="text"
              value={profileData.personalData.dateOfBirth || ""}
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
                <rect
                  x="2.66667"
                  y="3.33333"
                  width="10.6667"
                  height="10.6667"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5.33333 1.33333V3.33333M10.6667 1.33333V3.33333M2.66667 6.66667H13.3333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {t("personalData.gender")}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profileData.personalData.gender === "male" || profileData.personalData.gender === "Чоловіча"}
                readOnly
                className="w-4 h-4 text-red-500"
              />
              <span className="text-white">{t("personalData.male")}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profileData.personalData.gender === "female" || profileData.personalData.gender === "Жіноча"}
                readOnly
                className="w-4 h-4 text-red-500"
              />
              <span className="text-white">{t("personalData.female")}</span>
            </label>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {t("personalData.address")}
          </label>
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={profileData.personalData.country || ""}
                placeholder={t("personalData.countryPlaceholder")}
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
                value={profileData.personalData.city || ""}
                placeholder={t("personalData.cityPlaceholder")}
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
                value={profileData.personalData.address || ""}
                placeholder={t("personalData.addressPlaceholder")}
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
        </div>
      </div>
    </div>
  );
}


