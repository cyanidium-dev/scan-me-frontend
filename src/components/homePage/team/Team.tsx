import Container from "@/components/shared/container/Container";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import FoundersList from "./FoundersList";
import Image from "next/image";

export default function Team() {
  const t = useTranslations("homePage.team");

  return (
    <section className="pt-12 lg:pt-30">
      <Container className="relative">
        <div className="hidden lg:block absolute -z-10 top-[-78px] right-[38px]">
          <Image
            src="/images/homePage/team/fingerprint.webp"
            width={703}
            height={712}
            alt="fingerprint"
          />
        </div>
        <div className="relative mb-8 xl:mb-6">
          <SectionTitle className="max-w-[360px] md:max-w-full xl:text-[70px]">
            {t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </SectionTitle>
          <DecorativeEllipsis
            variant="black"
            className="absolute right-0 top-9 md:top-1.5 lg:top-3 xl:top-7"
          />
          <p className="xl:absolute bottom-5 left-[410px] max-w-[400px] mt-6 xl:mt-0 xl:leading-[130%]">
            {t("description")}
          </p>
        </div>
        <FoundersList />
      </Container>
    </section>
  );
}
