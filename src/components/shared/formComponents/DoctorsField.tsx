"use client";

import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import CustomizedInput from "./CustomizedInput";
import MainButton from "../buttons/MainButton";
import CrossIcon from "../icons/CrossIcon";
import PlusIcon from "../icons/PlusIcon";

export default function DoctorsField() {
    const { values, setFieldValue } = useFormikContext<any>();
    const t = useTranslations();
    const doctors = values.doctors || [{ name: "", phone: "", specialization: "" }];

    // Переконатися, що завжди є принаймні один елемент
    const safeDoctors = doctors.length > 0 ? doctors : [{ name: "", phone: "", specialization: "" }];

    const addDoctor = () => {
        setFieldValue("doctors", [...safeDoctors, { name: "", phone: "", specialization: "" }]);
    };

    const removeDoctor = (index: number) => {
        if (index === 0 && safeDoctors.length === 1) {
            // Не можна видалити останнє поле, просто очистити його
            setFieldValue("doctors", [{ name: "", phone: "", specialization: "" }]);
        } else {
            const newDoctors = safeDoctors.filter((_: any, i: number) => i !== index);
            setFieldValue("doctors", newDoctors.length > 0 ? newDoctors : [{ name: "", phone: "", specialization: "" }]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                {t("signUpPage.medicalData.doctorContact")}
            </label>
            {/* Перше поле завжди показується без хрестика */}
            <div className="flex flex-col lg:flex-row gap-2">
                <CustomizedInput
                    fieldName="doctors[0].name"
                    placeholder={t("signUpPage.medicalData.doctorNamePlaceholder")}
                    fieldClassName="h-12 lg:h-[49px] flex-1"
                    isLabelHidden={true}
                />
                <CustomizedInput
                    fieldName="doctors[0].phone"
                    placeholder={t("signUpPage.medicalData.doctorPhonePlaceholder")}
                    inputType="tel"
                    fieldClassName="h-12 lg:h-[49px] flex-1"
                    isLabelHidden={true}
                />
                <CustomizedInput
                    fieldName="doctors[0].specialization"
                    placeholder={t("signUpPage.medicalData.doctorSpecializationPlaceholder")}
                    fieldClassName="h-12 lg:h-[49px] flex-1"
                    isLabelHidden={true}
                />
            </div>
            {/* Додаткові поля з хрестиками */}
            {safeDoctors.length > 1 && (
                <>
                    {safeDoctors.slice(1).map((doctor: { name: string; phone: string; specialization: string }, index: number) => (
                        <div key={index + 1} className="flex flex-col lg:flex-row gap-2 relative">
                            <div className="flex-1 flex flex-col lg:flex-row gap-2">
                                <CustomizedInput
                                    fieldName={`doctors[${index + 1}].name`}
                                    placeholder={t("signUpPage.medicalData.doctorNamePlaceholder")}
                                    fieldClassName="h-12 lg:h-[49px] flex-1"
                                    isLabelHidden={true}
                                />
                                <CustomizedInput
                                    fieldName={`doctors[${index + 1}].phone`}
                                    placeholder={t("signUpPage.medicalData.doctorPhonePlaceholder")}
                                    inputType="tel"
                                    fieldClassName="h-12 lg:h-[49px] flex-1"
                                    isLabelHidden={true}
                                />
                                <CustomizedInput
                                    fieldName={`doctors[${index + 1}].specialization`}
                                    placeholder={t("signUpPage.medicalData.doctorSpecializationPlaceholder")}
                                    fieldClassName="h-12 lg:h-[49px] flex-1"
                                    isLabelHidden={true}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeDoctor(index + 1)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-accent hover:text-accent/70 focus-visible:text-accent/70 focus-visible:outline-none cursor-pointer transition duration-300 z-10"
                                aria-label="Remove doctor"
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
                onClick={addDoctor}
                className="w-fit px-4 lg:px-6 h-12"
            >
                {t("signUpPage.medicalData.addDoctor")}
                <PlusIcon className="ml-2.5" />
            </MainButton>
        </div>
    );
}

