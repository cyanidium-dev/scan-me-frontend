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

interface DashboardNavigationMobileProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    profileData: {
        name?: string;
        surname?: string;
        photo?: string;
    } | null;
    onProfileUpdate: () => void;
    onOrderClick: () => void;
}

export default function DashboardNavigationMobile({
    activeTab,
    onTabChange,
    profileData,
    onProfileUpdate,
    onOrderClick,
}: DashboardNavigationMobileProps) {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");

    return (
        <div className="lg:hidden mb-6">
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                    <PhotoUploadButton
                        currentPhoto={profileData?.photo}
                        onPhotoUpdate={onProfileUpdate}
                        size="mobile"
                        userName={profileData?.name}
                        userEmail={user?.email || undefined}
                    />
                    <div className="flex-1">
                        <p className="text-black text-[12px] font-medium leading-[120%]">
                            {profileData?.name || ""}
                        </p>
                        <p className="text-black text-[12px] font-medium leading-[120%]">
                            {profileData?.surname || ""}
                        </p>
                    </div>

                    <SignOutButton data-sign-out-button />
                </div>
                <MainButton 
                    variant="gradient" 
                    className="h-11 w-full"
                    onClick={onOrderClick}
                >
                    {t("order")}
                </MainButton>
            </div>
            {/* Mobile Tabs */}
            <nav className="flex gap-2">
                <button
                    onClick={() => onTabChange("personal")}
                    className={`cursor-pointer flex-1 flex flex-col items-center justify-center gap-1 px-3 py-2 border rounded-[16px] transition duration-300 ease-out ${
                        activeTab === "personal"
                            ? "border-black"
                            : "border-transparent"
                    }`}
                >
                    <PersonIcon />
                    <span className={`text-[10px] font-medium leading-[120%]`}>
                        {t("personalData.title")}
                    </span>
                </button>
                <button
                    onClick={() => onTabChange("medical")}
                    className={`cursor-pointer flex-1 flex flex-col items-center justify-center gap-1 px-3 py-2 border rounded-[16px] transition duration-300 ease-out ${
                        activeTab === "medical"
                            ? "border-black"
                            : "border-transparent"
                    }`}
                >
                    <MedicalIcon />
                    <span className="text-[10px] font-medium leading-[120%]">
                        {t("medicalData.title")}
                    </span>
                </button>
                <button
                    onClick={() => onTabChange("emergency")}
                    className={`cursor-pointer flex-1 flex flex-col items-center justify-center gap-1 px-3 py-2 border rounded-[16px] transition duration-300 ease-out ${
                        activeTab === "emergency"
                            ? "border-black"
                            : "border-transparent"
                    }`}
                >
                    <EmergencyIcon />
                    <span className="text-[10px] font-medium leading-[120%]">
                        {t("emergencyData.title")}
                    </span>
                </button>
            </nav>
        </div>
    );
}
