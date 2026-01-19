"use client";

import {
  Field,
  ErrorMessage,
  useFormikContext,
  FieldInputProps,
  FieldMetaProps,
} from "formik";
import { useId, ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import PhoneInput from "react-phone-number-input";
import ShevronIcon from "../icons/ShevronIcon";

interface Values {
  [fieldName: string]: string;
}

interface CustomizedInputProps {
  fieldName: string;
  label?: string;
  labelClassName?: string;
  fieldClassName?: string;
  inputType?: string;
  placeholder?: string;
  isLabelHidden?: boolean;
  as?: string;
  icon?: ReactNode;
  hasClearButton?: boolean;
}

export default function CustomizedInput({
  fieldName,
  label,
  labelClassName = "",
  fieldClassName = "",
  inputType = "text",
  placeholder = "",
  isLabelHidden = false,
  as,
  icon,
  hasClearButton = false,
}: CustomizedInputProps) {
  const { setFieldValue, setFieldTouched } = useFormikContext<Values>();
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={`relative flex flex-col w-full ${labelClassName}`}
    >
      {label ? (
        <span
          className={twMerge(
            clsx(
              "mb-2 text-[14px] font-medium leading-[120%]",
              isLabelHidden && "sr-only"
            )
          )}
        >
          {label}
        </span>
      ) : null}
      <div className="relative">
        <Field name={fieldName}>
          {({
            field,
            meta,
          }: {
            field: FieldInputProps<string>;
            meta: FieldMetaProps<string>;
          }) => {
            const hasError = meta.touched && meta.error;

            const commonProps = {
              id: inputId,
              className: twMerge(
                "relative w-full px-4 py-3 lg:p-4 h-[39px] lg:h-[49px] rounded-full text-[12px] lg:text-[14px] leading-[120%] font-normal outline-none resize-none border transition duration-300 ease-out",
                fieldClassName,
                hasError
                  ? "border-accent text-accent placeholder:text-accent/40"
                  : "border-black/40 text-black placeholder:text-black/40",
                icon ? "pl-[50px] lg:pl-[50px]" : "",
                hasClearButton ? "pr-12 lg:pr-12" : ""
              ),
            };

            return (
              <>
                {icon && (
                  <div
                    className={clsx(
                      "absolute top-3 left-4 z-10 transition-colors",
                      hasError ? "text-accent" : "text-black"
                    )}
                  >
                    {icon}
                  </div>
                )}

                {inputType === "tel" ? (
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    country="DK"
                    defaultCountry="UA"
                    autoComplete="on"
                    {...field}
                    {...commonProps}
                    onChange={(value) => {
                      setFieldValue(fieldName, value || "");
                      setFieldTouched(fieldName, true, false);
                    }}
                    countrySelectProps={{
                      arrowComponent: () => (
                        <ShevronIcon
                          className={clsx(
                            "size-6",
                            hasError ? "text-accent" : "text-black"
                          )}
                        />
                      ),
                    }}
                  />
                ) : as === "textarea" ? (
                  <textarea
                    {...field}
                    {...commonProps}
                    placeholder={placeholder}
                  />
                ) : (
                  <input
                    {...field}
                    {...commonProps}
                    type={inputType}
                    placeholder={placeholder}
                  />
                )}
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
