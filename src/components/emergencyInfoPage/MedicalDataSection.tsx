"use client";

import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/firebase/userService";
import { formatPhone } from "@/utils/formatPhone";
import DataRow from "./DataRow";
import DataSection from "./DataSection";
import DataTable from "./DataTable";

interface MedicalDataSectionProps {
  medicalData: UserProfileData["medicalData"];
  isLast?: boolean;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[12px] lg:text-[14px] font-light text-black mb-1 last:mb-0 [&::marker]:text-[8px] lg:[&::marker]:text-[10px]">
      {children}
    </li>
  );
}

export default function MedicalDataSection({
  medicalData,
  isLast = false,
}: MedicalDataSectionProps) {
  const t = useTranslations("emergencyInfoPage");
  const tSignUp = useTranslations("signUpPage.medicalData");

  const formatBloodType = (bloodType: string): string => {
    const bloodTypeMap: Record<string, string> = {
      I: "I (0)",
      II: "II (A)",
      III: "III (B)",
      IV: "IV (AB)",
    };
    return bloodTypeMap[bloodType] || bloodType;
  };

  const formatRhFactor = (rhFactor: string): string => {
    if (rhFactor === "positive") return t("rhPositive");
    if (rhFactor === "negative") return t("rhNegative");
    return rhFactor;
  };

  const bloodTypeValue =
    medicalData.bloodType && medicalData.rhFactor
      ? `${formatBloodType(medicalData.bloodType)}, ${formatRhFactor(medicalData.rhFactor)}`
      : medicalData.bloodType
      ? formatBloodType(medicalData.bloodType)
      : medicalData.rhFactor
      ? formatRhFactor(medicalData.rhFactor)
      : "";

  const allergiesValue =
    medicalData.allergies && medicalData.allergies.length > 0
      ? medicalData.allergies.join(", ")
      : "";

  const chronicDiseasesValue =
    medicalData.chronicDiseases && medicalData.chronicDiseases.trim()
      ? medicalData.chronicDiseases
          .split(/[,\n;]\s*/)
          .filter((disease) => disease.trim())
          .join(", ")
      : "";

  const medicationsValue =
    medicalData.medications && medicalData.medications.length > 0
      ? medicalData.medications.join(", ")
      : "";

  return (
    <DataSection title={t("medicalData")} isLast={isLast}>
      <DataTable column1Label={t("field")} column2Label={t("value")}>
        <DataRow label={tSignUp("bloodType")} value={bloodTypeValue} />

        {allergiesValue && (
          <DataRow label={tSignUp("allergies")} value={allergiesValue} />
        )}

        {chronicDiseasesValue && (
          <DataRow
            label={tSignUp("chronicDiseases")}
            value={chronicDiseasesValue}
          />
        )}

        {medicationsValue && (
          <DataRow label={tSignUp("medications")} value={medicationsValue} />
        )}

          {medicalData.operations && medicalData.operations.length > 0 && (
            <DataRow
              label={tSignUp("operations")}
              value={
                <ul className="list-disc list-inside space-y-1">
                  {medicalData.operations.map((operation, index) => (
                    <ListItem key={index}>
                      {operation.year && `${operation.year} — `}
                      {operation.name}
                    </ListItem>
                  ))}
                </ul>
              }
            />
          )}

          {medicalData.doctors && medicalData.doctors.length > 0 && (
            <DataRow
              label={tSignUp("doctors")}
              value={
                <ul className="list-disc list-inside space-y-2">
                  {medicalData.doctors.map((doctor, index) => (
                    <ListItem key={index}>
                      {doctor.name && (
                        <>
                          д-р {doctor.name}
                          {doctor.specialization && ` — ${doctor.specialization}`}
                          {doctor.phone && `, ${formatPhone(doctor.phone)}`}
                        </>
                      )}
                    </ListItem>
                  ))}
                </ul>
              }
            />
          )}
      </DataTable>
    </DataSection>
  );
}
