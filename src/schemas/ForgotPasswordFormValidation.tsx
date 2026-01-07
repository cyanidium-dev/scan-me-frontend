import * as yup from "yup";
import { useTranslations } from "next-intl";
import { emailRegex } from "../regex/regex";

export const ForgotPasswordValidation = () => {
  const t = useTranslations("forms.errors");

  const forgotPasswordFormValidationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, t("wrongEmail"))
      .required(t("required")),
  });

  return forgotPasswordFormValidationSchema;
};
