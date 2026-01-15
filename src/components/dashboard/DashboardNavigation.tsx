"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PersonIcon from "@/components/shared/icons/PersonIcon";
import MedicalIcon from "@/components/shared/icons/MedicalIcon";
import EmergencyIcon from "@/components/shared/icons/EmergencyIcon";
import LogoutIcon from "@/components/shared/icons/LogoutIcon";
import SignOutButton from "./SignOutButton";
import CameraIcon from "../shared/icons/CameraIcon";
import MainButton from "../shared/buttons/MainButton";

type TabType = "personal" | "medical" | "emergency";

interface DashboardNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    profileData: {
        name?: string;
        surname?: string;
        photo?: string;
    } | null;
}

export default function DashboardNavigation({
    activeTab,
    onTabChange,
    profileData,
}: DashboardNavigationProps) {
    const { user } = useAuth();
    const t = useTranslations("dashboardPage");

    const fullName =
        profileData?.name && profileData?.surname
            ? `${profileData.name} ${profileData.surname}`
            : profileData?.name || user?.email || "";

    return (
        <>
            {/* Desktop Navigation */}
            <aside className="hidden lg:flex flex-col w-[320px] bg-black rounded-2xl p-6 h-fit sticky top-8">
                {/* User Profile */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-black/20 overflow-hidden relative">
                            {profileData?.photo ? (
                                <Image
                                    src={profileData.photo}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                                    {profileData?.name?.[0] ||
                                        user?.email?.[0]?.toUpperCase() ||
                                        "U"}
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                            <CameraIcon className="text-white w-4 h-4" />
                        </button>
                    </div>
                    <h2 className="text-white text-lg font-medium text-center">
                        {fullName}
                    </h2>
                </div>

                {/* Order Button */}
                <button className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-4 rounded-lg mb-6 hover:from-red-600 hover:to-red-800 transition-all uppercase">
                    {t("order")}
                </button>

                {/* Tabs */}
                <nav className="flex flex-col gap-2 mb-6">
                    <button
                        onClick={() => onTabChange("personal")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === "personal"
                                ? "bg-white text-black"
                                : "text-white hover:bg-gray-800"
                        }`}
                    >
                        <PersonIcon
                            className={
                                activeTab === "personal"
                                    ? "text-black"
                                    : "text-white"
                            }
                        />
                        <span className="font-medium">
                            {t("personalData.title")}
                        </span>
                    </button>
                    <button
                        onClick={() => onTabChange("medical")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === "medical"
                                ? "bg-white text-black"
                                : "text-white hover:bg-gray-800"
                        }`}
                    >
                        <MedicalIcon
                            className={
                                activeTab === "medical"
                                    ? "text-black"
                                    : "text-white"
                            }
                        />
                        <span className="font-medium">
                            {t("medicalData.title")}
                        </span>
                    </button>
                    <button
                        onClick={() => onTabChange("emergency")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === "emergency"
                                ? "bg-white text-black"
                                : "text-white hover:bg-gray-800"
                        }`}
                    >
                        <EmergencyIcon
                            className={
                                activeTab === "emergency"
                                    ? "text-black"
                                    : "text-white"
                            }
                        />
                        <span className="font-medium">
                            {t("emergencyData.title")}
                        </span>
                    </button>
                </nav>

                {/* Sign Out Button */}
                <SignOutButton className="w-full bg-black border border-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors uppercase" />
            </aside>

            {/* Mobile Navigation */}
            <div className="lg:hidden mb-6">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-black/20 overflow-hidden relative">
                                {profileData?.photo ? (
                                    <Image
                                        src={profileData.photo}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        {profileData?.name?.[0] ||
                                            user?.email?.[0]?.toUpperCase() ||
                                            "U"}
                                    </div>
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                <CameraIcon className="text-white w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <p className="text-black text-[12px] font-medium leading-[120%]">
                                {profileData?.name || ""}
                            </p>
                            <p className="text-black text-[12px] font-medium leading-[120%]">
                                {profileData?.surname || ""}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                const button = document.querySelector(
                                    "[data-sign-out-button]"
                                ) as HTMLButtonElement;
                                button?.click();
                            }}
                            className="size-11 rounded-full bg-black flex items-center justify-center"
                        >
                            <LogoutIcon className="text-white" />
                        </button>
                        <SignOutButton
                            className="hidden"
                            data-sign-out-button
                        />
                    </div>
                    <MainButton variant="gradient" className="h-11 w-full">
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
                        <span
                            className={`text-[10px] font-medium leading-[120%]`}
                        >
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
        </>
    );
}
