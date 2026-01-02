import SignUpForm from "@/components/shared/auth/SignUpForm";
import Container from "@/components/shared/container/Container";

export default function SignUpPage() {
  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Реєстрація
            </h2>
          </div>
          <SignUpForm />
        </div>
      </div>
    </Container>
  );
}
