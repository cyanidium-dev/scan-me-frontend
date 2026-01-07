import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import ForgotPassword from "@/components/forgotPasswordPage/ForgotPassword";

export default function ForgotPasswordPage() {
  return    <div className="bg-black">
  <Header />
  <main className="flex-1">
    <ForgotPassword />
  </main>
  <Footer />
</div>;
}
