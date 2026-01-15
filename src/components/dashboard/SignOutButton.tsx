"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import LogoutIcon from "@/components/shared/icons/LogoutIcon";
import { twMerge } from "tailwind-merge";
import MainButton from "../shared/buttons/MainButton";

interface SignOutButtonProps {
    className?: string;
}

export default function SignOutButton({ className }: SignOutButtonProps) {
    const { signOut } = useAuth();
    const t = useTranslations("dashboardPage");

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Помилка виходу:", error);
        }
    };

    return (
        <MainButton
            onClick={handleSignOut}
            data-sign-out-button
            variant="black"
            className="size-11 lg:w-full lg:h-[54px]"
        >
            <span className="flex items-center gap-3">
                <LogoutIcon className="text-white" />
                <span className="hidden lg:inline">{t("signOut")}</span>
            </span>
        </MainButton>
    );
}
