import * as yup from "yup";
import { useTranslations } from "next-intl";
import { isValidPhoneNumber } from "react-phone-number-input";
import { nameRegex } from "../regex/regex";

export const ContactValidation = () => {
  const t = useTranslations("forms.errors");

  const contactFormValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, t("nameMinMaxSymbols"))
      .max(30, t("nameMinMaxSymbols"))
      .matches(nameRegex, t("nameAllowedSymbols"))
      .required(t("required")),
    phone: yup
      .string()
      .required(t("required"))
      .test(
        "is-valid-phone",
        t("wrongPhone"),
        (value) => !value || isValidPhoneNumber(value)
      ),
  });

  return contactFormValidationSchema;
};
