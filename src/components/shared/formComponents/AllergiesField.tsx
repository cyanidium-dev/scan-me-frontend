"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "./CustomizedInput";
import MainButton from "../buttons/MainButton";
import CrossIcon from "../icons/CrossIcon";
import PlusIcon from "../icons/PlusIcon";

export default function AllergiesField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const allergies = values.allergies || [""];

    // Переконатися, що завжди є принаймні один елемент
    const safeAllergies = allergies.length > 0 ? allergies : [""];

    const addAllergy = () => {
        setFieldValue("allergies", [...safeAllergies, ""]);
    };

    const removeAllergy = (index: number) => {
        if (index === 0 && safeAllergies.length === 1) {
            // Не можна видалити останнє поле, просто очистити його
            setFieldValue("allergies", [""]);
        } else {
            const newAllergies = safeAllergies.filter((_: string, i: number) => i !== index);
            setFieldValue("allergies", newAllergies.length > 0 ? newAllergies : [""]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium leading-[120%]">
                {t("signUpPage.medicalData.allergies")}
            </label>
            {/* Перше поле та кнопка в рядок на lg+ */}
            <div className="flex flex-col lg:flex-row gap-2">
                <div className="relative flex-1 w-full lg:max-w-[356px]">
                    <CustomizedInput
                        fieldName="allergies[0]"
                        placeholder={t("signUpPage.medicalData.allergiesPlaceholder")}
                        fieldClassName="h-12 lg:h-[49px]"
                        isLabelHidden={true}
                    />
                </div>
                {/* Кнопка на lg+ в рядку з першим інпутом */}
                <MainButton
                    type="button"
                    variant="red"
                    onClick={addAllergy}
                    className="hidden lg:flex w-fit px-4 lg:px-6 h-12 lg:shrink-0 normal-case"
                >
                    {t("signUpPage.medicalData.allergiesAdd")}
                    <PlusIcon className="ml-2.5" />
                </MainButton>
            </div>
            {/* Додаткові поля з хрестиками */}
            {safeAllergies.length > 1 && (
                <>
                    {safeAllergies.slice(1).map((allergy: string, index: number) => (
                        <div key={index + 1} className="relative w-full lg:max-w-[356px]">
                            <CustomizedInput
                                fieldName={`allergies[${index + 1}]`}
                                placeholder={t("signUpPage.medicalData.allergiesPlaceholder")}
                                fieldClassName="h-12 lg:h-[49px]"
                                isLabelHidden={true}
                            />
                            <button
                                type="button"
                                onClick={() => removeAllergy(index + 1)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent/70 focus-visible:text-accent/70 focus-visible:outline-none cursor-pointer transition duration-300 z-10"
                                aria-label="Remove allergy"
                            >
                                <CrossIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </>
            )}
            {/* Кнопка на мобільних завжди внизу */}
            <MainButton
                type="button"
                variant="red"
                onClick={addAllergy}
                className="lg:hidden w-fit px-4 lg:px-6 h-12 normal-case"
            >
                {t("signUpPage.medicalData.allergiesAdd")}
                <PlusIcon className="ml-2.5" />
            </MainButton>
        </div>
    );
}

