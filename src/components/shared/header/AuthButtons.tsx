import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MainButton from "../buttons/MainButton";

interface AuthButtonsProps {
  setIsOpenBurgerMenu?: Dispatch<SetStateAction<boolean>>;
}

export default function AuthButtons({ setIsOpenBurgerMenu }: AuthButtonsProps) {
  const t = useTranslations("header");

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
