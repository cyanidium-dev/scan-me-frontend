"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseError } from "firebase/app";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import KeyIcon from "../icons/KeyIcon";
import { ResetPasswordValidation } from "@/schemas/ResetPasswordFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function ResetPasswordForm() {
  const { verifyResetCode, confirmResetPassword, signIn } = useAuth();
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [codeValid, setCodeValid] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [oobCode, setOobCode] = useState<string | null>(null);

  const validationSchema = ResetPasswordValidation();

  const verifyCode = async (code: string) => {
    try {
      const email = await verifyResetCode(code);
      setEmail(email);
      setCodeValid(true);
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/expired-action-code":
            setError(t("resetPasswordPage.errors.expiredCode"));
            break;
          case "auth/invalid-action-code":
            setError(t("resetPasswordPage.errors.invalidCode"));
            break;
          default:
            setError(t("resetPasswordPage.errors.verifyError"));
        }
      } else {
        setError(t("resetPasswordPage.errors.verifyError"));
      }
      setCodeValid(false);
    }
  };

  useEffect(() => {
    // Отримуємо oobCode з URL параметрів
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("oobCode");
      setOobCode(code);
      if (code) {
        verifyCode(code);
      } else {
        setError(t("resetPasswordPage.errors.noCode"));
        setCodeValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
      className="relative z-10 lg:w-100 px-4 lg:px-8 py-6 lg:pt-12 lg:pb-8 bg-white rounded-[16px] shrink-0"
    >
      <h2 className="mb-4 lg:mb-6 font-actay text-[24px] lg:text-[32px] font-bold leading-[120%] uppercase text-center">
        {t("resetPasswordPage.title")}
      </h2>
      {codeValid === false && (
        <p className="mb-10 lg:mb-16 text-center text-red-600">
          {t("resetPasswordPage.description")}
        </p>
      )}
      {codeValid === true && (
        <p className="mb-10 lg:mb-16 text-center">
          {t("resetPasswordPage.description")} {email && `(${email})`}
        </p>
      )}
      {codeValid === null && (
        <p className="mb-10 lg:mb-16 text-center">
          {t("resetPasswordPage.verifying")}
        </p>
      )}

      {codeValid === true && (
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setError(null);
            setSuccess(null);
            setLoading(true);
            try {
              if (!oobCode || !email) {
                setError(t("resetPasswordPage.errors.noCode"));
                return;
              }
              // Встановлюємо новий пароль
              await confirmResetPassword(oobCode, values.password);
              // Автоматично авторизуємо користувача з новим паролем
              try {
                await signIn(email, values.password);
                // Редірект на dashboard
                router.push("/dashboard");
              } catch (signInErr) {
                // Якщо вхід не вдався, все одно пароль встановлено
                // Редірект на сторінку входу, щоб користувач міг увійти вручну
                setSuccess(t("resetPasswordPage.passwordSetSuccess"));
                setTimeout(() => {
                  router.push("/sign-in");
                }, 2000);
              }
            } catch (err) {
              if (err instanceof FirebaseError) {
                switch (err.code) {
                  case "auth/expired-action-code":
                    setError(t("resetPasswordPage.errors.expiredCode"));
                    break;
                  case "auth/invalid-action-code":
                    setError(t("resetPasswordPage.errors.invalidCode"));
                    break;
                  case "auth/weak-password":
                    setError(t("resetPasswordPage.errors.weakPassword"));
                    break;
                  default:
                    setError(
                      `${t("resetPasswordPage.errors.resetError")}${err.message || err.code}`
                    );
                }
              } else {
                setError(t("resetPasswordPage.errors.unknownError"));
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form className="flex flex-col">
            {error && (
              <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <CustomizedInput
              fieldName="password"
              placeholder={t("forms.newPasswordPlaceholder")}
              inputType="password"
              icon={<KeyIcon />}
              fieldClassName="h-12"
            />

            <MainButton
              type="submit"
              variant="gradient"
              className="w-full h-[54px] mb-2.5 mb-3 mt-5 lg:mt-6"
              disabled={loading}
            >
              {loading ? t("forms.loading") : t("resetPasswordPage.login")}
            </MainButton>
          </Form>
        </Formik>
      )}
    </motion.div>
  );
}
