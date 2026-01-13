import * as yup from "yup";
import { useTranslations } from "next-intl";

export const EmergencyDataValidation = () => {
  const t = useTranslations("forms.errors");

  const emergencyDataValidationSchema = yup.object().shape({
    emergencyContacts: yup.array().of(
      yup.object().shape({
        name: yup.string().required(t("required")),
        phone: yup.string().required(t("required")),
        relationship: yup.string().required(t("required")),
      })
    ),
    sendSMS: yup.boolean(),
    allowGPS: yup.boolean(),
  });

  return emergencyDataValidationSchema;
};

