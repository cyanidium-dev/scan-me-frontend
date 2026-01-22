"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import MainButton from "@/components/shared/buttons/MainButton";
import { UserProfileData } from "@/lib/firebase/userService";

interface EmergencyProfileCardProps {
  profileData: UserProfileData;
  qrId: string;
  onCallEmergency: () => void;
  onSendSMS: () => void;
  className?: string;
}


export default function EmergencyProfileCard({
  profileData,
  qrId,
  onCallEmergency,
  onSendSMS,
  className = "",
}: EmergencyProfileCardProps) {
  const t = useTranslations("emergencyInfoPage.profile");
  const { personalData } = profileData;

  const fullName = `${personalData.name || ""} ${personalData.surname || ""}`.trim();

  return (
    <div className={twMerge("fixed lg:sticky top-0 left-0 w-dvw lg:w-auto h-fit bg-white rounded-b-[16px] lg:rounded-[16px] shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1)] p-4 lg:p-6", className)}>
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

        {/* Інформація */}
        <div className="flex-1 flex flex-col gap-4">
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
              className="w-full lg:w-auto lg:flex-1 h-[54px] text-[12px] lg:text-[14px] font-actay font-bold uppercase bg-white border-black text-black hover:bg-black/5"
              onClick={onSendSMS}
            >
              {t("sendSMSButton")}
            </MainButton>
            <MainButton
              variant="gradient"
              className="w-full lg:w-auto lg:flex-1 h-[54px] text-[12px] lg:text-[14px] font-actay font-bold uppercase"
              onClick={onCallEmergency}
            >
              {t("callEmergencyButton")}
            </MainButton>
          </div>
    </div>
  );
}
