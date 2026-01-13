"use client";

import { useFormikContext } from "formik";
import { Select, SelectItem } from "@heroui/react";
import { ErrorMessage } from "formik";
import { twMerge } from "tailwind-merge";

interface BloodTypeSelectProps {
    fieldName: string;
    label: string;
    placeholder: string;
    className?: string;
}

const bloodTypes = [
    { value: "I", label: "I (0)" },
    { value: "II", label: "II (A)" },
    { value: "III", label: "III (B)" },
    { value: "IV", label: "IV (AB)" },
];

export default function BloodTypeSelect({ fieldName, label, placeholder, className }: BloodTypeSelectProps) {
    const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext<any>();
    const hasError = !!(touched[fieldName] && errors[fieldName]);

    const handleChange = (value: string) => {
        setFieldValue(fieldName, value);
        setFieldTouched(fieldName, true, false);
    };

    return (
        <div className={twMerge("flex flex-col relative lg:max-w-[356px]", className)}>
            <label className="mb-2 text-[14px] font-medium leading-[120%]">
                {label}
            </label>
            <Select
                selectedKeys={values[fieldName] ? [values[fieldName]] : []}
                onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys)[0] as string;
                    handleChange(selectedValue || "");
                }}
                onBlur={() => setFieldTouched(fieldName, true, true)}
                placeholder={placeholder}
                isInvalid={hasError}
                variant="bordered"
                classNames={{
                    base: "w-full !bg-white cursor-pointer",
                    trigger: twMerge(
                        "relative cursor-pointer w-full px-4 py-3 lg:p-4 h-12 rounded-full text-[12px] lg:text-[14px] leading-[120%] !text-black/40 font-normal outline-none border transition duration-300 ease-out shadow-none bg-transparent",
                        hasError
                            ? "!border-accent data-[hover=true]:!border-accent group-data-[focus=true]:!border-accent"
                            : "border-black/40 data-[hover=true]:border-black/60 group-data-[focus=true]:border-black/60"
                    ),
                    value: twMerge(
                        "text-[12px] lg:text-[14px] leading-[120%] font-normal",
                        hasError ? "!text-accent" : "text-black/40"
                    ),
                 
                }}
            >
                {bloodTypes.map((type) => (
                    <SelectItem 
                        key={type.value}
                        classNames={{
                            base: "data-[hover=true]:bg-accent/40 transition duration-300 ease-out",
                        }}
                    >
                        {type.label}
                    </SelectItem>
                ))}
            </Select>
            <ErrorMessage
                name={fieldName}
                component="p"
                className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent"
            />
        </div>
    );
}

