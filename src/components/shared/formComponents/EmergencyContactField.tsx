"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "./CustomizedInput";
import TrashIcon from "../icons/TrashIcon";

interface EmergencyContactFieldProps {
    index: number;
    onRemove?: () => void;
    showRemove?: boolean;
}

export default function EmergencyContactField({ index, onRemove, showRemove = false }: EmergencyContactFieldProps) {
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 relative">
                <CustomizedInput
                    fieldName={`emergencyContacts[${index}].name`}
                    placeholder={t("signUpPage.emergencyData.emergencyContactPlaceholder")}
                    fieldClassName="h-12 lg:h-[49px]"
                    labelClassName="lg:w-[calc(33.33%-5.33px)]"
                    isLabelHidden={true}
                />
                <CustomizedInput
                    fieldName={`emergencyContacts[${index}].phone`}
                    placeholder={t("signUpPage.emergencyData.emergencyContactPhonePlaceholder")}
                    inputType="tel"
                    fieldClassName="h-12 lg:h-[49px] py-0 lg:py-0"
                    labelClassName="lg:w-[calc(33.33%-5.33px)]"
                    isLabelHidden={true}
                />
                <div className="relative lg:w-[calc(33.33%-5.33px)]">
                    <CustomizedInput
                        fieldName={`emergencyContacts[${index}].relationship`}
                        placeholder={t("signUpPage.emergencyData.emergencyContactRelationshipPlaceholder")}
                        fieldClassName="h-12 lg:h-[49px]"
                        isLabelHidden={true}
                        hasClearButton={showRemove}
                    />
                    {showRemove && onRemove && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent/70 focus-visible:text-accent/70 focus-visible:outline-none cursor-pointer transition duration-300 z-10"
                            aria-label="Remove emergency contact"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

