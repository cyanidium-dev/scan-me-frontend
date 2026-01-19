import SignIn from "@/components/signInPage/SignIn";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import AuthRedirect from "@/components/shared/auth/AuthRedirect";

export default function SignInPage() {
  return (
    <AuthRedirect>
      <div className="bg-black overflow-hidden">
        <Header />
        <main className="flex-1">
          <SignIn />
        </main>
        <Footer />
      </div>
    </AuthRedirect>
  );
}
