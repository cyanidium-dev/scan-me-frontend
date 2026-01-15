"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { getUserProfile, UserProfileData } from "@/lib/firebase/userService";
import DashboardNavigation from "./DashboardNavigation/DashboardNavigation";
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
                onProfileUpdate={async () => {
                    if (user?.uid) {
                        const data = await getUserProfile(user.uid);
                        setProfileData(data);
                    }
                }}
            />

            <div className="flex-1">
                {activeTab === "personal" && (
                    <PersonalDataTab
                        profileData={profileData}
                        userEmail={user?.email || null}
                        onProfileUpdate={async () => {
                            if (user?.uid) {
                                const data = await getUserProfile(user.uid);
                                setProfileData(data);
                            }
                        }}
                    />
                )}
                {activeTab === "medical" && (
                    <MedicalDataTab
                        profileData={profileData}
                        onProfileUpdate={async () => {
                            if (user?.uid) {
                                const data = await getUserProfile(user.uid);
                                setProfileData(data);
                            }
                        }}
                    />
                )}
                {activeTab === "emergency" && (
                    <EmergencyDataTab profileData={profileData} />
                )}
            </div>
        </Container>
    );
}
