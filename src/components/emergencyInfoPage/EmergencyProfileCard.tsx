"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import MainButton from "@/components/shared/buttons/MainButton";
import { UserProfileData } from "@/lib/firebase/userService";

interface EmergencyProfileCardProps {
  profileData: UserProfileData;
  qrId: string;
  emergencyPhone?: string | null;
  onCallEmergency: () => void;
  onSendSMS: () => void;
  className?: string;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return dateString;
  }
}

export default function EmergencyProfileCard({
  profileData,
  qrId,
  emergencyPhone,
  onCallEmergency,
  onSendSMS,
  className = "",
}: EmergencyProfileCardProps) {
  const t = useTranslations("emergencyInfoPage.profile");
  const tPersonalData = useTranslations("emergencyInfoPage.personalData");
  const { personalData } = profileData;

  const fullName = `${personalData.name || ""} ${personalData.surname || ""}`.trim();

  return (
    <div className={twMerge("fixed lg:sticky top-0 left-0 w-dvw lg:w-[289px] bg-white rounded-b-[16px] lg:rounded-[16px] shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1)] p-4 lg:px-6 lg:py-8", className)}>
      <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 items-center mb-4">
        {/* Фото */}
        {personalData.photo && (
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="size-14 lg:size-[147px] rounded-full overflow-hidden">
              <Image
                src={personalData.photo}
                alt={fullName || "Profile photo"}
                width={147}
                height={147}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Дані під фото (тільки для lg+) */}
        <div className="hidden lg:flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium">
              {t("fullName")}:
            </p>
            <p className="text-[14px] font-light">
              {fullName || "-"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium">
              {t("dateOfBirth")}:
            </p>
            <p className="text-[14px] font-light">
              {personalData.dateOfBirth
                ? formatDate(personalData.dateOfBirth)
                : "-"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium">
              {t("gender")}:
            </p>
            <p className="text-[14px] font-light">
              {personalData.gender === "male"
                ? tPersonalData("male")
                : personalData.gender === "female"
                ? tPersonalData("female")
                : "-"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium">
              {t("qrId")}:
            </p>
            <p className="text-[14px] font-light">{qrId}</p>
          </div>
        </div>

        {/* Інформація */}
        <div className="lg:hidden flex-1 flex flex-col gap-4">
          {/* Ім'я та ID */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[12px] lg:text-[24px] font-medium leading-[120%] mb-2">
              {fullName || "-"}
            </h2>
            <p className="text-[12px] lg:text-[14px] font-light leading-[120%]">
              <span className="hidden lg:inline">{t("qrId")}: </span><span >{qrId}</span>
            </p>
          </div>

         

        
        </div>
        
      </div>
        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row lg:flex-col-reverse gap-4 mt-auto">
            <MainButton
              variant="outlineBlack"
              className="w-full lg:w-auto h-[54px] lg:px-9"
              onClick={onSendSMS}
            >
              {t("sendSMSButton")}
            </MainButton>
            {emergencyPhone ? (
              <a href={`tel:${emergencyPhone}`} className="w-full lg:w-auto">
                <MainButton
                  variant="gradient"
                  className="w-full lg:w-auto h-[54px] lg:px-7"
                  onClick={onCallEmergency}
                >
                  {t("callEmergencyButton")}
                </MainButton>
              </a>
            ) : (
              <MainButton
                variant="gradient"
                className="w-full lg:w-auto h-[54px] lg:px-7"
                onClick={onCallEmergency}
              >
                {t("callEmergencyButton")}
              </MainButton>
            )}
          </div>
    </div>
  );
}
