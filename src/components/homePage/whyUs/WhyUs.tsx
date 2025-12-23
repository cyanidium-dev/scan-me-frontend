import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import WhyUsList from "./WhyUsList";

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
      <Container>
        <SectionTitle className="mb-6">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <p className="mb-4">{t("description")}</p>
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 mb-4 lg:mb-6">
          <div className="relative w-full md:w-[calc(50%-8px)] lg:w-[calc(30%-12px)] xl:w-[calc(50%-12px)] h-45 md:h-auto rounded-[16px] overflow-hidden shrink-0">
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
          </div>
          <WhyUsList list={listOne} />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
          <WhyUsList list={listTwo} />
          <div className="relative w-full md:w-[calc(50%-8px)] lg:w-[calc(30%-12px)] xl:w-[calc(50%-12px)] h-45 md:h-auto rounded-[16px] overflow-hidden shrink-0">
            <Image
              src="/images/homePage/whyUs/imageTwo.webp"
              fill
              alt="image"
              className="-z-10 object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
