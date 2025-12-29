import Container from "@/components/shared/container/Container";
import ContactFormWithNotifications from "./ContactFormWithNotifications";
import SocialBlock from "./SocialBlock";
import ContactsBlock from "./ContactsBlock";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function ContactUs() {
  return (
    <section id="contacts" className="py-12 lg:py-30 scroll-mt-20">
      <Container className="flex flex-col lg:flex-row-reverse gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, x: 70 })}
        >
          <ContactFormWithNotifications />
        </motion.div>
        <div className="flex flex-col gap-6 h-auto w-full">
          <SocialBlock />
          <ContactsBlock />
        </div>
      </Container>
    </section>
  );
}
