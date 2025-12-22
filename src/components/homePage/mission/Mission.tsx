import Container from "@/components/shared/container/Container";
import { useTranslations } from "next-intl";

export default function Mission() {
  const t = useTranslations("homePage.mission");

  return (
    <section className="py-6 lg:py-12 mt-22 lg:mt-30 bg-black rounded-[16px] text-white">
      <Container className="flex flex-col lg:flex-row gap-6 lg:gap-20 xl:gap-50">
        <p className="lg:w-[500px] xl:w-[570px] text-[12px] lg:text-[14px] font-semibold leading-[120%] uppercase shrink-0">
          {t("title")}
        </p>
        <div className="flex gap-3 items-center">
          <div className="w-[3px] h-[34px] bg-accent rounded-l-[2px]" />
          <p>{t("description")}</p>
        </div>
      </Container>
    </section>
  );
}
