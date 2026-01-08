"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useTranslations, useLocale } from "next-intl";
import { DatePicker } from "@heroui/react";
import { CalendarDate, parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import { PersonalDataValidation } from "@/schemas/PersonalDataValidation";

function DatePickerField({ fieldName, label }: { fieldName: string; label: string }) {
    const { setFieldValue, setFieldTouched, validateField, values, errors, touched } = useFormikContext<any>();
    const locale = useLocale();
    const hasError = !!(touched[fieldName] && errors[fieldName]);
    
    // Локальний стан для DatePicker - uncontrolled режим, як в прикладі Hero UI
    const [dateValue, setDateValue] = useState<CalendarDate | null>(() => {
        // Ініціалізуємо з Formik значенням
        if (values[fieldName]) {
            try {
                return parseDate(values[fieldName]);
            } catch (e) {
                return null;
            }
        }
        return null;
    });
    
    // Мапінг мов для Hero UI DatePicker
    const localeMap: Record<string, string> = {
        uk: "uk-UA",
        en: "en-US",
        pl: "pl-PL",
    };
    
    const datePickerLocale = localeMap[locale] || "uk-UA";
    
    // Максимальна дата - сьогодні
    const maxDate = today(getLocalTimeZone());

    // Обробка зміни дати - як в прикладі Hero UI, просто передаємо setDateValue
    // DatePicker сам керує своїм станом під час введення
    const handleChange = (date: CalendarDate | null) => {
        setDateValue(date);
        // Оновлюємо Formik тільки коли дата повна
        if (date) {
            const dateString = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
            setFieldValue(fieldName, dateString);
            // Викликаємо валідацію після встановлення значення
            setTimeout(() => {
                validateField(fieldName);
            }, 0);
        } else {
            setFieldValue(fieldName, "");
        }
        setFieldTouched(fieldName, true, false);
    };

    return (
        <div className="flex flex-col relative">
            <label className="mb-2 text-[12px] lg:text-[14px] font-medium leading-[120%]">
                {label}
            </label>
            <I18nProvider locale={datePickerLocale}>
                <DatePicker
                    value={dateValue}
                    onChange={handleChange}
                    onBlur={() => {
                        setFieldTouched(fieldName, true, true);
                    }}
                    label=""
                    labelPlacement="outside"
                    isInvalid={hasError}
                    variant="bordered"
                    maxValue={maxDate}
                    classNames={{
                        base: "w-full",
                        inputWrapper: twMerge(
                            "relative w-full px-4 py-3 lg:p-4 h-12 rounded-full text-[12px] lg:text-[14px] leading-[120%] font-normal outline-none border transition duration-300 ease-out shadow-none bg-transparent",
                            hasError
                                ? "!border-accent data-[hover=true]:!border-accent group-data-[focus=true]:!border-accent"
                                : "border-black/40 data-[hover=true]:border-black/60 group-data-[focus=true]:border-black/60"
                        ),
                        input: twMerge(
                            "text-[12px] lg:text-[14px] leading-[120%] font-normal bg-transparent uppercase",
                            hasError 
                                ? "!text-accent placeholder:!text-accent/40 [&::placeholder]:!text-accent/40" 
                                : "text-black placeholder:text-black/40 [&::placeholder]:text-black/40"
                        ),
                        segment: twMerge(
                            "text-[12px] lg:text-[14px] leading-[120%] font-normal uppercase",
                            hasError 
                                ? "!text-accent placeholder:!text-accent/40 [&::placeholder]:!text-accent/40" 
                                : "text-black placeholder:text-black/40 [&::placeholder]:text-black/40"
                        ),
                        innerWrapper: "bg-transparent",
                    }}
                />
            </I18nProvider>
            <ErrorMessage
                name={fieldName}
                component="p"
                className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent"
            />
        </div>
    );
}

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

                        <DatePickerField
                            fieldName="dateOfBirth"
                            label={t("signUpPage.personalData.dateOfBirth")}
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

