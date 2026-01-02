"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";

export default function SignInForm() {
  const { signIn } = useAuth();
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
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setError(null);
        setLoading(true);
        try {
          await signIn(values.email, values.password);
          router.push("/dashboard");
        } catch (err: any) {
          console.error("Sign in error:", err);
          
          if (err?.code) {
            switch (err.code) {
              case "auth/invalid-credential":
              case "auth/user-not-found":
              case "auth/wrong-password":
                setError("Невірний email або пароль");
                break;
              case "auth/invalid-email":
                setError("Невірний формат email");
                break;
              case "auth/user-disabled":
                setError("Обліковий запис відключено");
                break;
              case "auth/network-request-failed":
                setError("Помилка мережі. Перевірте інтернет-з'єднання");
                break;
              case "auth/too-many-requests":
                setError("Забагато спроб. Спробуйте пізніше");
                break;
              default:
                setError(`Помилка входу: ${err.message || err.code || "Невідома помилка"}`);
            }
          } else {
            setError(`Помилка входу: ${err?.message || "Невідома помилка"}`);
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

        <MainButton
          type="submit"
          variant="white"
          className="w-full h-11"
          disabled={loading}
        >
          {loading ? "Вхід..." : "Увійти"}
        </MainButton>
      </Form>
    </Formik>
  );
}

