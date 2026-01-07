"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseError } from "firebase/app";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import EnvelopeIcon from "../icons/Envelope";
import { ForgotPasswordValidation } from "@/schemas/ForgotPasswordFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function ForgotPasswordForm() {
    const { resetPassword } = useAuth();
    const t = useTranslations();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validationSchema = ForgotPasswordValidation();

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
                {t("forgotPasswordPage.title")}
            </h2>
            <p className="mb-10 lg:mb-16 text-center">
                {t("forgotPasswordPage.description")}
            </p>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    setError(null);
                    setSuccess(null);
                    setLoading(true);
                    try {
                        await resetPassword(values.email);
                        setSuccess(t("forgotPasswordPage.success"));
                    } catch (err) {
                        if (err instanceof FirebaseError) {
                            switch (err.code) {
                                case "auth/invalid-email":
                                    setError(t("forgotPasswordPage.errors.invalidEmail"));
                                    break;

                                case "auth/user-disabled":
                                    setError(t("forgotPasswordPage.errors.accountDisabled"));
                                    break;

                                case "auth/network-request-failed":
                                    setError(t("forgotPasswordPage.errors.networkError"));
                                    break;

                                case "auth/too-many-requests":
                                    setError(t("forgotPasswordPage.errors.manyRequests"));
                                    break;

                                default:
                                    setError(
                                        `${t("forgotPasswordPage.errors.resetError")}${err.message || err.code}`
                                    );
                            }
                        } else {
                            // fallback на випадок не-Firebase помилки
                            setError(t("forgotPasswordPage.errors.unknownError"));
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
                        fieldName="email"
                        placeholder={t("forms.emailPlaceholder")}
                        inputType="email"
                        icon={<EnvelopeIcon />}
                        fieldClassName="h-12"
                    />

                    <MainButton
                        type="submit"
                        variant="gradient"
                        className="w-full h-[54px] mb-2.5 mb-3 mt-5 lg:mt-6"
                        disabled={loading}
                    >
                        {loading ? t("forms.loading") : t("forgotPasswordPage.send")}
                    </MainButton>

                    <Link href="/sign-in">
                    <MainButton
                        variant="outlineBlack"
                        className="w-full h-[54px]"
                        disabled={loading}
                    >
                        {t("forgotPasswordPage.changeAccount")}
                    </MainButton></Link>
                </Form>
            </Formik>
        </motion.div>
    );
}
