import Container from "../container/Container";
import Logo from "../logo/Logo";

export default function Header() {
  return (
    <header className="fixed z-10 top-0 left-0 w-dvw py-6 lg:py-11 bg-black rounded-b-2xl text-white">
      <Container>
        <Logo />
      </Container>
    </header>
  );
}
