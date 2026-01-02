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

  if (loading) {
    return null; // або показати loader
  }

  if (user) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
