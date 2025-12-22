import Container from "@/components/shared/container/Container";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Mission() {
  const t = useTranslations("homePage.mission");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInAnimation({})}
      className="py-6 lg:py-12 mt-22 lg:mt-30 bg-black rounded-[16px] text-white"
    >
      <Container className="flex flex-col lg:flex-row gap-6 lg:gap-20 xl:gap-50">
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.95, x: -30 })}
          className="lg:w-[500px] xl:w-[570px] text-[12px] lg:text-[14px] font-semibold leading-[120%] uppercase shrink-0"
        >
          {t("title")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.95, x: 30 })}
          className="flex gap-3 items-center"
        >
          <div className="w-[3px] h-[34px] bg-accent rounded-l-[2px]" />
          <p>{t("description")}</p>
        </motion.div>
      </Container>
    </motion.section>
  );
}
