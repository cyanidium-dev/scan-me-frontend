import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { useTranslations } from "next-intl";
import StepsList from "./StepsList";

export default function HowItWorks() {
  const t = useTranslations("homePage.howItWorks");

  return (
    <section id="how-it-works" className="pt-12 lg:pt-30">
      <Container>
        <SectionTitle className="mb-6">
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <p className="max-w-[180px] mb-4 lg:mb-0">{t("descriptionOne")}</p>
        <StepsList />
      </Container>
    </section>
  );
}
