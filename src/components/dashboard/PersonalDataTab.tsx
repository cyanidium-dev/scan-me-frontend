"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@/hooks/useAuth";
import {
    UserProfileData,
    updateUserProfile,
    uploadUserPhoto,
} from "@/lib/firebase/userService";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import CustomizedInput from "@/components/shared/formComponents/CustomizedInput";
import PhotoUploadField from "@/components/shared/formComponents/PhotoUploadField";
import DatePickerField from "@/components/shared/formComponents/DatePickerField";
import GenderRadioGroup from "@/components/shared/formComponents/GenderRadioGroup";
import MainButton from "@/components/shared/buttons/MainButton";
import PenIcon from "@/components/shared/icons/PenIcon";
import { PersonalDataValidation } from "@/schemas/PersonalDataValidation";

interface PersonalDataTabProps {
    profileData: UserProfileData | null;
    userEmail?: string | null;
    onProfileUpdate?: () => void;
}

export default function PersonalDataTab({
    profileData,
    userEmail,
    onProfileUpdate,
}: PersonalDataTabProps) {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");
    const tSignUp = useTranslations("signUpPage.personalData");
    const tForms = useTranslations("forms");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const validationSchema = PersonalDataValidation();

    if (!profileData) {
        return (
            <div className="">
                <p>Профіль користувача ще не заповнений.</p>
            </div>
        );
    }

    const initialValues = {
        name: profileData.personalData.name || "",
        surname: profileData.personalData.surname || "",
        dateOfBirth: profileData.personalData.dateOfBirth || "",
        gender: profileData.personalData.gender || "",
        photo: null as File | null,
        country: profileData.personalData.country || "",
        city: profileData.personalData.city || "",
        address: profileData.personalData.address || "",
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

            let photoUrl = profileData.personalData.photo;

            // Завантажуємо нове фото, якщо воно було змінене
            if (values.photo instanceof File) {
                photoUrl = await uploadUserPhoto(user.uid, values.photo);
            }

            // Оновлюємо профіль
            await updateUserProfile(user.uid, {
                name: values.name,
                surname: values.surname,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender,
                photo: photoUrl || undefined,
                country: values.country,
                city: values.city,
                address: values.address,
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
            console.error("Помилка оновлення профілю:", err);
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
                    <SectionTitle className="mb-6 lg:mb-4 text-[24px] lg:text-[32px]">
                        {t("personalData.title")}
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
                        {/* Верхній блок: основні поля + фото на десктопі */}
                        <div className="lg:flex lg:flex-row lg:gap-6">
                            <div className="flex flex-col gap-6 lg:gap-8 lg:flex-1">
                                <div className="flex flex-col gap-6 lg:gap-6 lg:flex-row lg:justify-between">
                                    <div className="relative">
                                        <CustomizedInput
                                            fieldName="name"
                                            label={tSignUp("name")}
                                            placeholder={tSignUp(
                                                "namePlaceholder"
                                            )}
                                            fieldClassName="h-12 lg:h-[49px] pr-10"
                                        />
                                        <div className="absolute right-4 bottom-[14.5px] pointer-events-none">
                                            <PenIcon className="w-5 h-5 text-black/40" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <CustomizedInput
                                            fieldName="surname"
                                            label={tSignUp("surname")}
                                            placeholder={tSignUp(
                                                "surnamePlaceholder"
                                            )}
                                            fieldClassName="h-12 lg:h-[49px] pr-10"
                                        />
                                        <div className="absolute right-4 bottom-[14.5px] pointer-events-none">
                                            <PenIcon className="w-5 h-5 text-black/40" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <DatePickerField
                                        fieldName="dateOfBirth"
                                        label={tSignUp("dateOfBirth")}
                                        className="lg:w-[calc(50%-12px)]"
                                    />

                                    {/* Поле статі */}
                                    <GenderRadioGroup
                                        fieldName="gender"
                                        label={tSignUp("gender")}
                                    />
                                </div>
                            </div>

                            {/* Поле завантаження фото - десктопна версія */}
                            <PhotoUploadField
                                fieldName="photo"
                                className="hidden lg:block w-[36%]"
                            />
                        </div>

                        {/* Адреса - опціональні поля (займають всю ширину) */}
                        <div>
                            <span className="inline-block mb-2 text-[14px] font-medium leading-[120%]">
                                {tSignUp("address")}
                            </span>
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
                                <div className="relative">
                                    <CustomizedInput
                                        fieldName="country"
                                        placeholder={tSignUp(
                                            "countryPlaceholder"
                                        )}
                                        fieldClassName="h-12 lg:h-[49px] pr-10"
                                    />
                                    <div className="absolute right-4 bottom-[14.5px] pointer-events-none">
                                        <PenIcon className="w-5 h-5 text-black/40" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <CustomizedInput
                                        fieldName="city"
                                        placeholder={tSignUp("cityPlaceholder")}
                                        fieldClassName="h-12 lg:h-[49px] pr-10"
                                        isLabelHidden={true}
                                    />
                                    <div className="absolute right-4 bottom-[14.5px] pointer-events-none">
                                        <PenIcon className="w-5 h-5 text-black/40" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <CustomizedInput
                                        fieldName="address"
                                        placeholder={tSignUp(
                                            "addressPlaceholder"
                                        )}
                                        fieldClassName="h-12 lg:h-[49px] pr-10"
                                        isLabelHidden={true}
                                    />
                                    <div className="absolute right-4 bottom-[14.5px] pointer-events-none">
                                        <PenIcon className="w-5 h-5 text-black/40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Кнопка збереження */}
                    <div className="flex justify-end mt-8">
                        <MainButton
                            type="submit"
                            variant="gradient"
                            className="w-full lg:w-fit px-10 lg:px-22.5 h-[54px]"
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
