import { useTranslations } from "next-intl";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";

export default function Hero() {
  const t = useTranslations("homePage.hero");

  return (
    <section className="bg-black text-white rounded-b-[16px]">
      <Container className="pt-[138px] lg:pt-[156px] pb-12 lg:pb-[228px]">
        <PageTitle>
          {t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </PageTitle>
      </Container>
    </section>
  );
}
