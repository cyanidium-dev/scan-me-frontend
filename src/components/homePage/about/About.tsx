import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import BenefitsList from "./BenefitsList";

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
          <p className="text-[12px] xl:text-[14px] font-light leading-[120%]">
            {t("descriptionOne")}
          </p>
          <p className="text-[12px] xl:text-[14px] font-light leading-[120%]">
            {t("descriptionTwo")}
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-12">
          <p className="lg:hidden">{t("descriptionOne")}</p>
          <div className="relative w-full h-[108px] lg:h-100 rounded-[16px] overflow-hidden">
            <Image
              src="/images/homePage/about/about.webp"
              alt="about image"
              fill
              className="object-cover object-[center_70%]"
            />
          </div>
          <p className="lg:hidden">{t("descriptionTwo")}</p>
        </div>
        <BenefitsList />
      </Container>
    </section>
  );
}
