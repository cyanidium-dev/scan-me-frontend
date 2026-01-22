"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/firebase/userService";
import { formatPhone } from "@/utils/formatPhone";
import MainButton from "@/components/shared/buttons/MainButton";
import DataSection from "./DataSection";
import DataTable from "./DataTable";

interface EmergencyContactsSectionProps {
  emergencyContacts: UserProfileData["emergencyData"]["emergencyContacts"];
  onCallContact: (phone: string) => void;
  isLast?: boolean;
}

export default function EmergencyContactsSection({
  emergencyContacts,
  onCallContact,
  isLast = false,
}: EmergencyContactsSectionProps) {
  const t = useTranslations("emergencyInfoPage");
  const tSignUp = useTranslations("signUpPage.emergencyData");

  const validContacts = emergencyContacts.filter(
    (contact) => contact.name || contact.phone || contact.relationship
  );

  if (validContacts.length === 0) {
    return null;
  }

  return (
    <DataSection title={t("emergencyContacts")} isLast={isLast}>
      <DataTable
        column1Label={t("emergencyContactsColumn1")}
        column2Label={t("emergencyContactsColumn2")}
      >
        {validContacts.map((contact, index) => {
          const isLastContact = index === validContacts.length - 1;
          const isFirstContact = index === 0;
          return (
            <React.Fragment key={index}>
            {/* Перший рядок: Ім'я | Телефон */}
            <tr className="border-b border-black/10">
              <td className="py-3 lg:py-4 pr-4 lg:pr-6 align-middle border-r border-black/10">
                <p className="text-[12px] lg:text-[14px] font-light text-black">
                  {contact.name || "-"}
                </p>
              </td>
              <td className="py-3 lg:py-4 pl-4 lg:pl-6 align-middle">
                {contact.phone ? (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-[12px] lg:text-[14px] font-light text-black hover:text-accent transition-colors"
                  >
                    {formatPhone(contact.phone)}
                  </a>
                ) : (
                  <p className="text-[12px] lg:text-[14px] font-light text-black">
                    -
                  </p>
                )}
              </td>
            </tr>
            {/* Другий рядок: Стосунок | Кнопка */}
            <tr className={isLastContact ? "" : "border-b border-black"}>
              <td className="py-3 lg:py-4 pr-4 lg:pr-6 align-middle border-r border-black/10">
                <p className="text-[12px] lg:text-[14px] font-light text-black">
                  {contact.relationship || "-"}
                </p>
              </td>
              <td className="py-3 lg:py-4 pl-4 lg:pl-6 align-middle">
                {contact.phone ? (
                  <a href={`tel:${contact.phone}`} className="inline-block w-full">
                    <MainButton
                      variant="gradient"
                      className="h-9 w-full"
                      onClick={() => onCallContact(contact.phone)}
                    >
                      {t("callButton")}
                    </MainButton>
                  </a>
                ) : (
                  <p className="text-[12px] lg:text-[14px] font-light text-black">
                    -
                  </p>
                )}
              </td>
            </tr>
          </React.Fragment>
          );
        })}
      </DataTable>
    </DataSection>
  );
}
