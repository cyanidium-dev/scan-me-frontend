"use client";

import { Formik, Form } from "formik";
import { useTranslations } from "next-intl";
import EmergencyContactField from "../formComponents/EmergencyContactField";
import CustomizedCheckbox from "../formComponents/CustomizedCheckbox";
import MainButton from "../buttons/MainButton";
import { EmergencyDataValidation } from "@/schemas/EmergencyDataValidation";
import ShevronIcon from "../icons/ShevronIcon";

interface EmergencyDataStepProps {
    initialValues: {
        emergencyContacts: Array<{ name: string; phone: string; relationship: string }>;
        sendSMS: boolean;
        allowGPS: boolean;
    };
    onSubmit: (values: any) => Promise<void>;
    onBack: () => void;
    error?: string | null;
    loading?: boolean;
}

export default function EmergencyDataStep({
    initialValues,
    onSubmit,
    onBack,
    error,
    loading = false,
}: EmergencyDataStepProps) {
    const t = useTranslations();
    const validationSchema = EmergencyDataValidation();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validateOnMount={true}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {({ isSubmitting, isValid, dirty, values, errors }) => {
                return (
                <Form>
                    <h2 className="mb-3 lg:mb-4 text-[24px] lg:text-[32px] font-semibold leading-[120%] uppercase">
                        {t("signUpPage.emergencyData.title")}
                    </h2>
                    <p className="mb-6 lg:mb-8">
                        {t("signUpPage.emergencyData.description")}
                    </p>

                    {error && (
                        <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col">
                        {/* Екстрені контакти */}
                        <div className="flex flex-col gap-6 lg:gap-2">
                            {initialValues.emergencyContacts.map((_, index) => (
                                <EmergencyContactField
                                    key={index}
                                    index={index}
                                    showRemove={false}
                                />
                            ))}
                        </div>

                        {/* Чекбокси */}
                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 mt-6 lg:mt-8">
                            <CustomizedCheckbox
                                fieldName="sendSMS"
                                label={t("signUpPage.emergencyData.sendMessage")}
                            />
                            <CustomizedCheckbox
                                fieldName="allowGPS"
                                label={t("signUpPage.emergencyData.gps")}
                            />
                        </div>
                    </div>

                    {/* Кнопки */}
                    <div className="flex lg:flex-row justify-between gap-6 mt-12">
                        <MainButton
                            type="button"
                            variant="outlineBlack"
                            className="w-fit px-4 lg:px-8 h-[54px] shrink-0"
                            onClick={onBack}
                            disabled={isSubmitting}
                        >
                            <ShevronIcon className="rotate-90 mr-2" /> {t("signUpPage.backButton")}
                        </MainButton>
                        <MainButton
                            type="submit"
                            variant="gradient"
                            className="w-fit px-10 lg:px-22.5 h-[54px]"
                            disabled={isSubmitting || loading || !isValid}
                        >
                            {isSubmitting || loading
                                ? t("forms.loading")
                                : t("signUpPage.finishSignUp")}
                        </MainButton>
                    </div>
                </Form>
                );
            }}
        </Formik>
    );
}

