import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import CtaButton from "./CtaButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Cta() {
  const t = useTranslations("homePage.cta");

  return (
    <section className="relative text-white overflow-visible">
      <Container className="mb-5 lg:mb-18">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="relative z-20 px-6 lg:px-15 py-8 lg:py-12 rounded-[16px] bg-black overflow-hidden"
        >
          <Image
            src="/images/homePage/cta/imageMob.webp"
            alt="image"
            width={156}
            height={364}
            className="lg:hidden absolute -z-10 right-0 top-0 object-cover"
          />
          <Image
            src="/images/homePage/cta/imageDesk.webp"
            alt="image"
            width={575}
            height={374}
            className="hidden lg:block absolute -z-10 right-0 top-0 object-cover h-full w-auto"
          />
          <div
            className="absolute inset-0 rounded-[16px] pointer-events-none"
            style={{
              background:
                "linear-gradient(85.2deg, #5B5B5B -2.67%, rgba(4, 4, 4, 0) 106.5%)",
              padding: "1px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <SectionTitle className="lg:max-w-[607px] mb-10 lg:mb-6 xl:text-[50px]">
            {t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </SectionTitle>
          <p className="lg:max-w-[420px] xl:max-w-full mb-12 lg:mb-10 whitespace-pre-line">
            {t("description")}
          </p>
          <CtaButton buttonText={t("button")} />
        </motion.div>
      </Container>
      <div className="absolute top-[141px] lg:top-[187px] left-0 -z-10 w-full h-[270px] lg:h-[300px] rounded-t-[16px] bg-black" />
    </section>
  );
}
