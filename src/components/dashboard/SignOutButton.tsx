"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import LogoutIcon from "@/components/shared/icons/LogoutIcon";
import { twMerge } from "tailwind-merge";

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
    <button
      onClick={handleSignOut}
      data-sign-out-button
      className={twMerge(
        "bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors",
        className
      )}
    >
      <span className="hidden lg:flex items-center gap-2">
        <LogoutIcon className="text-white" />
        {t("signOut")}
      </span>
      <span className="lg:hidden">{t("signOut")}</span>
    </button>
  );
}

