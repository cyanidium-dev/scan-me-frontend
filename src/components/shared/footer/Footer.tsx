import { useTranslations } from "next-intl";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import Socials from "../socials/Socials";
import NavMenu from "./NavMenu";
import FooterThumb from "./FooterThumb";
import ContactUs from "./ContactUs";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full py-12 rounded-t-[16px] bg-black overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
          className="absolute top-[-169px] lg:top-[-115px] left-[-145px] lg:left-[-135px] -z-10"
        >
          <Image
            src="/images/footer/fingerprint.webp"
            width={309}
            height={339}
            className="object-cover"
            alt="fingerprint"
          />
        </motion.div>
        <div className="flex flex-col gap-12 sm:gap-6 sm:flex-row sm:justify-between">
          <motion.div  initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInAnimation({ scale: 0.85, y: 30 })}>
            <Logo />
            <h2 className="max-w-52 mt-6 mb-6 lg:mb-0 text-[14px] lg:text-[14px] xl:text-[14px] font-semibold leading-[120%] text-white uppercase">
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="text-accent">{chunks}</span>
                ),
              })}
            </h2>
            <Socials className="py-3 text-white" />
          </motion.div>
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
