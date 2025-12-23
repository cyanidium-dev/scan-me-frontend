import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FaqList from "./FaqList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Faq() {
  const t = useTranslations("homePage.faq");

  return (
    <section className="pt-12 lg:pt-[148px] pb-12 lg:pb-0">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
          className="absolute top-[-47px] lg:-top-19 xl:-top-8 right-0 xl:right-15 w-[171px] h-[142px] lg:w-[297px] lg:h-[234px]"
        >
          <Image
            src="/images/homePage/faq/scanme.webp"
            fill
            alt="scan me label"
            className="object-contain"
          />
        </motion.div>
        <SectionTitle className="mb-6 lg:mb-12 whitespace-pre-line">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, x: 70, delay: 0.3 })}
          className="lg:absolute lg:top-12 xl:top-25 lg:left-[440px] xl:left-[670px] max-w-[340px] lg:max-w-[300px] mb-4"
        >
          {t("description")}
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85 })}
            className="relative w-full md:w-[30%] lg:w-[36%] h-45 md:h-[402px] lg:h-[498px] rounded-[16px] overflow-hidden shrink-0"
          >
            <Image
              src="/images/homePage/faq/image.webp"
              fill
              alt="image"
              className="object-cover object-[center_32%]"
            />
          </motion.div>
          <FaqList />
        </div>
      </Container>
    </section>
  );
}
