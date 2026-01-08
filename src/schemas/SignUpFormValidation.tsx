import * as yup from "yup";
import { useTranslations } from "next-intl";
import { emailRegex } from "../regex/regex";

export const SignUpValidation = () => {
  const t = useTranslations("forms.errors");

  const signUpFormValidationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, t("wrongEmail"))
      .required(t("required")),
    password: yup.string().required(t("required")).min(6, t("wrongPassword")),
  });

  return signUpFormValidationSchema;
};

