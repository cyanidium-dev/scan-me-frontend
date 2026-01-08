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
    dateOfBirth: yup
      .string()
      .required(t("required"))
      .test("not-future", tPersonal("dateOfBirthFutureError") || "Date cannot be in the future", function (value) {
        if (!value) return true;
        try {
          // Парсимо дату в форматі YYYY-MM-DD
          const [year, month, day] = value.split("-").map(Number);
          const selectedDate = new Date(year, month - 1, day);
          const today = new Date();
          today.setHours(23, 59, 59, 999); // Встановлюємо кінець дня для правильної перевірки
          
          // Перевіряємо, чи дата валідна та не з майбутнього
          if (isNaN(selectedDate.getTime())) return false;
          return selectedDate <= today;
        } catch (e) {
          return false;
        }
      }),
    gender: yup.string().required(t("required")),
    country: yup.string(),
    city: yup.string(),
    address: yup.string(),
  });

  return personalDataValidationSchema;
};

