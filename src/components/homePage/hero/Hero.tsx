import { useTranslations } from "next-intl";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import HeroButton from "./HeroButton";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Hero() {
  const t = useTranslations("homePage.hero");

  return (
    <section className="bg-black text-white rounded-b-[16px] overflow-hidden">
      <Container className="relative pt-[138px] lg:pt-[156px] pb-12 lg:pb-[276px]">
        <PageTitle className="relative z-10 max-w-[313px] lg:max-w-[1080px] mb-4 lg:mb-9 xl:text-[68px]">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </PageTitle>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, x: 70 })}
          className="relative lg:absolute lg:top-[220px] xl:top-[252px] lg:right-15 z-10 text-[10px] lg:text-[14px] font-semibold leading-[120%] uppercase lg:text-right max-w-[132px] lg:max-w-[325px] mb-[76px] lg:mb-0"
        >
          {t("descriptionOne")}
        </motion.p>
        <DecorativeEllipsis className="relative lg:absolute lg:top-[172px] xl:top-[182px] lg:right-15 z-10 mb-[76px]" />
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, x: -70, delay: 0.4 })}
          className="relative z-10 max-w-[313px] lg:max-w-[415px] mb-4 lg:mb-16 text-[10px] lg:text-[12px] xl:text-[14px] font-light leading-[120%]"
        >
          {t("descriptionTwo")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.8 })}
          className="w-full lg:w-fit"
        >
          <HeroButton buttonText={t("button")} />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.95, delay: 0.2 })}
          className="absolute top-[77px] lg:top-[113px] left-6 sm:left-36 md:left-50 lg:left-[409px] w-[475px] h-[542px] lg:w-[885px] lg:h-[708px] overflow-hidden"
        >
          <Image
            src="/images/homePage/hero/heroMob.webp"
            alt="hero image"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1023px) 475px, 0px"
            quality={100}
            className="lg:hidden object-cover"
          />
          <Image
            src="/images/homePage/hero/heroDesk.webp"
            alt="hero image"
            fill
            priority
            fetchPriority="high"
            quality={100}
            sizes="(min-width: 1024px) 885px, 0px"
            className="hidden lg:block object-cover"
          />
          <div className="absolute bottom-0 lg:bottom-[-190px] left-[-50px] lg:left-[-297px] w-[671px] lg:w-[575px] h-[175px] lg:h-[478px] lg:-rotate-14 bg-black rounded-full supports-[backdrop-filter]:blur-[39px] lg:supports-[backdrop-filter]:blur-[109px] will-change-transform" />
        </motion.div>
      </Container>
    </section>
  );
}
