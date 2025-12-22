import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import BenefitsList from "./BenefitsList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function About() {
  const t = useTranslations("homePage.about");

  return (
    <section id="about" className="pt-12 lg:pt-30 overflow-hidden scroll-mt-20">
      <Container className="relative">
        <SectionTitle className="mb-6">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <div className="hidden lg:flex gap-8 absolute lg:top-[57px] xl:top-[85px] right-15 lg:w-[704px] xl:w-[634px] h-fit">
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
            className="text-[12px] xl:text-[14px] font-light leading-[120%]"
          >
            {t("descriptionOne")}
          </motion.p>
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
            className="text-[12px] xl:text-[14px] font-light leading-[120%]"
          >
            {t("descriptionTwo")}
          </motion.p>
        </div>
        <div className="flex flex-col gap-4 mb-12">
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
            className="lg:hidden"
          >
            {t("descriptionOne")}
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, x: 70, delay: 0.3 })}
            className="relative w-full h-[108px] lg:h-100 rounded-[16px] overflow-hidden"
          >
            <Image
              src="/images/homePage/about/about.webp"
              alt="about image"
              fill
              className="object-cover object-[center_70%]"
            />
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
            className="lg:hidden"
          >
            {t("descriptionTwo")}
          </motion.p>
        </div>
        <BenefitsList />
      </Container>
    </section>
  );
}
