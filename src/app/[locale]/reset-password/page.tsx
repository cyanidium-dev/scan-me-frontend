import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import ResetPassword from "@/components/resetPasswordPage/ResetPassword";
import AuthRedirect from "@/components/shared/auth/AuthRedirect";

export default function ResetPasswordPage() {
  return (
    <AuthRedirect>
      <div className="bg-black overflow-hidden">
        <Header />
        <main className="flex-1">
          <ResetPassword />
        </main>
        <Footer />
      </div>
    </AuthRedirect>
  );
}
