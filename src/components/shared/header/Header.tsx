import { useTranslations } from "next-intl";
import MainButton from "../buttons/MainButton";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import NavMenu from "../navMenu/NavMenu";
import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import BurgerMenuButton from "./BurgerMenuButton";

export default function Header() {
  const t = useTranslations("header");

  return (
    <header className="fixed z-10 top-0 left-0 w-dvw py-6 lg:py-11 bg-black rounded-b-2xl text-white">
      <Container className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center lg:gap-5 xl:gap-12.5">
          <NavMenu className="hidden lg:block" />
          <LocaleSwitcher />
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/sign-in">
              <MainButton variant="outline" className="h-11 px-6 xl:px-8">
                {t("signIn")}
              </MainButton>
            </Link>
            <Link href="/sign-up">
              <MainButton variant="white" className="h-11 px-6 xl:px-8">
                {t("signUp")}
              </MainButton>
            </Link>
          </div>
          <BurgerMenuButton />
        </div>
      </Container>
    </header>
  );
}
