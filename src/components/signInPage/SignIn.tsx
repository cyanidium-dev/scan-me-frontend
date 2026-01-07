import { useTranslations } from "next-intl";
import Container from "../shared/container/Container";
import SignInForm from "../shared/forms/SignInForm";
import SectionTitle from "../shared/titles/SectionTitle";
import AnimatedAuthImage from "../shared/images/AnimatedAuthImage";

export default function SignIn() {
  const t = useTranslations("signInPage");

  return (
    <section className="pt-[147px] lg:pt-[205px] pb-15 lg:pb-[105px]">
      <Container className="relative lg:flex lg:gap-20 xl:gap-[150px]">
        <SignInForm />
        <SectionTitle className="relative z-10 hidden lg:block lg:mt-[-32px] xl:mt-[-49px] text-white lg:text-[26px] xl:text-[40px]">
          {t.rich("qr", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </SectionTitle>
        <AnimatedAuthImage />
      </Container>
    </section>
  );
}
