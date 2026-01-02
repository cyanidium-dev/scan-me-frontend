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
              "mb-2 text-[12px] lg:text-[14px] font-medium leading-[120%]",
              isLabelHidden && "sr-only"
            )
          )}
        >
          {label}
        </span>
      ) : null}
      <div className="relative w-full">
        {icon ? <div className="absolute top-3 left-4 z-10">{icon}</div> : null}
        <Field name={fieldName}>
          {({
            field,
            meta,
          }: {
            field: FieldInputProps<string>;
            meta: FieldMetaProps<string>;
          }) => {
            const commonProps = {
              id: inputId,
              className: twMerge(
                "relative w-full px-4 py-3 lg:p-4 h-[39px] lg:h-[49px] rounded-full text-[12px] lg:text-[14px] leading-[120%] font-normal placeholder:text-black/40 outline-none resize-none border transition duration-300 ease-out",
                fieldClassName,
                meta.touched && meta.error
                  ? "border-accent"
                  : "border-black/40",
                `${icon ? "pl-[50px] lg:pl-[50px]" : ""}`
              ),
            };

            if (inputType === "tel") {
              return (
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
                    arrowComponent: () => <ShevronIcon className="size-6" />,
                  }}
                />
              );
            }

            if (as === "textarea") {
              return (
                <textarea
                  {...field}
                  {...commonProps}
                  autoComplete="on"
                  placeholder={placeholder}
                />
              );
            }

            return (
              <input
                {...field}
                {...commonProps}
                type={inputType}
                autoComplete="on"
                placeholder={placeholder}
              />
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
