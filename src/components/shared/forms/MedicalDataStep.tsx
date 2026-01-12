"use client";

import { Formik, Form, Field, useFormikContext } from "formik";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import BloodTypeSelect from "../formComponents/BloodTypeSelect";
import RhFactorRadioGroup from "../formComponents/RhFactorRadioGroup";
import YearPicker from "../formComponents/YearPicker";
import MainButton from "../buttons/MainButton";
import { MedicalDataValidation } from "@/schemas/MedicalDataValidation";
import ShevronIcon from "../icons/ShevronIcon";
import CrossIcon from "../icons/CrossIcon";

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

function AllergiesField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const allergies = values.allergies || [];

    const addAllergy = () => {
        if (allergies.length === 0) {
            setFieldValue("allergies", [""]);
        } else {
            setFieldValue("allergies", [...allergies, ""]);
        }
    };

    const removeAllergy = (index: number) => {
        const newAllergies = allergies.filter((_: string, i: number) => i !== index);
        setFieldValue("allergies", newAllergies.length > 0 ? newAllergies : []);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                    {t("signUpPage.medicalData.allergies")}
                </label>
                <button
                    type="button"
                    onClick={addAllergy}
                    className="text-[12px] lg:text-[14px] text-accent border-b border-accent hover:text-accent/70 hover:border-accent/70 transition duration-300"
                >
                    {t("signUpPage.medicalData.allergiesAdd")}
                </button>
            </div>
            {allergies.length > 0 ? (
                allergies.map((allergy: string, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                        <CustomizedInput
                            fieldName={`allergies[${index}]`}
                            placeholder={t("signUpPage.medicalData.allergiesPlaceholder")}
                            fieldClassName="h-12 lg:h-[49px] flex-1"
                            isLabelHidden={true}
                        />
                        <button
                            type="button"
                            onClick={() => removeAllergy(index)}
                            className="mt-3 text-accent hover:text-accent/70 transition duration-300"
                            aria-label="Remove allergy"
                        >
                            <CrossIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))
            ) : (
                <CustomizedInput
                    fieldName="allergies[0]"
                    placeholder={t("signUpPage.medicalData.allergiesPlaceholder")}
                    fieldClassName="h-12 lg:h-[49px]"
                    isLabelHidden={true}
                />
            )}
        </div>
    );
}

function OperationsField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const operations = values.operations || [];

    const addOperation = () => {
        if (operations.length === 0) {
            setFieldValue("operations", [{ name: "", year: "" }]);
        } else {
            setFieldValue("operations", [...operations, { name: "", year: "" }]);
        }
    };

    const removeOperation = (index: number) => {
        const newOperations = operations.filter((_: any, i: number) => i !== index);
        setFieldValue("operations", newOperations.length > 0 ? newOperations : []);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                    {t("signUpPage.medicalData.operations")}
                </label>
                <button
                    type="button"
                    onClick={addOperation}
                    className="text-[12px] lg:text-[14px] text-accent border-b border-accent hover:text-accent/70 hover:border-accent/70 transition duration-300"
                >
                    {t("signUpPage.medicalData.addOperation")}
                </button>
            </div>
            {operations.length > 0 ? (
                operations.map((operation: { name: string; year: string }, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                        <div className="flex-1 flex gap-2">
                            <CustomizedInput
                                fieldName={`operations[${index}].name`}
                                placeholder={t("signUpPage.medicalData.operationsPlaceholder")}
                                fieldClassName="h-12 lg:h-[49px] flex-1"
                                isLabelHidden={true}
                            />
                            <YearPicker
                                fieldName={`operations[${index}].year`}
                                placeholder={t("signUpPage.medicalData.yearPlaceholder")}
                                className="w-[120px]"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeOperation(index)}
                            className="mt-3 text-accent hover:text-accent/70 transition duration-300"
                            aria-label="Remove operation"
                        >
                            <CrossIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))
            ) : (
                <div className="flex gap-2">
                    <CustomizedInput
                        fieldName="operations[0].name"
                        placeholder={t("signUpPage.medicalData.operationsPlaceholder")}
                        fieldClassName="h-12 lg:h-[49px] flex-1"
                        isLabelHidden={true}
                    />
                    <YearPicker
                        fieldName="operations[0].year"
                        placeholder={t("signUpPage.medicalData.yearPlaceholder")}
                        className="w-[120px]"
                    />
                </div>
            )}
        </div>
    );
}

