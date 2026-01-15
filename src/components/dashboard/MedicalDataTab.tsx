"use client";

import { UserProfileData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";

interface MedicalDataTabProps {
  profileData: UserProfileData | null;
}

export default function MedicalDataTab({ profileData }: MedicalDataTabProps) {
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
        {t("medicalData.title")}
      </h1>

      <div className="space-y-4">
        {/* Blood Type */}
        {profileData.medicalData.bloodType && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.bloodType")}
            </label>
            <div className="relative">
              <input
                type="text"
                value={profileData.medicalData.bloodType}
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
        )}

        {/* Rh Factor */}
        {profileData.medicalData.rhFactor && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.rhFactor")}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rhFactor"
                  value="+"
                  checked={profileData.medicalData.rhFactor === "+"}
                  readOnly
                  className="w-4 h-4 text-red-500"
                />
                <span className="text-white">{t("medicalData.rhPositive")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rhFactor"
                  value="-"
                  checked={profileData.medicalData.rhFactor === "-"}
                  readOnly
                  className="w-4 h-4 text-red-500"
                />
                <span className="text-white">{t("medicalData.rhNegative")}</span>
              </label>
            </div>
          </div>
        )}

        {/* Allergies */}
        {profileData.medicalData.allergies && profileData.medicalData.allergies.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.allergies")}
            </label>
            <div className="space-y-2">
              {profileData.medicalData.allergies.map((allergy, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    value={allergy}
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
              ))}
            </div>
          </div>
        )}

        {/* Chronic Diseases */}
        {profileData.medicalData.chronicDiseases && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.chronicDiseases")}
            </label>
            <div className="relative">
              <textarea
                value={profileData.medicalData.chronicDiseases}
                readOnly
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white pr-10 resize-none"
              />
              <button className="absolute right-3 top-3">
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
        )}

        {/* Operations */}
        {profileData.medicalData.operations && profileData.medicalData.operations.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.operations")}
            </label>
            <div className="space-y-3">
              {profileData.medicalData.operations.map((operation, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={operation.name || ""}
                      placeholder={t("medicalData.operationsPlaceholder")}
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
                  <div className="relative w-32">
                    <input
                      type="text"
                      value={operation.year || ""}
                      placeholder={t("medicalData.yearPlaceholder")}
                      readOnly
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medications */}
        {profileData.medicalData.medications && profileData.medicalData.medications.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.medications")}
            </label>
            <div className="space-y-2">
              {profileData.medicalData.medications.map((medication, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    value={medication}
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
              ))}
            </div>
          </div>
        )}

        {/* Doctors */}
        {profileData.medicalData.doctors && profileData.medicalData.doctors.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("medicalData.doctorContact")}
            </label>
            <div className="space-y-3">
              {profileData.medicalData.doctors.map((doctor, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={doctor.name || ""}
                      placeholder={t("medicalData.doctorNamePlaceholder")}
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
                      value={doctor.phone || ""}
                      placeholder={t("medicalData.doctorPhonePlaceholder")}
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
                      value={doctor.specialization || ""}
                      placeholder={t("medicalData.doctorSpecializationPlaceholder")}
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
          </div>
        )}
      </div>
    </div>
  );
}


