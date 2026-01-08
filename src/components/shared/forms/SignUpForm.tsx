"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import EnvelopeIcon from "../icons/Envelope";
import KeyIcon from "../icons/KeyIcon";
import { SignUpValidation } from "@/schemas/SignUpFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function SignUpForm() {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = SignUpValidation();

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
        {t("signUpPage.title")}
      </h2>
      <p className="mb-10 lg:mb-16 text-center">
        {t("signUpPage.description")}
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
            // Поки що просто редірект на наступний крок
            // Пізніше тут буде логіка реєстрації та заповнення особистих даних
            router.push("/dashboard");
          } catch (err) {
            setError(t("signUpPage.errors.unknownError"));
          } finally {
            setLoading(false);
          }
        }}
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
    </motion.div>
  );
}

