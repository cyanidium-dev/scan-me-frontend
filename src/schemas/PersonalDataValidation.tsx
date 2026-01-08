import * as yup from "yup";
import { useTranslations } from "next-intl";
import { nameRegex } from "../regex/regex";

export const PersonalDataValidation = () => {
  const t = useTranslations("forms.errors");
  const tPersonal = useTranslations("signUpPage.personalData");

  const personalDataValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, t("nameMinMaxSymbols"))
      .max(30, t("nameMinMaxSymbols"))
      .matches(nameRegex, t("nameAllowedSymbols"))
      .required(t("required")),
    surname: yup
      .string()
      .min(2, t("nameMinMaxSymbols"))
      .max(30, t("nameMinMaxSymbols"))
      .matches(nameRegex, t("nameAllowedSymbols"))
      .required(t("required")),
    dateOfBirth: yup.string().required(t("required")),
    gender: yup.string().required(t("required")),
    country: yup.string(),
    city: yup.string(),
    address: yup.string(),
  });

  return personalDataValidationSchema;
};

