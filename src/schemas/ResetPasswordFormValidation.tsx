import * as yup from "yup";
import { useTranslations } from "next-intl";

export const ResetPasswordValidation = () => {
  const t = useTranslations("forms.errors");

  const resetPasswordFormValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required(t("required"))
      .min(6, t("wrongPassword")),
  });

  return resetPasswordFormValidationSchema;
};
