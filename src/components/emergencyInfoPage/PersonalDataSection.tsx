"use client";

import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/firebase/userService";
import DataRow from "./DataRow";
import DataSection from "./DataSection";
import DataTable from "./DataTable";

interface PersonalDataSectionProps {
  personalData: UserProfileData["personalData"];
  isLast?: boolean;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export default function PersonalDataSection({
  personalData,
  isLast = false,
}: PersonalDataSectionProps) {
  const t = useTranslations("emergencyInfoPage");
  const tPersonalData = useTranslations("emergencyInfoPage.personalData");

  const fullAddress = [
    personalData.country,
    personalData.city ? `м. ${personalData.city}` : "",
    personalData.address,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <DataSection title={t("personalDataTitle")} isLast={isLast}>
      <DataTable column1Label={t("field")} column2Label={t("value")}>
        <DataRow
          label={tPersonalData("name")}
          value={personalData.name || ""}
        />
        <DataRow
          label={tPersonalData("surname")}
          value={personalData.surname || ""}
        />
        <DataRow
          label={tPersonalData("dateOfBirth")}
          value={formatDate(personalData.dateOfBirth)}
        />
        <DataRow
          label={tPersonalData("gender")}
          value={
            personalData.gender === "male"
              ? tPersonalData("male")
              : personalData.gender === "female"
              ? tPersonalData("female")
              : ""
          }
        />
        <DataRow
          label={tPersonalData("address")}
          value={fullAddress}
        />
      </DataTable>
    </DataSection>
  );
}
