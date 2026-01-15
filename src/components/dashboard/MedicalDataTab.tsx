"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileData, updateMedicalData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import CustomizedInput from "@/components/shared/formComponents/CustomizedInput";
import BloodTypeSelect from "@/components/shared/formComponents/BloodTypeSelect";
import RhFactorRadioGroup from "@/components/shared/formComponents/RhFactorRadioGroup";
import AllergiesField from "@/components/shared/formComponents/AllergiesField";
import OperationsField from "@/components/shared/formComponents/OperationsField";
import MedicationsField from "@/components/shared/formComponents/MedicationsField";
import DoctorsField from "@/components/shared/formComponents/DoctorsField";
import MainButton from "@/components/shared/buttons/MainButton";
import { MedicalDataValidation } from "@/schemas/MedicalDataValidation";

interface MedicalDataTabProps {
    profileData: UserProfileData | null;
    onProfileUpdate?: () => void;
}

export default function MedicalDataTab({
    profileData,
    onProfileUpdate,
}: MedicalDataTabProps) {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");
    const tSignUp = useTranslations("signUpPage.medicalData");
    const tForms = useTranslations("forms");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const validationSchema = MedicalDataValidation();

    if (!profileData) {
        return (
            <div className="">
                <p>Профіль користувача ще не заповнений.</p>
            </div>
        );
    }

    const initialValues = {
        bloodType: profileData.medicalData.bloodType || "",
        rhFactor: profileData.medicalData.rhFactor || "",
        allergies: profileData.medicalData.allergies || [],
        chronicDiseases: profileData.medicalData.chronicDiseases || "",
        operations: profileData.medicalData.operations || [],
        medications: profileData.medicalData.medications || [],
        doctors: profileData.medicalData.doctors || [],
    };

    const handleSubmit = async (values: typeof initialValues) => {
        if (!user?.uid) {
            setError("Користувач не авторизований");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            // Фільтруємо порожні значення з масивів
            const filteredAllergies = values.allergies.filter(
                allergy => allergy.trim() !== ""
            );
            const filteredMedications = values.medications.filter(
                medication => medication.trim() !== ""
            );
            const filteredOperations = values.operations.filter(
                operation =>
                    operation.name.trim() !== "" || operation.year.trim() !== ""
            );
            const filteredDoctors = values.doctors.filter(
                doctor =>
                    doctor.name.trim() !== "" ||
                    doctor.phone.trim() !== "" ||
                    doctor.specialization.trim() !== ""
            );

            // Оновлюємо медичні дані
            await updateMedicalData(user.uid, {
                bloodType: values.bloodType,
                rhFactor: values.rhFactor,
                allergies: filteredAllergies,
                chronicDiseases: values.chronicDiseases,
                operations: filteredOperations,
                medications: filteredMedications,
                doctors: filteredDoctors,
            });

            setSuccess(true);

            // Викликаємо callback для оновлення даних в батьківському компоненті
            if (onProfileUpdate) {
                await onProfileUpdate();
            }

            // Приховуємо повідомлення про успіх через 3 секунди
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err: any) {
            console.error("Помилка оновлення медичних даних:", err);
            setError(err.message || "Не вдалося зберегти дані");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validateOnMount={true}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <div className="lg:px-6 lg:py-8 rounded-[16px] lg:shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1)]">
                        <SectionTitle className="mb-6 lg:mb-8 text-[24px] lg:text-[32px] xl:text-[32px]">
                            {t("medicalData.title")}
                        </SectionTitle>
                        {error && (
                            <div className="bg-accent/15 border border-accent text-accent px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                                Дані успішно збережено
                            </div>
                        )}
                        <div className="flex flex-col gap-6 lg:gap-8">
                            {/* Група крові та Резус-фактор */}
                            <div className="flex flex-col lg:flex-row gap-6">
                                <BloodTypeSelect
                                    fieldName="bloodType"
                                    label={tSignUp("bloodType")}
                                    placeholder={tSignUp(
                                        "bloodTypePlaceholder"
                                    )}
                                    className="lg:w-[calc(50%-12px)]"
                                />
                                <RhFactorRadioGroup
                                    fieldName="rhFactor"
                                    label={tSignUp("rhFactor")}
                                    className="lg:w-[calc(50%-12px)]"
                                />
                            </div>

                            {/* Алергії */}
                            <AllergiesField />

                            {/* Хронічні захворювання */}
                            <CustomizedInput
                                fieldName="chronicDiseases"
                                label={tSignUp("chronicDiseases")}
                                placeholder={tSignUp(
                                    "chronicDiseasesPlaceholder"
                                )}
                                as="textarea"
                                fieldClassName="h-24 lg:h-32 rounded-[14px]"
                            />

                            {/* Перенесені операції */}
                            <OperationsField />

                            {/* Прийняті ліки */}
                            <MedicationsField />

                            {/* Контакти лікарів */}
                            <DoctorsField />
                        </div>
                    </div>
                    {/* Кнопка збереження */}
                    <div className="flex justify-end mt-12 lg:mt-6">
                        <MainButton
                            type="submit"
                            variant="gradient"
                            className="w-full lg:w-[399px] px-10 lg:px-22.5 h-[54px]"
                            disabled={isSubmitting || loading || !isValid}
                            isLoading={isSubmitting || loading}
                            loadingText={tForms("loading")}
                        >
                            {t("personalData.saveButton") || "Зберегти дані"}
                        </MainButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