function MedicationsField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const medications = values.medications || [];

    const addMedication = () => {
        if (medications.length === 0) {
            setFieldValue("medications", [""]);
        } else {
            setFieldValue("medications", [...medications, ""]);
        }
    };

    const removeMedication = (index: number) => {
        const newMedications = medications.filter((_: string, i: number) => i !== index);
        setFieldValue("medications", newMedications.length > 0 ? newMedications : []);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                    {t("signUpPage.medicalData.medications")}
                </label>
                <button
                    type="button"
                    onClick={addMedication}
                    className="text-[12px] lg:text-[14px] text-accent border-b border-accent hover:text-accent/70 hover:border-accent/70 transition duration-300"
                >
                    {t("signUpPage.medicalData.addMedication")}
                </button>
            </div>
            {medications.length > 0 ? (
                medications.map((medication: string, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                        <CustomizedInput
                            fieldName={`medications[${index}]`}
                            placeholder={t("signUpPage.medicalData.medicationsPlaceholder")}
                            fieldClassName="h-12 lg:h-[49px] flex-1"
                            isLabelHidden={true}
                        />
                        <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="mt-3 text-accent hover:text-accent/70 transition duration-300"
                            aria-label="Remove medication"
                        >
                            <CrossIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))
            ) : (
                <CustomizedInput
                    fieldName="medications[0]"
                    placeholder={t("signUpPage.medicalData.medicationsPlaceholder")}
                    fieldClassName="h-12 lg:h-[49px]"
                    isLabelHidden={true}
                />
            )}
        </div>
    );
}

function DoctorsField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const doctors = values.doctors || [];

    const addDoctor = () => {
        if (doctors.length === 0) {
            setFieldValue("doctors", [{ name: "", phone: "", specialization: "" }]);
        } else {
            setFieldValue("doctors", [...doctors, { name: "", phone: "", specialization: "" }]);
        }
    };

    const removeDoctor = (index: number) => {
        const newDoctors = doctors.filter((_: any, i: number) => i !== index);
        setFieldValue("doctors", newDoctors.length > 0 ? newDoctors : []);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                    {t("signUpPage.medicalData.doctorContact")}
                </label>
                <button
                    type="button"
                    onClick={addDoctor}
                    className="text-[12px] lg:text-[14px] text-accent border-b border-accent hover:text-accent/70 hover:border-accent/70 transition duration-300"
                >
                    {t("signUpPage.medicalData.addDoctor")}
                </button>
            </div>
            {doctors.length > 0 ? (
                doctors.map((doctor: { name: string; phone: string; specialization: string }, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                        <div className="flex-1 flex flex-col lg:flex-row gap-2">
                            <CustomizedInput
                                fieldName={`doctors[${index}].name`}
                                placeholder={t("signUpPage.medicalData.doctorNamePlaceholder")}
                                fieldClassName="h-12 lg:h-[49px] flex-1"
                                isLabelHidden={true}
                            />
                            <CustomizedInput
                                fieldName={`doctors[${index}].phone`}
                                placeholder={t("signUpPage.medicalData.doctorPhonePlaceholder")}
                                inputType="tel"
                                fieldClassName="h-12 lg:h-[49px] flex-1"
                                isLabelHidden={true}
                            />
                            <CustomizedInput
                                fieldName={`doctors[${index}].specialization`}
                                placeholder={t("signUpPage.medicalData.doctorSpecializationPlaceholder")}
                                fieldClassName="h-12 lg:h-[49px] flex-1"
                                isLabelHidden={true}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeDoctor(index)}
                            className="mt-3 text-accent hover:text-accent/70 transition duration-300"
                            aria-label="Remove doctor"
                        >
                            <CrossIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))
            ) : (
                <div className="flex flex-col lg:flex-row gap-2">
                    <CustomizedInput
                        fieldName="doctors[0].name"
                        placeholder={t("signUpPage.medicalData.doctorNamePlaceholder")}
                        fieldClassName="h-12 lg:h-[49px] flex-1"
                        isLabelHidden={true}
                    />
                    <CustomizedInput
                        fieldName="doctors[0].phone"
                        placeholder={t("signUpPage.medicalData.doctorPhonePlaceholder")}
                        inputType="tel"
                        fieldClassName="h-12 lg:h-[49px] flex-1"
                        isLabelHidden={true}
                    />
                    <CustomizedInput
                        fieldName="doctors[0].specialization"
                        placeholder={t("signUpPage.medicalData.doctorSpecializationPlaceholder")}
                        fieldClassName="h-12 lg:h-[49px] flex-1"
                        isLabelHidden={true}
                    />
                </div>
            )}
        </div>
    );
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
                            fieldClassName="h-24 lg:h-32"
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
                            disabled={isSubmitting || loading || !(isValid && dirty)}
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

