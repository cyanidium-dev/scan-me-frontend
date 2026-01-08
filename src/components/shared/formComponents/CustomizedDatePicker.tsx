"use client";

import { DatePicker } from "@heroui/react";
import {
  Field,
  ErrorMessage,
  useFormikContext,
  FieldInputProps,
  FieldMetaProps,
} from "formik";
import { useId } from "react";
import { twMerge } from "tailwind-merge";
import { CalendarDate, parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useLocale } from "next-intl";

interface Values {
  [fieldName: string]: string;
}

interface CustomizedDatePickerProps {
  fieldName: string;
  label?: string;
  labelClassName?: string;
  fieldClassName?: string;
  placeholder?: string;
  isLabelHidden?: boolean;
}

export default function CustomizedDatePicker({
  fieldName,
  label,
  labelClassName = "",
  fieldClassName = "",
  placeholder = "",
  isLabelHidden = false,
}: CustomizedDatePickerProps) {
  const { setFieldValue, setFieldTouched } = useFormikContext<Values>();
  const inputId = useId();
  const locale = useLocale();
  
  // Мапінг мов для Hero UI DatePicker
  const localeMap: Record<string, string> = {
    uk: "uk-UA",
    en: "en-US",
    pl: "pl-PL",
  };
  
  const datePickerLocale = localeMap[locale] || "uk-UA";

  return (
    <label
      htmlFor={inputId}
      className={`relative flex flex-col w-full ${labelClassName}`}
    >
      {label ? (
        <span
          className={twMerge(
            "mb-2 text-[12px] lg:text-[14px] font-medium leading-[120%]",
            isLabelHidden && "sr-only"
          )}
        >
          {label}
        </span>
      ) : null}
      <div className="relative w-full">
        <Field name={fieldName}>
          {({
            field,
            meta,
          }: {
            field: FieldInputProps<string>;
            meta: FieldMetaProps<string>;
          }) => {
            const hasError = meta.touched && meta.error;
            
            // Конвертуємо значення з рядка в CalendarDate
            let dateValue: CalendarDate | null = null;
            if (field.value) {
              try {
                dateValue = parseDate(field.value);
              } catch (e) {
                // Якщо не вдається розпарсити, залишаємо null
                dateValue = null;
              }
            }

            return (
              <>
                <I18nProvider locale={datePickerLocale}>
                  <DatePicker
                    id={inputId}
                    value={dateValue}
                    onChange={(date: CalendarDate | null) => {
                      if (date) {
                        const dateString = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
                        setFieldValue(fieldName, dateString);
                        setFieldTouched(fieldName, true, false);
                      } else {
                        setFieldValue(fieldName, "");
                        setFieldTouched(fieldName, true, false);
                      }
                    }}
                    onBlur={() => {
                      setFieldTouched(fieldName, true, true);
                    }}
                    label=""
                    labelPlacement="outside"
                    isInvalid={!!hasError}
                    classNames={{
                    base: "w-full",
                    inputWrapper: twMerge(
                      "relative w-full px-4 py-3 lg:p-4 pr-12 h-[39px] lg:h-[49px] rounded-full text-[12px] lg:text-[14px] leading-[120%] font-normal outline-none border transition duration-300 ease-out shadow-none",
                      fieldClassName,
                      hasError
                        ? "border-accent data-[hover=true]:border-accent group-data-[focus=true]:border-accent bg-transparent"
                        : "border-black/40 data-[hover=true]:border-black/60 group-data-[focus=true]:border-black/60 bg-transparent"
                    ),
                    input: twMerge(
                      "text-[12px] lg:text-[14px] leading-[120%] font-normal bg-transparent",
                      hasError ? "text-accent placeholder:text-accent/40" : "text-black placeholder:text-black/40"
                    ),
                    innerWrapper: "bg-transparent text-accent",
                    popoverContent: "rounded-2xl bg-white shadow-lg border border-black/10 p-4",
                    calendar: "rounded-2xl",
                    calendarContent: "p-4",
                    selectorButton: twMerge(
                    
                      hasError ? "!text-accent" : "text-black"
                    ),
                    selectorIcon: twMerge(hasError ? "!text-accent" : "text-black"         
                    ),
                  }}
                  />
                </I18nProvider>
              </>
            );
          }}
        </Field>
      </div>

      <ErrorMessage
        name={fieldName}
        component="p"
        className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent truncate"
      />
    </label>
  );
}

