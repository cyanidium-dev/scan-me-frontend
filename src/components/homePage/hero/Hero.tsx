import { useTranslations } from "next-intl";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import MainButton from "@/components/shared/buttons/MainButton";

export default function Hero() {
  const t = useTranslations("homePage.hero");

  return (
    <section className="bg-black text-white rounded-b-[16px]">
      <Container className="pt-[138px] lg:pt-[156px] pb-12 lg:pb-[228px]">
        <PageTitle className="mb-4">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </PageTitle>
        <p className="text-[10px] lg:text-[14px] font-semibold leading-[120%] uppercase lg:text-right max-w-[132px] mb-[76px]">
          {t("descriptionOne")}
        </p>
        <DecorativeEllipsis className="mb-[76px]" />
        <p className="mb-4 text-[10px] lg:text-[14px] font-light leading-[120%]">
          {t("descriptionTwo")}
        </p>
        <MainButton variant="gradient" className="w-full h-[54px]">
          {t("button")}
        </MainButton>
      </Container>
    </section>
  );
}
