import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { listVariants, listItemVariantsLeft } from "@/utils/animationVariants";
import BenefitItem from "./BenefitItem";
import Image from "next/image";

export default function BenefitsList() {
  const t = useTranslations("homePage.about");

  const benefitsList = [
    { title: t("benefits.titleOne"), value: t("benefits.valueOne") },
    { title: t("benefits.titleTwo"), value: t("benefits.valueTwo") },
    { title: t("benefits.titleThree"), value: t("benefits.valueThree") },
  ];

  return (
    <motion.ul
      key="benefits"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-6"
    >
      <motion.li
        variants={listItemVariantsLeft}
        className="relative flex flex-col justify-center items-center w-[calc(50%-6px)] lg:w-[calc(25%-18px)] p-2 lg:p-8 rounded-[16px] bg-black overflow-hidden"
      >
        <p className="relative z-60 font-actay text-[24px] font-bold leading-[120%] uppercase text-transparent bg-clip-text bg-[linear-gradient(273.85deg,#D32330_-30.34%,#FFFFFF_43.55%)]">
          {t("company")}
        </p>
        <Image
          src="/images/homePage/about/fingerprint.webp"
          alt="fingerprint"
          width={130}
          height={120}
          className="absolute top-0 left-[-46px] lg:left-0"
        />
      </motion.li>
      {benefitsList.map((benefit, idx) => (
        <BenefitItem key={idx} benefit={benefit} />
      ))}
    </motion.ul>
  );
}
