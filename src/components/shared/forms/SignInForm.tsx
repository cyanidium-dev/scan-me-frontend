"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseError } from "firebase/app";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import EnvelopeIcon from "../icons/Envelope";
import KeyIcon from "../icons/KeyIcon";
import { SignInValidation } from "@/schemas/SignInFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = SignInValidation();

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
        {t("signInPage.title")}
      </h2>
      <p className="mb-10 lg:mb-16 text-center">
        {t("signInPage.description")}
      </p>
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
          } catch (err) {
            if (err instanceof FirebaseError) {
              switch (err.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                  setError(t("signInPage.errors.wrongCredentials"));
                  break;

                case "auth/invalid-email":
                  setError(t("signInPage.errors.invalidEmail"));
                  break;

                case "auth/user-disabled":
                  setError(t("signInPage.errors.accountDisabled"));
                  break;

                case "auth/network-request-failed":
                  setError(t("signInPage.errors.networkError"));
                  break;

                case "auth/too-many-requests":
                  setError(t("signInPage.errors.manyRequests"));
                  break;

                default:
                  setError(
                    `${t("signInPage.errors.signInError")}${
                      err.message || err.code
                    }`
                  );
              }
            } else {
              // fallback на випадок не-Firebase помилки
              setError(t("signInPage.errors.unknownError"));
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        <Form className="flex flex-col gap-4">
          {error && (
            <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded">
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
            fieldClassName="h-12"
          />

          <Link
            href="/forgot-password"
            className="w-fit mx-auto mb-3 text-[10px] lg:text-[12px] font-medium leading-[120%] text-center border-b border-black
            xl:hover:text-accent xl:hover:border-accent focus-visible:text-accent focus-visible:border-accent transition duration-300 ease-out"
          >
            {t("signInPage.forgotPassword")}
          </Link>

          <MainButton
            type="submit"
            variant="gradient"
            className="w-full h-[54px] mb-2 mb-3"
            disabled={loading}
          >
            {loading ? t("forms.loading") : t("signInPage.login")}
          </MainButton>
          <div className="h-[1px] mb-2 mb-3 bg-grey" />
          <p className="text-[10px] lg:text-[12px] font-light leading-[120%] text-center">
            {t("signInPage.noAccount")}&nbsp;&nbsp;
            <Link
              href="sign-up"
              className="text-accent border-b border-accent xl:hover:text-accent/70 xl:hover:border-accent/70 focus-visible:text-accent/70
              focus-visible:border-accent/70 transition duration-300 ease-out"
            >
              {t("signInPage.signUp")}
            </Link>
          </p>
        </Form>
      </Formik>
    </motion.div>
  );
}
