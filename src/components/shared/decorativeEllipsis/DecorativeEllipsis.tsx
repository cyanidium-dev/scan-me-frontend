import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { twMerge } from "tailwind-merge";

interface DecorativeEllipsisProps {
  uniqueKey?: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function DecorativeEllipsis({
  uniqueKey,
  className = "",
  delay = 0.4,
  staggerDelay = 0.2,
}: DecorativeEllipsisProps) {
  return (
    <div className={twMerge("flex gap-2", className)}>
      <motion.span
        key={`${uniqueKey}-1`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: delay })}
        className="size-3 lg:size-4.5 rounded-full bg-white"
      />
      <motion.span
        key={`${uniqueKey}-2`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({
          scale: 0.85,
          delay: delay + staggerDelay,
        })}
        className="size-3 lg:size-4.5 rounded-full bg-[linear-gradient(151.63deg,_#FFFFFF_17.53%,_#D32330_116.75%)]"
      />
      <motion.span
        key={`${uniqueKey}-3`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({
          scale: 0.85,
          delay: delay + staggerDelay * 2,
        })}
        className="size-3 lg:size-4.5 rounded-full bg-white"
      />
    </div>
  );
}
