"use client";

import { Field, ErrorMessage, useFormikContext } from "formik";
import { useId } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface CustomizedCheckboxProps {
    fieldName: string;
    label: string;
    className?: string;
}

export default function CustomizedCheckbox({ fieldName, label, className }: CustomizedCheckboxProps) {
    const checkboxId = useId();

    return (
        <div className={twMerge("flex items-center gap-3 relative p-2", className)}>
            <Field name={fieldName}>
                {({ field, meta }: { field: any; meta: any }) => {
                    const hasError = meta.touched && meta.error;
                    const isChecked = field.value || false;

                    return (
                        <>
                            <input
                                type="checkbox"
                                id={checkboxId}
                                checked={isChecked}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                className={twMerge(
                                    "w-4 h-4 rounded border cursor-pointer transition duration-300 appearance-none",
                                    "border-black bg-transparent",
                                    "hover:border-accent/60 focus-visible:border-accent focus-visible:outline-none",
                                    hasError && "border-accent",
                                    isChecked && "bg-accent border-accent"
                                )}
                                style={{
                                    backgroundImage: isChecked
                                        ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E\")"
                                        : "none",
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            />
                            <label
                                htmlFor={checkboxId}
                                className={twMerge(
                                    "text-[12px] lg:text-[14px] font-normal leading-[120%] cursor-pointer",
                                    hasError ? "text-accent" : "text-black"
                                )}
                            >
                                {label}
                            </label>
                        </>
                    );
                }}
            </Field>
            <ErrorMessage
                name={fieldName}
                component="p"
                className="absolute bottom-[-12px] left-0 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent"
            />
        </div>
    );
}

