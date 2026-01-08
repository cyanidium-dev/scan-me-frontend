import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import SignUp from "@/components/signUpPage/SignUp";

export default function SignUpPage() {
  return (
    <div className="bg-black overflow-hidden">
      <Header />
      <main className="flex-1">
        <SignUp />
      </main>
      <Footer />
    </div>
  );
}
