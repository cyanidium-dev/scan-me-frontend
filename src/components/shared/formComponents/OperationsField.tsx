"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "./CustomizedInput";
import YearPicker from "./YearPicker";
import MainButton from "../buttons/MainButton";
import CrossIcon from "../icons/CrossIcon";
import PlusIcon from "../icons/PlusIcon";

export default function OperationsField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const operations = values.operations || [{ name: "", year: "" }];

    // Переконатися, що завжди є принаймні один елемент
    const safeOperations = operations.length > 0 ? operations : [{ name: "", year: "" }];

    const addOperation = () => {
        setFieldValue("operations", [...safeOperations, { name: "", year: "" }]);
    };

    const removeOperation = (index: number) => {
        if (index === 0 && safeOperations.length === 1) {
            // Не можна видалити останнє поле, просто очистити його
            setFieldValue("operations", [{ name: "", year: "" }]);
        } else {
            const newOperations = safeOperations.filter((_: any, i: number) => i !== index);
            setFieldValue("operations", newOperations.length > 0 ? newOperations : [{ name: "", year: "" }]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                {t("signUpPage.medicalData.operations")}
            </label>
            {/* Перше поле завжди показується без хрестика */}
            <div className="flex gap-2">
                <CustomizedInput
                    fieldName="operations[0].name"
                    placeholder={t("signUpPage.medicalData.operationsPlaceholder")}
                    fieldClassName="h-12 lg:h-[49px] flex-1"
                    isLabelHidden={true}
                />
                <YearPicker
                    fieldName="operations[0].year"
                    placeholder={t("signUpPage.medicalData.yearPlaceholder")}
                    className="w-[120px]"
                />
            </div>
            {/* Додаткові поля з хрестиками */}
            {safeOperations.length > 1 && (
                <>
                    {safeOperations.slice(1).map((operation: { name: string; year: string }, index: number) => (
                        <div key={index + 1} className="flex gap-2 relative">
                            <div className="flex-1 flex gap-2">
                                <CustomizedInput
                                    fieldName={`operations[${index + 1}].name`}
                                    placeholder={t("signUpPage.medicalData.operationsPlaceholder")}
                                    fieldClassName="h-12 lg:h-[49px] flex-1"
                                    isLabelHidden={true}
                                />
                                <YearPicker
                                    fieldName={`operations[${index + 1}].year`}
                                    placeholder={t("signUpPage.medicalData.yearPlaceholder")}
                                    className="w-[120px]"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeOperation(index + 1)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-accent hover:text-accent/70 focus-visible:text-accent/70 focus-visible:outline-none cursor-pointer transition duration-300 z-10"
                                aria-label="Remove operation"
                            >
                                <CrossIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </>
            )}
            <MainButton
                type="button"
                variant="red"
                onClick={addOperation}
                className="w-fit px-4 lg:px-6 h-12"
            >
                {t("signUpPage.medicalData.addOperation")}
                <PlusIcon className="ml-2.5" />
            </MainButton>
        </div>
    );
}

