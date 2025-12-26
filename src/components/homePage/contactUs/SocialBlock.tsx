import Socials from "@/components/shared/socials/Socials";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function SocialBlock() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, x: -70 })}
      className="relative flex items-end justify-end w-full h-45 p-2 lg:p-4 lg:flex-1 rounded-[16px] overflow-hidden"
    >
      <Image
        src="/images/homePage/contactUs/image.webp"
        fill
        alt="image"
        className="object-cover -z-10"
      />
      <div className="px-4 py-3 bg-white rounded-[16px] shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
        <Socials />
      </div>
    </motion.div>
  );
}
