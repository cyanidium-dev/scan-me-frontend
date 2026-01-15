"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "./CustomizedInput";
import MainButton from "../buttons/MainButton";
import CrossIcon from "../icons/CrossIcon";
import PlusIcon from "../icons/PlusIcon";

export default function MedicationsField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const medications = values.medications || [""];

    // Переконатися, що завжди є принаймні один елемент і всі значення є рядками
    const safeMedications =
        medications.length > 0
            ? medications.map((m: any) => (m === null || m === undefined ? "" : String(m)))
            : [""];

    const addMedication = () => {
        setFieldValue("medications", [...safeMedications, ""]);
    };

    const removeMedication = (index: number) => {
        if (index === 0 && safeMedications.length === 1) {
            // Не можна видалити останнє поле, просто очистити його
            setFieldValue("medications", [""]);
        } else {
            const newMedications = safeMedications.filter((_: string, i: number) => i !== index);
            setFieldValue("medications", newMedications.length > 0 ? newMedications : [""]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                {t("signUpPage.medicalData.medications")}
            </label>
            {/* Перше поле: на мобілці окремо, на десктопі в рядку з кнопкою */}
            <div className="flex flex-col gap-2">
                {/* Мобільна версія */}
                <div className="flex lg:hidden flex-col gap-2">
                    <div className="relative">
                        <CustomizedInput
                            fieldName="medications[0]"
                            placeholder={t("signUpPage.medicalData.medicationsPlaceholder")}
                            fieldClassName="h-12"
                            isLabelHidden={true}
                        />
                    </div>
                    {safeMedications.length === 1 && (
                        <MainButton
                            type="button"
                            variant="red"
                            onClick={addMedication}
                            className="w-fit px-4 h-12 normal-case"
                        >
                            {t("signUpPage.medicalData.addMedication")}
                            <PlusIcon className="ml-2.5" />
                        </MainButton>
                    )}
                </div>
                {/* Десктопна версія */}
                <div className="hidden lg:flex gap-2 relative">
                    <CustomizedInput
                        fieldName="medications[0]"
                        placeholder={t("signUpPage.medicalData.medicationsPlaceholder")}
                        fieldClassName="h-[49px] w-[356px]"
                        labelClassName="lg:w-[356px]"
                        isLabelHidden={true}
                    />
                    {safeMedications.length === 1 && (
                        <MainButton
                            type="button"
                            variant="red"
                            onClick={addMedication}
                            className="w-fit px-6 h-12 normal-case"
                        >
                            {t("signUpPage.medicalData.addMedication")}
                            <PlusIcon className="ml-2.5" />
                        </MainButton>
                    )}
                </div>
            </div>
            {/* Додаткові поля з хрестиками */}
            {safeMedications.length > 1 && (
                <>
                    {safeMedications.slice(1).map((medication: string, index: number) => {
                        const isLast = index === safeMedications.length - 2; // Останній елемент в додаткових полях
                        return (
                            <div key={index + 1} className="flex flex-col gap-2">
                                {/* Мобільна версія */}
                                <div className="flex lg:hidden flex-col gap-2">
                                    <div className="relative">
                                        <CustomizedInput
                                            fieldName={`medications[${index + 1}]`}
                                            placeholder={t("signUpPage.medicalData.medicationsPlaceholder")}
                                            fieldClassName="h-12"
                                            isLabelHidden={true}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeMedication(index + 1)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent/70 focus-visible:text-accent/70 focus-visible:outline-none cursor-pointer transition duration-300 z-10"
                                            aria-label="Remove medication"
                                        >
                                            <CrossIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {isLast && (
                                        <MainButton
                                            type="button"
                                            variant="red"
                                            onClick={addMedication}
                                            className="w-fit px-4 h-12 normal-case"
                                        >
                                            {t("signUpPage.medicalData.addMedication")}
                                            <PlusIcon className="ml-2.5" />
                                        </MainButton>
                                    )}
                                </div>
                                {/* Десктопна версія */}
                                <div className="hidden lg:flex gap-2 relative">
                                    <div className="relative">
                                        <CustomizedInput
                                            fieldName={`medications[${index + 1}]`}
                                            placeholder={t("signUpPage.medicalData.medicationsPlaceholder")}
                                            fieldClassName="h-[49px] w-[356px]"
                                            isLabelHidden={true}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeMedication(index + 1)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent/70 focus-visible:text-accent/70 focus-visible:outline-none cursor-pointer transition duration-300 z-10"
                                            aria-label="Remove medication"
                                        >
                                            <CrossIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {isLast && (
                                        <MainButton
                                            type="button"
                                            variant="red"
                                            onClick={addMedication}
                                            className="w-fit px-6 h-12 normal-case"
                                        >
                                            {t("signUpPage.medicalData.addMedication")}
                                            <PlusIcon className="ml-2.5" />
                                        </MainButton>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}

