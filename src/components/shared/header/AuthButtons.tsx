"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/hooks/useAuth";
import MainButton from "../buttons/MainButton";
import PersonIcon from "../icons/PersonIcon";

interface AuthButtonsProps {
  setIsOpenBurgerMenu?: Dispatch<SetStateAction<boolean>>;
}

export default function AuthButtons({ setIsOpenBurgerMenu }: AuthButtonsProps) {
  const t = useTranslations("header");
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      if (setIsOpenBurgerMenu) {
        setIsOpenBurgerMenu(false);
      }
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  const handleDashboardClick = () => {
    router.push("/dashboard");
    if (setIsOpenBurgerMenu) {
      setIsOpenBurgerMenu(false);
    }
  };

  // Показуємо placeholder під час завантаження, щоб уникнути стрибка контенту
  if (loading) {
    return (
      <div className="flex items-center gap-3 min-w-[200px]">
        <div className="h-11 w-20 bg-white/10 rounded-full" />
        <div className="h-11 w-24 bg-white/10 rounded-full" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 min-w-[140px]">
        <Link
          href="/dashboard"
          onClick={
            setIsOpenBurgerMenu ? () => setIsOpenBurgerMenu(false) : undefined
          }
        >
          <MainButton
            variant="white"
            className="w-full lg:w-fit h-11 px-6 xl:px-8"
          >
            {t("dashboard")} <PersonIcon className="ml-8" />
          </MainButton>
        </Link>
        {/* <MainButton
          variant="white"
          className="w-full lg:w-fit h-11 px-6 xl:px-8"
          onClick={handleSignOut}
        >
          Вийти
        </MainButton> */}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <Link
        href="/sign-in"
        onClick={
          setIsOpenBurgerMenu ? () => setIsOpenBurgerMenu(false) : undefined
        }
      >
        <MainButton
          variant="outline"
          className="w-full lg:w-fit h-11 px-6 xl:px-8"
        >
          {t("signIn")}
        </MainButton>
      </Link>
      <Link
        href="/sign-up"
        onClick={
          setIsOpenBurgerMenu ? () => setIsOpenBurgerMenu(false) : undefined
        }
      >
        <MainButton
          variant="white"
          className="w-full lg:w-fit h-11 px-6 xl:px-8"
        >
          {t("signUp")}
        </MainButton>
      </Link>
    </div>
  );
}
