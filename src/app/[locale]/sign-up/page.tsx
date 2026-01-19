import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import SignUp from "@/components/signUpPage/SignUp";
import AuthRedirect from "@/components/shared/auth/AuthRedirect";

export default function SignUpPage() {
  return (
    <AuthRedirect>
      <div className="bg-black overflow-hidden" data-signup-page>
        <Header />
        <main className="flex-1">
          <SignUp />
        </main>
        <Footer className="overflow-hidden"/>
      </div>
    </AuthRedirect>
  );
}
