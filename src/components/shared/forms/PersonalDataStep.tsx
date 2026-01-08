"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import { PersonalDataValidation } from "@/schemas/PersonalDataValidation";

interface PersonalDataStepProps {
    initialValues: {
        name: string;
        surname: string;
        dateOfBirth: string;
        gender: string;
        country: string;
        city: string;
        address: string;
    };
    onSubmit: (values: any) => void;
    onBack: () => void;
}

export default function PersonalDataStep({
    initialValues,
    onSubmit,
    onBack,
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

                    <div className="flex flex-col gap-6 lg:gap-8">
                        <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row lg:justify-between">  
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

                        <CustomizedInput
                            fieldName="dateOfBirth"
                            label={t("signUpPage.personalData.dateOfBirth")}
                            placeholder={t("signUpPage.personalData.dateOfBirthPlaceholder")}
                            inputType="date"
                            fieldClassName="h-12 lg:h-[49px]"
                        />

                        {/* Поле статі */}
                        <div className="flex flex-col relative">
                            <label className="mb-2 text-[12px] lg:text-[14px] font-medium leading-[120%]">
                                {t("signUpPage.personalData.gender")}
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        className="w-4 h-4 text-accent border-black/40 focus:ring-accent focus:ring-2"
                                    />
                                    <span className="text-[12px] lg:text-[14px]">
                                        {t("signUpPage.personalData.male")}
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        className="w-4 h-4 text-accent border-black/40 focus:ring-accent focus:ring-2 checked:bg-accent"
                                    />
                                    <span className="text-[12px] lg:text-[14px]">
                                        {t("signUpPage.personalData.female")}
                                    </span>
                                </label>
                            </div>
                            <ErrorMessage
                                name="gender"
                                component="p"
                                className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent"
                            />
                        </div>

                        {/* Адреса - опціональні поля */}
                        <div className="flex flex-col gap-4">
                            <CustomizedInput
                                fieldName="country"
                                label={t("signUpPage.personalData.address")}
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

                    {/* Кнопки */}
                    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4 mt-4 lg:mt-6">
                        <MainButton
                            type="button"
                            variant="outlineBlack"
                            className="w-full lg:w-auto lg:px-8 h-[54px]"
                            onClick={onBack}
                            disabled={isSubmitting}
                        >
                            {t("signUpPage.backButton")}
                        </MainButton>
                        <MainButton
                            type="submit"
                            variant="gradient"
                            className="w-full lg:flex-1 h-[54px]"
                            disabled={isSubmitting || !(isValid && dirty)}
                        >
                            {isSubmitting
                                ? t("forms.loading")
                                : t("signUpPage.nextButton")}
                        </MainButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

