import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Logo() {
  const t = useTranslations("header");

  return (
    <Link
      href="/"
      className="relative z-60 font-actay text-[24px] font-bold leading-[120%] uppercase text-transparent bg-clip-text bg-[linear-gradient(273.85deg,_#D32330_-30.34%,_#FFFFFF_43.55%)]
      xl:hover:brightness-125 focus-visible:brightness-125 transition duration-300 ease-out outline-none"
      //   onClick={() => setIsOpenBurgerMenu(false)}
    >
      {t("logo")}
    </Link>
  );
}
