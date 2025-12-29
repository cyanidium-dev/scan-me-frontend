import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface NavMenuProps {
  className?: string;
}

export default function NavMenu({ className = "" }: NavMenuProps) {
  const t = useTranslations("header.navMenu");

  const navMenuList = [
    { title: t("about"), slug: "/#about" },
    { title: t("howItWorks"), slug: "/#how-it-works" },
    { title: t("contacts"), slug: "/#contacts" },
  ];

  return (
    <motion.nav
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
      className={className}
    >
      <ul className="flex flex-col gap-6">
        {navMenuList.map(({ title, slug }, idx) => (
          <li key={idx}>
            <Link
              href={slug}
              className="font-actay text-[14px] lg:text-[16px] font-bold leading-[120%] text-white uppercase xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-out"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
