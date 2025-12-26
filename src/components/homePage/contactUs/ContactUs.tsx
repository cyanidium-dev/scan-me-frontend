import Container from "@/components/shared/container/Container";
import ContactFormWithNotifications from "./ContactFormWithNotifications";
import SocialBlock from "./SocialBlock";
import ContactsBlock from "./ContactsBlock";

export default function ContactUs() {
  return (
    <section className="py-12 lg:py-30">
      <Container className="flex flex-col lg:flex-row-reverse gap-6">
        <ContactFormWithNotifications />
        <div className="flex flex-col gap-6 h-auto w-full">
          <SocialBlock />
          <ContactsBlock />
        </div>
      </Container>
    </section>
  );
}
