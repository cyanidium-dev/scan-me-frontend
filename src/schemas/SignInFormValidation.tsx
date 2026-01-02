import * as yup from "yup";
import { useTranslations } from "next-intl";
import { emailRegex } from "../regex/regex";

export const SignInValidation = () => {
  const t = useTranslations("forms.errors");

  const signInFormValidationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, t("wrongEmail"))
      .required(t("required")),
    password: yup.string().required(t("required")).min(6, t("wrongPassword")),
  });

  return signInFormValidationSchema;
};
