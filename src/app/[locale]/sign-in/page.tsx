import SignIn from "@/components/signInPage/SignIn";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

export default function SignInPage() {
  return (
    <div className="bg-black">
      <Header />
      <main className="flex-1">
        <SignIn />
      </main>
      <Footer />
    </div>
  );
}
