"use client";
import { useTranslations } from "next-intl";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import CustomizedInput from "../formComponents/CustomizedInput";
import { ContactValidation } from "@/schemas/ContactFormValidation";
import MainButton from "../buttons/MainButton";
import { twMerge } from "tailwind-merge";

interface ContactFormValues {
  name: string;
  phone: string;
}

interface ContactFormProps {
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  setIsModalShown?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function ContactForm({
  setIsError,
  setIsNotificationShown,
  setIsModalShown,
  className = "",
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("");

  const validationSchema = ContactValidation();

  const initialValues: ContactFormValues = {
    name: "",
    phone: "",
  };

  const submitForm = async (
    values: ContactFormValues,
    formikHelpers: FormikHelpers<ContactFormValues>
  ) => {
    const { resetForm } = formikHelpers;

    const data =
      `<b>Заявка "Форма зворотнього зв'язку"</b>\n` +
      `<b>Ім'я:</b> ${values.name.trim()}\n` +
      `<b>Телефон:</b> ${values.phone.trim().replace(/(?!^)\D/g, "")}\n`;

    try {
      setIsError(false);
      setIsLoading(true);
      await axios({
        method: "post",
        url: "/api/telegram",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
    } catch (error) {
      setIsError(true);
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={twMerge(
        "px-6 lg:px-8 py-8 lg:py-12 rounded-[16px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <h2 className="mb-4 lg:mb-6 font-actay text-[24px] lg:text-[32px] font-bold leading-[120%] uppercase text-center">
        {t("homePage.contactUs.title")}
      </h2>
      <p className="mb-4 lg:mb-6 text-center">
        {t("homePage.contactUs.description")}
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => (
          <Form>
            <div className="flex flex-col gap-4 mb-6">
              <CustomizedInput
                fieldName="name"
                label={t("forms.name")}
                placeholder={t("forms.namePlaceholder")}
              />
              <CustomizedInput
                fieldName="phone"
                label={t("forms.phone")}
                // placeholder={t("forms.phonePlaceholder")}
                inputType="tel"
                fieldClassName="px-6 py-0 lg:py-0"
              />
            </div>
            <div>
              <MainButton
                type="submit"
                disabled={!(dirty && isValid) || isLoading}
                isLoading={isLoading}
                loadingText={t("forms.loading")}
                className="w-full h-[48px]"
              >
                {t("forms.sendMessage")}
              </MainButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
