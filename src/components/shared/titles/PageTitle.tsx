import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export default function PageTitle({
  children,
  className = "",
}: PageTitleProps) {
  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, y: 30, x: -70 })}
      className={twMerge(
        "font-actay text-[26px] lg:text-[70px] font-bold leading-[120%] uppercase text-white",
        className
      )}
    >
      {children}
    </motion.h1>
  );
}
