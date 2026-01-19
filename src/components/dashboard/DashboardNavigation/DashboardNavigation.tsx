"use client";

import DashboardNavigationDesktop from "./DashboardNavigationDesktop";
import DashboardNavigationMobile from "./DashboardNavigationMobile";

type TabType = "personal" | "medical" | "emergency";

interface DashboardNavigationProps {
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

export default function DashboardNavigation({
    activeTab,
    onTabChange,
    profileData,
    onProfileUpdate,
    onOrderClick,
}: DashboardNavigationProps) {
    return (
        <>
            <DashboardNavigationDesktop
                activeTab={activeTab}
                onTabChange={onTabChange}
                profileData={profileData}
                onProfileUpdate={onProfileUpdate}
                onOrderClick={onOrderClick}
            />
            <DashboardNavigationMobile
                activeTab={activeTab}
                onTabChange={onTabChange}
                profileData={profileData}
                onProfileUpdate={onProfileUpdate}
                onOrderClick={onOrderClick}
            />
        </>
    );
}
