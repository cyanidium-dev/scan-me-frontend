import * as yup from "yup";
import { useTranslations } from "next-intl";

export const MedicalDataValidation = () => {
  const t = useTranslations("forms.errors");

  const medicalDataValidationSchema = yup.object().shape({
    bloodType: yup.string().required(t("required")),
    rhFactor: yup.string().required(t("required")),
    allergies: yup.array().of(yup.string()),
    chronicDiseases: yup.string(),
    operations: yup.array().of(
      yup.object().shape({
        name: yup.string(),
        year: yup.string(),
      })
    ),
    medications: yup.array().of(yup.string()),
    doctors: yup.array().of(
      yup.object().shape({
        name: yup.string(),
        phone: yup.string(),
        specialization: yup.string(),
      })
    ),
  });

  return medicalDataValidationSchema;
};

