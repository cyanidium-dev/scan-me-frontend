import Container from "../container/Container";
import Logo from "../logo/Logo";
import NavMenu from "../navMenu/NavMenu";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  return (
    <header className="fixed z-10 top-0 left-0 w-dvw py-6 lg:py-11 bg-black rounded-b-2xl text-white">
      <Container className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-12.5">
          <NavMenu className="hidden lg:block" />
          <LocaleSwitcher />
        </div>
      </Container>
    </header>
  );
}
