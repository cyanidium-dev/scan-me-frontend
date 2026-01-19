"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import CustomizedInput from "../../formComponents/CustomizedInput";
import MainButton from "../../buttons/MainButton";
import EnvelopeIcon from "../../icons/Envelope";
import KeyIcon from "../../icons/KeyIcon";
import { SignUpValidation } from "@/schemas/SignUpFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import Stepper from "./Stepper";
import PersonalDataStep from "./PersonalDataStep";
import MedicalDataStep from "./MedicalDataStep";
import EmergencyDataStep from "./EmergencyDataStep";
import { saveUserProfile, uploadUserPhoto } from "@/lib/firebase/userService";

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
  bloodType: string;
  rhFactor: string;
  allergies: string[];
  chronicDiseases: string;
  operations: Array<{ name: string; year: string }>;
  medications: string[];
  doctors: Array<{ name: string; phone: string; specialization: string }>;
  emergencyContacts: Array<{ name: string; phone: string; relationship: string }>;
  sendSMS: boolean;
}

interface SignUpFormProps {
  currentStep?: SignUpStep;
  onStepChange?: (step: SignUpStep) => void;
}

export default function SignUpForm({ currentStep: externalStep, onStepChange }: SignUpFormProps) {
  const t = useTranslations();
  const { signUp, checkEmailExists } = useAuth();
  const router = useRouter();
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
    gender: "male",
    photo: null,
    country: "",
    city: "",
    address: "",
    bloodType: "",
    rhFactor: "positive",
    allergies: [""],
    chronicDiseases: "",
    operations: [{ name: "", year: "" }],
    medications: [""],
    doctors: [{ name: "", phone: "", specialization: "" }],
    emergencyContacts: [
      { name: "", phone: "", relationship: "" },
      { name: "", phone: "", relationship: "" },
      { name: "", phone: "", relationship: "" },
    ],
    sendSMS: false,
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
    // Зберігаємо дані персональних даних
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
    // Переходимо на крок 2
    const newStep = 2;
    if (externalStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  };

  const handleStep2Submit = async (values: {
    bloodType: string;
    rhFactor: string;
    allergies: string[];
    chronicDiseases: string;
    operations: Array<{ name: string; year: string }>;
    medications: string[];
    doctors: Array<{ name: string; phone: string; specialization: string }>;
  }) => {
    setError(null);
    // Зберігаємо дані медичних даних
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
    // Переходимо на крок 3
    const newStep = 3;
    if (externalStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  };

  const handleStep3Submit = async (values: {
    emergencyContacts: Array<{ name: string; phone: string; relationship: string }>;
    sendSMS: boolean;
  }) => {
    setError(null);
    setLoading(true);
    try {
      // Зберігаємо дані екстрених даних
      const updatedFormData = {
        ...formData,
        ...values,
      };
      setFormData(updatedFormData);

      // 1. Перевіряємо, чи email вже зареєстрований
      const emailExists = await checkEmailExists(updatedFormData.email, updatedFormData.password);
      if (emailExists) {
        setError(t("signUpPage.errors.emailAlreadyExists"));
        setLoading(false);
        return;
      }

      // 2. Створюємо користувача в Firebase Authentication
      const userCredential = await signUp(updatedFormData.email, updatedFormData.password);
      const user = userCredential.user;

      // 3. Завантажуємо фото (якщо є) в Cloudinary
      let photoURL: string | undefined;
      if (updatedFormData.photo) {
        try {
          photoURL = await uploadUserPhoto(user.uid, updatedFormData.photo);
        } catch (photoError: any) {
          console.error("Помилка завантаження фото:", photoError);
          // Продовжуємо реєстрацію навіть якщо фото не завантажилось
          // Користувач зможе додати фото пізніше через редагування профілю
        }
      }

      // 4. Фільтруємо порожні значення з масивів
      const filteredAllergies = updatedFormData.allergies.filter((a) => a.trim() !== "");
      const filteredMedications = updatedFormData.medications.filter((m) => m.trim() !== "");
      const filteredOperations = updatedFormData.operations.filter(
        (o) => o.name.trim() !== "" || o.year.trim() !== ""
      );
      const filteredDoctors = updatedFormData.doctors.filter(
        (d) => d.name.trim() !== "" || d.phone.trim() !== "" || d.specialization.trim() !== ""
      );
      const filteredEmergencyContacts = updatedFormData.emergencyContacts.filter(
        (ec) => ec.name.trim() !== "" || ec.phone.trim() !== "" || ec.relationship.trim() !== ""
      );

      // 5. Зберігаємо профіль користувача в Firestore
      await saveUserProfile(user, {
        personalData: {
          name: updatedFormData.name,
          surname: updatedFormData.surname,
          dateOfBirth: updatedFormData.dateOfBirth,
          gender: updatedFormData.gender,
          photo: photoURL,
          country: updatedFormData.country,
          city: updatedFormData.city,
          address: updatedFormData.address,
        },
        medicalData: {
          bloodType: updatedFormData.bloodType,
          rhFactor: updatedFormData.rhFactor,
          allergies: filteredAllergies,
          chronicDiseases: updatedFormData.chronicDiseases,
          operations: filteredOperations,
          medications: filteredMedications,
          doctors: filteredDoctors,
        },
        emergencyData: {
          emergencyContacts: filteredEmergencyContacts,
          sendSMS: updatedFormData.sendSMS,
          allowGPS: false, // Поле більше не використовується, залишаємо false для сумісності
        },
      });

      // 6. Після успішної реєстрації перенаправляємо на сторінку успіху або головну
      // TODO: Замініть на потрібну сторінку
      router.push("/");
    } catch (err: any) {
      // Обробка помилок Firebase
      if (err?.code === "auth/email-already-in-use") {
        setError(t("signUpPage.errors.emailAlreadyExists"));
      } else if (err?.code === "auth/weak-password") {
        setError(t("signUpPage.errors.weakPassword") || "Пароль занадто слабкий");
      } else if (err?.code === "auth/invalid-email") {
        setError(t("signUpPage.errors.invalidEmail") || "Невірний формат email");
      } else if (err?.code === "auth/operation-not-allowed") {
        setError(
          "Метод Email/Password не увімкнено в Firebase Console. " +
          "Перейдіть до Firebase Console → Authentication → Sign-in method → Email/Password → Enable"
        );
      } else if (err?.code === "auth/network-request-failed") {
        setError("Помилка мережі. Перевірте інтернет-з'єднання");
      } else {
        setError(t("signUpPage.errors.unknownError") || "Невідома помилка");
      }
      console.error("Помилка реєстрації:", err);
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

  const handleBackToStep1 = () => {
    const newStep = 1;
    if (externalStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  };

  const handleBackToStep2 = () => {
    const newStep = 2;
    if (externalStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  };

  // Стилі для кроку 0
  const containerClasses = "relative z-10 lg:w-100 px-4 lg:px-8 py-6 lg:pt-12 lg:pb-8 bg-white rounded-[16px] shrink-0";

  return (
    <>
      {/* Крок 0: Email та Password */}
      {currentStep === 0 && (
        <motion.div
          key="step-0"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInAnimation({ y:30, delay: 0.2 })}
          className={containerClasses}
        >
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
            enableReinitialize={true}
            validateOnMount={true}
          >
            {({ isValid, dirty }) => (
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
                  disabled={loading || !isValid}
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
            )}
          </Formik>
        </motion.div>
      )}

      {/* Крок 1: Персональні дані */}
      {currentStep === 1 && (
        <>
          <Stepper currentStep={currentStep} />
          <motion.div
            key="step-1"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInAnimation({ y: 30, delay: 0.2 })}
          >
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
          </motion.div>
        </>
      )}

      {/* Крок 2: Медичні дані */}
      {currentStep === 2 && (
        <>
          <Stepper currentStep={currentStep} />
          <motion.div
            key="step-2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInAnimation({ y:30, delay: 0.2 })}
          >
            <MedicalDataStep
              initialValues={{
                bloodType: formData.bloodType,
                rhFactor: formData.rhFactor,
                allergies: formData.allergies.length > 0 ? formData.allergies : [""],
                chronicDiseases: formData.chronicDiseases,
                operations: formData.operations.length > 0 ? formData.operations : [{ name: "", year: "" }],
                medications: formData.medications.length > 0 ? formData.medications : [""],
                doctors: formData.doctors.length > 0 ? formData.doctors : [{ name: "", phone: "", specialization: "" }],
              }}
              onSubmit={handleStep2Submit}
              onBack={handleBackToStep1}
              error={error}
              loading={loading}
            />
          </motion.div>
        </>
      )}

      {/* Крок 3: Екстрені дані */}
      {currentStep === 3 && (
        <>
          <Stepper currentStep={currentStep} />
          <motion.div
            key="step-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInAnimation({ y:30, delay: 0.2 })}
          >
            <EmergencyDataStep
              initialValues={{
                emergencyContacts: formData.emergencyContacts.length > 0 
                  ? formData.emergencyContacts 
                  : [
                      { name: "", phone: "", relationship: "" },
                      { name: "", phone: "", relationship: "" },
                      { name: "", phone: "", relationship: "" },
                    ],
                sendSMS: formData.sendSMS,
              }}
              onSubmit={handleStep3Submit}
              onBack={handleBackToStep2}
              error={error}
              loading={loading}
            />
          </motion.div>
        </>
      )}
    </>
  );
}

