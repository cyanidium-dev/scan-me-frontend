import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MainButton from "../buttons/MainButton";

export default function AuthButtons() {
  const t = useTranslations("header");

  return (
    <>
      <Link href="/sign-in">
        <MainButton
          variant="outline"
          className="w-full lg:w-fit h-11 px-6 xl:px-8"
        >
          {t("signIn")}
        </MainButton>
      </Link>
      <Link href="/sign-up">
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
