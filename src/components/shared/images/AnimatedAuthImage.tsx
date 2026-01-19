import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface AnimatedAuthImageProps {
  className?: string;
  delay?: number;
}

export default function AnimatedAuthImage({
  className = "",
  delay = 0.5,
}: AnimatedAuthImageProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, opacity: 0, delay })}
      className={`hidden lg:block absolute top-[-166px] lg:right-[-300px] xl:right-[-110px] w-[1367px] h-[1117px] ${className}`}
    >
      <Image
        src="/images/signInPage/scanme.webp"
        alt="scan me"
        width={1367}
        height={1117}
        className="object-cover"
      />
    </motion.div>
  );
}


