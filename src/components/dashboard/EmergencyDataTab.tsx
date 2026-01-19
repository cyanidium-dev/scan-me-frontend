"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileData, updateEmergencyData } from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import EmergencyContactField from "@/components/shared/formComponents/EmergencyContactField";
import CustomizedCheckbox from "@/components/shared/formComponents/CustomizedCheckbox";
import MainButton from "@/components/shared/buttons/MainButton";
import { EmergencyDataValidation } from "@/schemas/EmergencyDataValidation";

interface EmergencyDataTabProps {
    profileData: UserProfileData | null;
    onProfileUpdate?: () => void;
}

export default function EmergencyDataTab({
    profileData,
    onProfileUpdate,
}: EmergencyDataTabProps) {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");
    const tSignUp = useTranslations("signUpPage.emergencyData");
    const tForms = useTranslations("forms");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const validationSchema = EmergencyDataValidation();

    if (!profileData) {
        return (
            <div className="">
                <p>Профіль користувача ще не заповнений.</p>
            </div>
        );
    }

    // Завжди маємо 3 контакти
    const existingContacts =
        profileData.emergencyData.emergencyContacts &&
        profileData.emergencyData.emergencyContacts.length > 0
            ? profileData.emergencyData.emergencyContacts.map((contact) => ({
                  name: contact.name || "",
                  phone: contact.phone || "",
                  relationship: contact.relationship || "",
              }))
            : [];

    // Доповнюємо до 3 контактів порожніми
    const contacts = [...existingContacts];
    while (contacts.length < 3) {
        contacts.push({ name: "", phone: "", relationship: "" });
    }

    const initialValues = {
        emergencyContacts: contacts,
        sendSMS: profileData.emergencyData.sendSMS || false,
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

            // Фільтруємо порожні контакти
            const filteredContacts = values.emergencyContacts.filter(
                (contact) =>
                    contact.name.trim() !== "" ||
                    contact.phone.trim() !== "" ||
                    contact.relationship.trim() !== ""
            );

            // Якщо всі контакти порожні, залишаємо один порожній
            const contactsToSave =
                filteredContacts.length > 0
                    ? filteredContacts
                    : [{ name: "", phone: "", relationship: "" }];

            // Оновлюємо екстрені дані
            await updateEmergencyData(user.uid, {
                emergencyContacts: contactsToSave,
                sendSMS: values.sendSMS,
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
            console.error("Помилка оновлення екстрених даних:", err);
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
            {({ isSubmitting, isValid, values }) => (
                <Form>
                    <div className="lg:px-6 lg:py-8 rounded-[16px] lg:shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1)]">
                        <SectionTitle className="mb-6 lg:mb-8 text-[24px] lg:text-[32px] xl:text-[32px]">
                            {t("emergencyData.title")}
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
                            {/* Екстрені контакти */}
                            <div className="flex flex-col">
                                <label className="mb-2 text-[12px] lg:text-[14px] font-medium leading-[120%]">
                                    {tSignUp("emergencyContact")}
                                </label>
                                <div className="flex flex-col gap-6 xl:gap-2">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <EmergencyContactField
                                            key={index}
                                            index={index}
                                            showRemove={false}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Чекбокси */}
                            <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                                <CustomizedCheckbox
                                    fieldName="sendSMS"
                                    label={tSignUp("sendMessage")}
                                />
                            </div>
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
