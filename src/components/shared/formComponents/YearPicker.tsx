"use client";

import { useFormikContext } from "formik";
import { DatePicker } from "@heroui/react";
import { CalendarDate, parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { ErrorMessage } from "formik";

interface YearPickerProps {
    fieldName: string;
    placeholder: string;
    className?: string;
}

export default function YearPicker({ fieldName, placeholder, className }: YearPickerProps) {
    const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext<any>();
    const hasError = !!(touched[fieldName] && errors[fieldName]);

    // Локальний стан для DatePicker
    const [dateValue, setDateValue] = useState<CalendarDate | null>(() => {
        if (values[fieldName]) {
            try {
                // Якщо значення - це рік (наприклад, "2020"), створюємо дату з 1 січня
                const year = parseInt(values[fieldName]);
                if (!isNaN(year) && year >= 1900 && year <= 2100) {
                    return new CalendarDate(year, 1, 1);
                }
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    const maxDate = today(getLocalTimeZone());

    const handleChange = (date: CalendarDate | null) => {
        setDateValue(date);
        if (date) {
            // Зберігаємо тільки рік
            setFieldValue(fieldName, date.year.toString());
        } else {
            setFieldValue(fieldName, "");
        }
        setFieldTouched(fieldName, true, false);
    };

    return (
        <div className={twMerge("flex flex-col relative", className)}>
            <I18nProvider locale="uk-UA">
                <DatePicker
                    value={dateValue}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched(fieldName, true, true)}
                    label=""
                    labelPlacement="outside"
                    isInvalid={hasError}
                    variant="bordered"
                    maxValue={maxDate}
                    granularity="year"
                    calendarProps={{
                        visibleMonths: 1,
                    }}
                    classNames={{
                        base: "w-full",
                        inputWrapper: twMerge(
                            "relative w-full px-4 py-3 lg:p-4 h-12 rounded-full text-[12px] lg:text-[14px] leading-[120%] font-normal outline-none border transition duration-300 ease-out shadow-none bg-transparent",
                            hasError
                                ? "!border-accent data-[hover=true]:!border-accent group-data-[focus=true]:!border-accent"
                                : "border-black/40 data-[hover=true]:border-black/60 group-data-[focus=true]:border-black/60"
                        ),
                        input: twMerge(
                            "text-[12px] lg:text-[14px] leading-[120%] font-normal bg-transparent",
                            hasError
                                ? "!text-accent placeholder:!text-accent/40 [&::placeholder]:!text-accent/40"
                                : "text-black placeholder:text-black/40 [&::placeholder]:text-black/40"
                        ),
                        segment: twMerge(
                            "text-[12px] lg:text-[14px] leading-[120%] font-normal",
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

