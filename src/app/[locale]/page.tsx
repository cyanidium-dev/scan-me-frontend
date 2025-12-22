import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import Hero from "@/components/homePage/hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
