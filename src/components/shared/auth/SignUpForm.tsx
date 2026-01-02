"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";

export default function SignUpForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const t = useTranslations("auth");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірний формат email")
      .required("Email обов'язковий"),
    password: Yup.string()
      .min(6, "Пароль має бути мінімум 6 символів")
      .required("Пароль обов'язковий"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Паролі не співпадають")
      .required("Підтвердження пароля обов'язкове"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setError(null);
        setLoading(true);
        try {
          await signUp(values.email, values.password);
          router.push("/dashboard");
        } catch (err: any) {
          console.error("Sign up error:", err);
          
          // Обробка різних типів помилок Firebase
          if (err?.code) {
            switch (err.code) {
              case "auth/email-already-in-use":
                setError("Цей email вже зареєстрований");
                break;
              case "auth/weak-password":
                setError("Пароль занадто слабкий. Мінімум 6 символів");
                break;
              case "auth/invalid-email":
                setError("Невірний формат email");
                break;
              case "auth/operation-not-allowed":
                setError(
                  "Метод Email/Password не увімкнено в Firebase Console. " +
                  "Перейдіть до Firebase Console → Authentication → Sign-in method → Email/Password → Enable"
                );
                break;
              case "auth/network-request-failed":
                setError("Помилка мережі. Перевірте інтернет-з'єднання");
                break;
              default:
                setError(`Помилка реєстрації: ${err.message || err.code || "Невідома помилка"}`);
            }
          } else {
            // Якщо помилка не має коду, показуємо повідомлення або загальне
            setError(`Помилка реєстрації: ${err?.message || "Невідома помилка"}`);
          }
        } finally {
          setLoading(false);
        }
      }}
    >
      <Form className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <CustomizedInput
          fieldName="email"
          label="Email"
          inputType="email"
        />

        <CustomizedInput
          fieldName="password"
          label="Пароль"
          inputType="password"
        />

        <CustomizedInput
          fieldName="confirmPassword"
          label="Підтвердити пароль"
          inputType="password"
        />

        <MainButton
          type="submit"
          variant="white"
          className="w-full h-11"
          disabled={loading}
        >
          {loading ? "Реєстрація..." : "Зареєструватися"}
        </MainButton>
      </Form>
    </Formik>
  );
}

