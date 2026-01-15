"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { getUserProfile, UserProfileData } from "@/lib/firebase/userService";
import DashboardNavigation from "./DashboardNavigation";
import PersonalDataTab from "./PersonalDataTab";
import MedicalDataTab from "./MedicalDataTab";
import EmergencyDataTab from "./EmergencyDataTab";
import Container from "../shared/container/Container";

type TabType = "personal" | "medical" | "emergency";

export default function DashboardContent() {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");
    const [profileData, setProfileData] = useState<UserProfileData | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>("personal");

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await getUserProfile(user.uid);
                setProfileData(data);
            } catch (err) {
                console.error("Помилка завантаження профілю:", err);
                setError("Не вдалося завантажити дані профілю");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user?.uid]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-lg text-gray-400">Завантаження...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
            </div>
        );
    }

    return (
        <Container className="flex flex-col lg:flex-row gap-6">
            <DashboardNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                profileData={
                    profileData
                        ? {
                              name: profileData.personalData.name,
                              surname: profileData.personalData.surname,
                              photo: profileData.personalData.photo,
                          }
                        : null
                }
            />

            <div className="flex-1 rounded-2xl p-6 lg:p-8 min-h-[600px]">
                {activeTab === "personal" && (
                    <PersonalDataTab
                        profileData={profileData}
                        userEmail={user?.email || null}
                    />
                )}
                {activeTab === "medical" && (
                    <MedicalDataTab profileData={profileData} />
                )}
                {activeTab === "emergency" && (
                    <EmergencyDataTab profileData={profileData} />
                )}
            </div>

            {/* Mobile Order Button (Fixed at bottom) */}
            <button className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-4 px-4 rounded-t-2xl hover:from-red-600 hover:to-red-800 transition-all uppercase z-50">
                {t("order")}
            </button>
        </Container>
    );
}
