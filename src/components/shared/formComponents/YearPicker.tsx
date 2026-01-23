"use client";

import { useFormikContext, getIn } from "formik";
import { Select, SelectItem } from "@heroui/react";
import { ErrorMessage } from "formik";
import { twMerge } from "tailwind-merge";

interface YearPickerProps {
    fieldName: string;
    placeholder: string;
    className?: string;
}

// Генеруємо список років від поточного року до 1900
const generateYears = (): string[] => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year.toString());
    }
    return years;
};

const years = generateYears();

export default function YearPicker({ fieldName, placeholder, className }: YearPickerProps) {
    const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext<any>();
    const fieldValue = getIn(values, fieldName);
    const fieldError = getIn(errors, fieldName);
    const fieldTouched = getIn(touched, fieldName);
    const hasError = !!(fieldTouched && fieldError);

    return (
        <div className={twMerge("flex flex-col relative", className)}>
            <Select
                selectedKeys={fieldValue ? [fieldValue] : []}
                onSelectionChange={(keys) => {
                    const keysArray = Array.from(keys);
                    const selectedValue = keysArray.length > 0 ? (keysArray[0] as string) : "";
                    setFieldValue(fieldName, selectedValue);
                    setFieldTouched(fieldName, true, false);
                }}
                onBlur={() => setFieldTouched(fieldName, true, true)}
                placeholder={placeholder}
                isInvalid={hasError}
                variant="bordered"
                disallowEmptySelection={false}
                classNames={{
                    base: "w-full",
                    trigger: twMerge(
                        "relative w-full px-4 py-3 lg:p-4 h-12 rounded-full text-[12px] lg:text-[14px] leading-[120%] text-black/40 font-normal outline-none border transition duration-300 ease-out shadow-none bg-transparent cursor-pointer",
                        hasError
                            ? "!border-accent data-[hover=true]:!border-accent group-data-[focus=true]:!border-accent"
                            : "border-black/40 data-[hover=true]:border-black/60 group-data-[focus=true]:border-black/60 [&[data-placeholder=true]]:text-black/40"
                    ),
                    value: twMerge(
                        "text-[12px] lg:text-[14px] leading-[120%] font-normal",
                        hasError ? "!text-accent" : "text-black/40"
                    ),
                    endContent: "text-black/40",
                    popoverContent: "bg-white",
                    listbox: "px-2",
                }}
                popoverProps={{
                    classNames: {
                        content: "min-w-[120px]",
                    },
                }}
            >
                {years.map((year) => (
                    <SelectItem 
                        key={year}
                        classNames={{
                            base: "data-[hover=true]:bg-accent/40 transition duration-300 ease-out",
                        }}
                    >
                        {year}
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

