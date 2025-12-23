import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import StepsList from "./StepsList";
import Cta from "./Cta";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function HowItWorks() {
  const t = useTranslations("homePage.howItWorks");

  return (
    <section id="how-it-works" className="pt-12 lg:pt-30">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
          className="absolute z-10 top-12 lg:top-8 xl:top-2 xl:left-auto xl:right-12 left-[206px] lg:left-[730px]"
        >
          <Image
            src="/images/homePage/steps/qrDesk.webp"
            alt="qr"
            width={154}
            height={129}
            className="rotate-58 lg:rotate-0 lg:w-[225px] h-auto"
          />
        </motion.div>
        <SectionTitle className="max-w-[320px] lg:max-w-full mb-6">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, x: 30, delay: 0.3 })}
          className="xl:absolute top-27 left-140 max-w-[180px] mb-4 xl:mb-0"
        >
          {t("descriptionOne")}
        </motion.p>
        <StepsList />
        <Cta />
      </Container>
    </section>
  );
}
