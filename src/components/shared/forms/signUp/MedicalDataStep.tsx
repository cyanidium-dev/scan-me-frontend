"use client";

import { Formik, Form } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "../../formComponents/CustomizedInput";
import BloodTypeSelect from "../../formComponents/BloodTypeSelect";
import RhFactorRadioGroup from "../../formComponents/RhFactorRadioGroup";
import AllergiesField from "../../formComponents/AllergiesField";
import OperationsField from "../../formComponents/OperationsField";
import MedicationsField from "../../formComponents/MedicationsField";
import DoctorsField from "../../formComponents/DoctorsField";
import MainButton from "../../buttons/MainButton";
import { MedicalDataValidation } from "@/schemas/MedicalDataValidation";
import ShevronIcon from "../../icons/ShevronIcon";

interface MedicalDataStepProps {
    initialValues: {
        bloodType: string;
        rhFactor: string;
        allergies: string[];
        chronicDiseases: string;
        operations: Array<{ name: string; year: string }>;
        medications: string[];
        doctors: Array<{ name: string; phone: string; specialization: string }>;
    };
    onSubmit: (values: any) => Promise<void>;
    onBack: () => void;
    error?: string | null;
    loading?: boolean;
}


export default function MedicalDataStep({
    initialValues,
    onSubmit,
    onBack,
    error,
    loading = false,
}: MedicalDataStepProps) {
    const t = useTranslations();
    const validationSchema = MedicalDataValidation();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validateOnMount={true}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <h2 className="mb-3 lg:mb-4 text-[24px] lg:text-[32px] font-semibold leading-[120%] uppercase">
                        {t("signUpPage.medicalData.title")}
                    </h2>
                    <p className="mb-6 lg:mb-8">
                        {t("signUpPage.medicalData.description")}
                    </p>

                    {error && (
                        <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-6 lg:gap-8">
                        {/* Група крові та Резус-фактор */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <BloodTypeSelect
                                fieldName="bloodType"
                                label={t("signUpPage.medicalData.bloodType")}
                                placeholder={t("signUpPage.medicalData.bloodTypePlaceholder")}
                                className="lg:w-[calc(50%-12px)]"
                            />
                            <RhFactorRadioGroup
                                fieldName="rhFactor"
                                label={t("signUpPage.medicalData.rhFactor")}
                                className="lg:w-[calc(50%-12px)]"
                            />
                        </div>

                        {/* Алергії */}
                        <AllergiesField />

                        {/* Хронічні захворювання */}
                        <CustomizedInput
                            fieldName="chronicDiseases"
                            label={t("signUpPage.medicalData.chronicDiseases")}
                            placeholder={t("signUpPage.medicalData.chronicDiseasesPlaceholder")}
                            as="textarea"
                            fieldClassName="h-24 lg:h-32 rounded-[14px]"
                        />

                        {/* Перенесені операції */}
                        <OperationsField />

                        {/* Прийняті ліки */}
                        <MedicationsField />

                        {/* Контакти лікарів */}
                        <DoctorsField />
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
                                : t("signUpPage.nextButton")}
                        </MainButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

