import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FaqList from "./FaqList";

export default function Faq() {
  const t = useTranslations("homePage.faq");

  return (
    <section className="pt-12 lg:pt-[148px] pb-12 lg:pb-0">
      <Container className="relative">
        <div className="absolute top-[-47px] lg:-top-19 xl:-top-8 right-0 xl:right-15 w-[171px] h-[142px] lg:w-[297px] lg:h-[234px]">
          <Image
            src="/images/homePage/faq/scanme.webp"
            fill
            alt="scan me label"
            className="object-contain"
          />
        </div>
        <SectionTitle className="mb-6 lg:mb-12 whitespace-pre-line">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <p className="lg:absolute lg:top-12 xl:top-25 lg:left-[440px] xl:left-[670px] max-w-[340px] lg:max-w-[300px] mb-4">
          {t("description")}
        </p>
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <div className="relative w-full md:w-[30%] lg:w-[36%] h-45 md:h-[402px] lg:h-[498px] rounded-[16px] overflow-hidden shrink-0">
            <Image
              src="/images/homePage/faq/image.webp"
              fill
              alt="image"
              className="object-cover object-[center_32%]"
            />
          </div>
          <FaqList />
        </div>
      </Container>
    </section>
  );
}
