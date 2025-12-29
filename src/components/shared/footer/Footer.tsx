import { useTranslations } from "next-intl";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import SectionTitle from "../titles/SectionTitle";
import Socials from "../socials/Socials";
import NavMenu from "./NavMenu";
import FooterThumb from "./FooterThumb";
import ContactUs from "./ContactUs";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full py-12 rounded-t-[16px] bg-black">
      <Container>
        <div className="flex flex-col gap-12 sm:gap-6 sm:flex-row sm:justify-between">
          <div>
            <Logo />
            <SectionTitle className="max-w-52 mt-6 mb-6 lg:mb-0 font-montserrat text-[14px] lg:text-[14px] xl:text-[14px] font-semibold leading-[120%] text-white">
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="text-accent">{chunks}</span>
                ),
              })}
            </SectionTitle>
            <Socials className="py-3 text-white" />
          </div>
          <div className="flex flex-col sm:flex-row gap-12 md:gap-20 lg:gap-40">
            <NavMenu />
            <ContactUs />
          </div>
        </div>
        <FooterThumb />
      </Container>
    </footer>
  );
}
