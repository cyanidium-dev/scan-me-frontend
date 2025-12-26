import Container from "@/components/shared/container/Container";
import ContactFormWithNotifications from "./ContactFormWithNotifications";

export default function ContactUs() {
  return (
    <section className="py-12 lg:py-30">
      <Container>
        <ContactFormWithNotifications />
      </Container>
    </section>
  );
}
