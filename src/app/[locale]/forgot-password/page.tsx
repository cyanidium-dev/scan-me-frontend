import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import ForgotPassword from "@/components/forgotPasswordPage/ForgotPassword";
import AuthRedirect from "@/components/shared/auth/AuthRedirect";

export default function ForgotPasswordPage() {
  return (
    <AuthRedirect>
      <div className="bg-black overflow-hidden">
        <Header />
        <main className="flex-1">
          <ForgotPassword />
        </main>
        <Footer />
      </div>
    </AuthRedirect>
  );
}
