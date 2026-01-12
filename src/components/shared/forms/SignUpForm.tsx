"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import EnvelopeIcon from "../icons/Envelope";
import KeyIcon from "../icons/KeyIcon";
import { SignUpValidation } from "@/schemas/SignUpFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import Stepper from "../stepper/Stepper";
import PersonalDataStep from "./PersonalDataStep";

type SignUpStep = 0 | 1 | 2 | 3;

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  gender: string;
  photo: File | null;
  country: string;
  city: string;
  address: string;
}

interface SignUpFormProps {
  currentStep?: SignUpStep;
  onStepChange?: (step: number) => void;
}

export default function SignUpForm({ currentStep: externalStep, onStepChange }: SignUpFormProps) {
  const t = useTranslations();
  const { signUp } = useAuth();
  const [internalStep, setInternalStep] = useState<SignUpStep>(0);
  
  // Використовуємо зовнішній крок, якщо він переданий, інакше внутрішній
  const currentStep = externalStep !== undefined ? externalStep : internalStep;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    country: "",
    city: "",
    address: "",
  });

  const validationSchema = SignUpValidation();

  const handleStep0Submit = async (values: { email: string; password: string }) => {
    setError(null);
    // Зберігаємо дані email та password
    setFormData((prev) => ({
      ...prev,
      email: values.email,
      password: values.password,
    }));
    // Переходимо на крок 1
    const newStep = 1;
    if (externalStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  };

  const handleStep1Submit = async (values: {
    name: string;
    surname: string;
    dateOfBirth: string;
    gender: string;
    photo: File | null;
    country: string;
    city: string;
    address: string;
  }) => {
    setError(null);
    setLoading(true);
    try {
      // Зберігаємо дані персональних даних
      const updatedFormData = {
        ...formData,
        ...values,
      };
      setFormData(updatedFormData);

      // Створюємо користувача - тут Firebase перевірить, чи email вже існує
      await signUp(updatedFormData.email, updatedFormData.password);
      
      // Якщо реєстрація успішна, можна перейти на наступний крок або завершити
      // TODO: Перехід на крок 2 (медичні дані) або завершення реєстрації
      // setCurrentStep(2);
    } catch (err: any) {
      // Обробка помилок Firebase
      if (err?.code === "auth/email-already-in-use") {
        setError(t("signUpPage.errors.emailAlreadyExists"));
      } else if (err?.code === "auth/weak-password") {
        setError(t("signUpPage.errors.weakPassword") || "Пароль занадто слабкий");
      } else if (err?.code === "auth/invalid-email") {
        setError(t("signUpPage.errors.invalidEmail") || "Невірний формат email");
      } else {
        setError(t("signUpPage.errors.unknownError"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToStep0 = () => {
    const newStep = 0;
    if (externalStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  };

  // Стилі залежно від кроку
  const containerClasses =
    currentStep === 0
      ? "relative z-10 lg:w-100 px-4 lg:px-8 py-6 lg:pt-12 lg:pb-8 bg-white rounded-[16px] shrink-0"
      : "relative z-10 w-full max-w-full px-4 lg:px-8 xl:px-16 bg-white";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
      className={containerClasses}
    >
      {/* Індикатор кроків - показуємо тільки з кроку 1 */}
      {currentStep > 0 && <Stepper currentStep={currentStep} />}

      {/* Крок 0: Email та Password */}
      {currentStep === 0 && (
        <>
          <h2 className="mb-4 lg:mb-6 font-actay text-[24px] lg:text-[32px] font-bold leading-[120%] uppercase text-center">
            {t("signUpPage.title")}
          </h2>
          <p className="mb-10 lg:mb-16 text-center">
            {t("signUpPage.description")}
          </p>
          <Formik
            initialValues={{
              email: formData.email,
              password: formData.password,
            }}
            validationSchema={validationSchema}
            onSubmit={handleStep0Submit}
          >
            <Form className="flex flex-col gap-4">
              {error && (
                <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <CustomizedInput
                fieldName="email"
                placeholder={t("forms.emailPlaceholder")}
                inputType="email"
                icon={<EnvelopeIcon />}
                fieldClassName="h-12"
              />

              <CustomizedInput
                fieldName="password"
                placeholder={t("forms.passwordPlaceholder")}
                inputType="password"
                icon={<KeyIcon />}
                fieldClassName="h-12 "
              />

              <MainButton
                type="submit"
                variant="gradient"
                className="w-full h-[54px] mt-1 lg:mt-2"
                disabled={loading}
              >
                {loading ? t("forms.loading") : t("signUpPage.signUp")}
              </MainButton>
              <div className="h-[1px] my-1 lg:my-2 bg-grey" />
              <p className="text-[10px] lg:text-[12px] font-light leading-none text-center">
                {t("signUpPage.haveAccount")}&nbsp;&nbsp;
                <Link
                  href="/sign-in"
                  className="text-accent border-b border-accent xl:hover:text-accent/70 xl:hover:border-accent/70 focus-visible:text-accent/70
              focus-visible:border-accent/70 transition duration-300 ease-out"
                >
                  {t("signUpPage.signIn")}
                </Link>
              </p>
            </Form>
          </Formik>
        </>
      )}

      {/* Крок 1: Персональні дані */}
      {currentStep === 1 && (
        <PersonalDataStep
          initialValues={{
            name: formData.name,
            surname: formData.surname,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            photo: formData.photo,
            country: formData.country,
            city: formData.city,
            address: formData.address,
          }}
          onSubmit={handleStep1Submit}
          onBack={handleBackToStep0}
          error={error}
          loading={loading}
        />
      )}
    </motion.div>
  );
}

