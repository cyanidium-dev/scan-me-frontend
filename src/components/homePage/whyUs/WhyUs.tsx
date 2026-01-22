import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import WhyUsList from "./WhyUsList";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function WhyUs() {
  const t = useTranslations("homePage.whyUs");

  const listOne = [
    {
      title: t("advantages.titleOne"),
      description: t("advantages.descriptionOne"),
      icon: "/images/homePage/whyUs/icons/clock.svg",
    },
    {
      title: t("advantages.titleTwo"),
      description: t("advantages.descriptionTwo"),
      icon: "/images/homePage/whyUs/icons/phone.svg",
    },
    {
      title: t("advantages.titleThree"),
      description: t("advantages.descriptionThree"),
      icon: "/images/homePage/whyUs/icons/lock.svg",
    },
  ];

  const listTwo = [
    {
      title: t("advantages.titleFour"),
      description: t("advantages.descriptionFour"),
      icon: "/images/homePage/whyUs/icons/qr.svg",
    },
    {
      title: t("advantages.titleFive"),
      description: t("advantages.descriptionFive"),
      icon: "/images/homePage/whyUs/icons/star.svg",
    },
    {
      title: t("advantages.titleSix"),
      description: t("advantages.descriptionSix"),
      icon: "/images/homePage/whyUs/icons/people.svg",
    },
  ];

  return (
    <section className="pt-12 lg:pt-30 pb-12 lg:pb-0">
      <Container className="relative">
        <SectionTitle className="mb-6 xl:max-w-[904px]">
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
          className="xl:absolute top-[90px] left-[536px] mb-4 lg:mb-6 xl:mb-0 lg:max-w-[390px] xl:max-w-[346px]"
        >
          {t("description")}
        </motion.p>
        <DecorativeEllipsis
          variant="black"
          className="hidden xl:flex absolute top-7 right-15"
        />
        <div className="relative flex flex-col md:flex-row gap-4 lg:gap-6 mb-4 lg:mb-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
            className="hidden lg:block absolute -z-10 top-[-142px] right-[-62px] w-[583px] h-[732px]"
          >
            <Image
              src="/images/homePage/whyUs/fingerprintRight.webp"
              fill
              alt="image"
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, x: -50 })}
            className="relative w-full md:w-[calc(50%-8px)] lg:w-[calc(30%-12px)] xl:w-[calc(50%-12px)] h-45 md:h-auto rounded-[16px] overflow-hidden shrink-0"
          >
            <Image
              src="/images/homePage/whyUs/imageOne.webp"
              fill
              alt="image"
              className="-z-10 object-cover"
            />
            <Image
              src="/images/homePage/whyUs/sticker.webp"
              width={145}
              height={67}
              alt="sticker"
              className="absolute top-[calc(50%-30px)] left-[calc(50%-72px)]"
            />
          </motion.div>
          <WhyUsList list={listOne} />
        </div>

        <div className="relative flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
            className="hidden lg:block absolute -z-10 top-[-98px] left-[-12px] w-[640px] h-[701px]"
          >
            <Image
              src="/images/homePage/whyUs/fingerPrintLeft.webp"
              fill
              alt="image"
              className="object-contain"
            />
          </motion.div>
          <WhyUsList list={listTwo} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, x: 50 })}
            className="relative w-full md:w-[calc(50%-8px)] lg:w-[calc(30%-12px)] xl:w-[calc(50%-12px)] h-45 md:h-auto rounded-[16px] overflow-hidden shrink-0"
          >
            <Image
              src="/images/homePage/whyUs/imageTwo.webp"
              fill
              alt="image"
              className="-z-10 object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
