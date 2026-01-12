"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import { RadioGroup, Radio } from "@heroui/react";
import { ErrorMessage } from "formik";
import { twMerge } from "tailwind-merge";

interface GenderRadioGroupProps {
    fieldName: string;
    label: string;
    className?: string;
}

export default function GenderRadioGroup({ fieldName, label, className }: GenderRadioGroupProps) {
    const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext<any>();
    const t = useTranslations();
    const hasError = !!(touched[fieldName] && errors[fieldName]);

    const handleChange = (value: string) => {
        setFieldValue(fieldName, value);
        setFieldTouched(fieldName, true, false);
    };

    return (
        <div className={twMerge("flex flex-col relative", className)}>
            <label className="mb-5 text-[14px] font-medium leading-[120%]">
                {label}
            </label>
            <RadioGroup
                value={values[fieldName] || ""}
                onValueChange={handleChange}
                isInvalid={hasError}
                classNames={{
                    base: "gap-4 px-2",
                    wrapper: "lg:w-fit lg:flex-row flex-wrap lg:flex-nowrap gap-4",
                }}
            >
                <Radio
                    value="male"
                    classNames={{
                        base: "max-w-none cursor-pointer",
                        label: "text-[14px] cursor-pointer",
                    }}
                >
                    {t("signUpPage.personalData.male")}
                </Radio>
                <Radio
                    value="female"
                    classNames={{
                        base: "max-w-none cursor-pointer",
                        label: "text-[14px] cursor-pointer",
                    }}
                >
                    {t("signUpPage.personalData.female")}
                </Radio>
            </RadioGroup>
            <ErrorMessage
                name={fieldName}
                component="p"
                className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent"
            />
        </div>
    );
}

