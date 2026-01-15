"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import PersonIcon from "@/components/shared/icons/PersonIcon";
import MedicalIcon from "@/components/shared/icons/MedicalIcon";
import EmergencyIcon from "@/components/shared/icons/EmergencyIcon";
import SignOutButton from "../SignOutButton";
import PhotoUploadButton from "../PhotoUploadButton";
import MainButton from "../../shared/buttons/MainButton";

type TabType = "personal" | "medical" | "emergency";

interface DashboardNavigationDesktopProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    profileData: {
        name?: string;
        surname?: string;
        photo?: string;
    } | null;
    onProfileUpdate: () => void;
}

export default function DashboardNavigationDesktop({
    activeTab,
    onTabChange,
    profileData,
    onProfileUpdate,
}: DashboardNavigationDesktopProps) {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");

    const fullName =
        profileData?.name && profileData?.surname
            ? `${profileData.name} ${profileData.surname}`
            : profileData?.name || user?.email || "";

    return (
        <aside className="hidden lg:flex flex-col w-[320px] rounded-[16px] px-6 py-8 h-fit sticky top-8 lg:shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1)]">
            {/* User Profile */}
            <div className="flex flex-col items-center mb-16">
                <div className="mb-4">
                    <PhotoUploadButton
                        currentPhoto={profileData?.photo}
                        onPhotoUpdate={onProfileUpdate}
                        size="desktop"
                        variant="dashboard"
                        userName={profileData?.name}
                        userEmail={user?.email || undefined}
                    />
                </div>
                <p className="text-[14px] leading-[120%] font-medium text-center">
                    {fullName}
                </p>
            </div>

            {/* Order Button */}
            <MainButton variant="gradient" className="w-full h-[54px] mb-3">
                {t("order")}
            </MainButton>

            {/* Tabs */}
            <nav className="flex flex-col gap-3 mb-6">
                <button
                    onClick={() => onTabChange("personal")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full border transition duration-300 ease-out ${
                        activeTab === "personal"
                            ? "border-black"
                            : "border-transparent"
                    }`}
                >
                    <PersonIcon strokeWidth={0.8} className="size-6" />
                    <span className="font-medium">
                        {t("personalData.title")}
                    </span>
                </button>
                <button
                    onClick={() => onTabChange("medical")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full border transition duration-300 ease-out ${
                        activeTab === "medical"
                            ? "border-black"
                            : "border-transparent"
                    }`}
                >
                    <MedicalIcon strokeWidth={0.7} className="size-6" />
                    <span className="font-medium">
                        {t("medicalData.title")}
                    </span>
                </button>
                <button
                    onClick={() => onTabChange("emergency")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full border transition duration-300 ease-out ${
                        activeTab === "emergency"
                            ? "border-black"
                            : "border-transparent"
                    }`}
                >
                    <EmergencyIcon strokeWidth={0.8} className="size-6" />
                    <span className="font-medium">
                        {t("emergencyData.title")}
                    </span>
                </button>
            </nav>

            {/* Sign Out Button */}
            <SignOutButton className="w-full bg-black border border-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors uppercase" />
        </aside>
    );
}
