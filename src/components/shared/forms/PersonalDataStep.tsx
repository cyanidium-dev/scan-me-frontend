"use client";

import { Formik, Form } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import PhotoUploadField from "../formComponents/PhotoUploadField";
import DatePickerField from "../formComponents/DatePickerField";
import GenderRadioGroup from "../formComponents/GenderRadioGroup";
import MainButton from "../buttons/MainButton";
import { PersonalDataValidation } from "@/schemas/PersonalDataValidation";
import ShevronIcon from "../icons/ShevronIcon";

interface PersonalDataStepProps {
    initialValues: {
        name: string;
        surname: string;
        dateOfBirth: string;
        gender: string;
        photo: File | null;
        country: string;
        city: string;
        address: string;
    };
    onSubmit: (values: any) => Promise<void>;
    onBack: () => void;
    error?: string | null;
    loading?: boolean;
}

export default function PersonalDataStep({
    initialValues,
    onSubmit,
    onBack,
    error,
    loading = false,
}: PersonalDataStepProps) {
    const t = useTranslations();
    const validationSchema = PersonalDataValidation();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <h2 className="mb-3 lg:mb-4 text-[24px] lg:text-[32px] font-semibold leading-[120%] uppercase">
                        {t("signUpPage.personalData.title")}
                    </h2>
                    <p className="mb-6 lg:mb-8">
                        {t("signUpPage.personalData.description")}
                    </p>

                    {error && (
                        <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-6 lg:gap-8">
                        {/* Верхній блок: основні поля + фото на десктопі */}
                        <div className="lg:flex lg:flex-row lg:gap-6">
                            <div className="flex flex-col gap-6 lg:gap-8 lg:flex-1">
                                <div className="flex flex-col gap-6 lg:gap-6 lg:flex-row lg:justify-between">
                                    <CustomizedInput
                                        fieldName="name"
                                        label={t("signUpPage.personalData.name")}
                                        placeholder={t("signUpPage.personalData.namePlaceholder")}
                                        fieldClassName="h-12 lg:h-[49px]"
                                    />

                                    <CustomizedInput
                                        fieldName="surname"
                                        label={t("signUpPage.personalData.surname")}
                                        placeholder={t("signUpPage.personalData.surnamePlaceholder")}
                                        fieldClassName="h-12 lg:h-[49px]"
                                    />
                                </div>

                                <div className="flex flex-col lg:flex-row gap-6">
                                    <DatePickerField
                                        fieldName="dateOfBirth"
                                        label={t("signUpPage.personalData.dateOfBirth")}
                                        className="lg:w-[calc(50%-12px)]"
                                    />

                                    <div className="flex gap-4 lg:gap-6 lg:w-[calc(50%-12px)]">
                                        {/* Поле статі */}
                                        <div className="w-[calc(50%-8px)] lg:w-[calc(50%-12px)]">
                                            <GenderRadioGroup
                                                fieldName="gender"
                                                label={t("signUpPage.personalData.gender")}
                                            />
                                        </div>

                                        {/* Поле завантаження фото - мобільна версія */}
                                        <PhotoUploadField
                                            fieldName="photo"
                                            className="lg:hidden w-[calc(50%-8px)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Поле завантаження фото - десктопна версія */}
                            <PhotoUploadField
                                fieldName="photo"
                                className="hidden lg:block w-[36%]"
                            />
                        </div>

                        {/* Адреса - опціональні поля (займають всю ширину) */}
                        <div>
                            <span className="inline-block mb-2 text-[14px] font-medium leading-[120%]">
                                {t("signUpPage.personalData.address")}
                            </span>
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
                                <CustomizedInput
                                    fieldName="country"
                                    placeholder={t("signUpPage.personalData.countryPlaceholder")}
                                    fieldClassName="h-12 lg:h-[49px]"
                                />

                                <CustomizedInput
                                    fieldName="city"
                                    placeholder={t("signUpPage.personalData.cityPlaceholder")}
                                    fieldClassName="h-12 lg:h-[49px]"
                                    isLabelHidden={true}
                                />

                                <CustomizedInput
                                    fieldName="address"
                                    placeholder={t("signUpPage.personalData.addressPlaceholder")}
                                    fieldClassName="h-12 lg:h-[49px]"
                                    isLabelHidden={true}
                                />
                            </div>
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

