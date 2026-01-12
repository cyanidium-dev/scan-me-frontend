"use client";

import { useFormikContext } from "formik";
import { useTranslations, useLocale } from "next-intl";
import { DatePicker } from "@heroui/react";
import { CalendarDate, parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { ErrorMessage } from "formik";

interface DatePickerFieldProps {
    fieldName: string;
    label: string;
}

export default function DatePickerField({ fieldName, label }: DatePickerFieldProps) {
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

