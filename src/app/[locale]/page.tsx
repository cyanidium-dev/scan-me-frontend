import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import Hero from "@/components/homePage/hero/Hero";
import About from "@/components/homePage/about/About";
import Mission from "@/components/homePage/mission/Mission";
import HowItWorks from "@/components/homePage/howItWorks/HowItWorks";
import WhyUs from "@/components/homePage/whyUs/WhyUs";
import Faq from "@/components/homePage/faq/Faq";
import ContactUs from "@/components/homePage/contactUs/ContactUs";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        <Hero />
        <About />
        <Mission />
        <HowItWorks />
        <WhyUs />
        <Faq />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
