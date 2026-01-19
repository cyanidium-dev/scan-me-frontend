import * as yup from "yup";
import { useTranslations } from "next-intl";
import { isValidPhoneNumber } from "react-phone-number-input";
import { nameRegex } from "../regex/regex";

export const OrderFormValidation = () => {
  const t = useTranslations("forms.errors");

  const orderFormValidationSchema = yup.object().shape({
    productType: yup
      .string()
      .oneOf(["sticker", "bracelet"], t("required"))
      .required(t("required")),
    quantity: yup
      .number()
      .min(1, t("required"))
      .required(t("required")),
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
    patronymic: yup
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
    deliveryAddress: yup
      .string()
      .min(5, t("required"))
      .required(t("required")),
  });

  return orderFormValidationSchema;
};
