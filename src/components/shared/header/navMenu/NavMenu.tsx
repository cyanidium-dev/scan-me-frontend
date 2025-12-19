import { Dispatch, SetStateAction } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface NavMenuProps {
  className?: string;
  setIsOpenBurgerMenu?: Dispatch<SetStateAction<boolean>>;
}

export default function NavMenu({
  className = "",
  setIsOpenBurgerMenu,
}: NavMenuProps) {
  const t = useTranslations("header.navMenu");

  const navMenuList = [
    { title: t("about"), slug: "/#about" },
    { title: t("howItWorks"), slug: "/#how-it-works" },
    { title: t("contacts"), slug: "/#contacts" },
  ];

  return (
    <nav className={className}>
      <ul className="flex flex-col lg:flex-row gap-12 lg:gap-5 xl:gap-12.5">
        {navMenuList.map(({ title, slug }, idx) => (
          <li
            key={idx}
            onClick={
              setIsOpenBurgerMenu ? () => setIsOpenBurgerMenu(false) : undefined
            }
          >
            <Link
              href={slug}
              className="font-actay text-[16px] font-bold leading-[120%] text-white uppercase xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-out"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
