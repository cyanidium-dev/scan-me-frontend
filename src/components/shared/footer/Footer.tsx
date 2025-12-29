import { useTranslations } from "next-intl";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import SectionTitle from "../titles/SectionTitle";
import Socials from "../socials/Socials";
import NavMenu from "./NavMenu";
import FooterThumb from "./FooterThumb";
import ContactUs from "./ContactUs";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full py-12 rounded-t-[16px] bg-black overflow-hidden">
      <Container className="relative z-10">
        <div className="absolute top-[-169px] lg:top-[-115px] left-[-145px] lg:left-[-135px] -z-10">
          <Image
            src="/images/footer/fingerprint.webp"
            width={309}
            height={339}
            className="object-cover"
            alt="fingerprint"
          />
        </div>
        <div className="flex flex-col gap-12 sm:gap-6 sm:flex-row sm:justify-between">
          <div>
            <Logo />
            <h2 className="max-w-52 mt-6 mb-6 lg:mb-0 text-[14px] lg:text-[14px] xl:text-[14px] font-semibold leading-[120%] text-white uppercase">
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="text-accent">{chunks}</span>
                ),
              })}
            </h2>
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
