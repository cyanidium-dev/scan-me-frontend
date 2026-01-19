import MainButton from "@/components/shared/buttons/MainButton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Cta() {
  const t = useTranslations("homePage.howItWorks");

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      <div>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, x: -30 })}
          className="mb-4 text-[18px] lg:text-[24px] font-semibold leading-[120%] uppercase"
        >
          {t("subtitle")}
        </motion.h3>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, x: 30, delay: 0.3 })}
          className="lg:max-w-[361px]"
        >
          {t("descriptionTwo")}
        </motion.p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
        className="w-full lg:w-fit"
      >
        <Link href="/sign-up">
          <MainButton className="w-full lg:w-[282px] h-[54px]">
            {t("button")}
          </MainButton>
        </Link>
      </motion.div>
    </div>
  );
}
