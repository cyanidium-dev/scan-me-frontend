"use client";
import ShevronIcon from "@/components/shared/icons/ShevronIcon";
import { useState } from "react";
import * as motion from "motion/react-client";
import { listItemVariantsLeft } from "@/utils/animationVariants";

interface FaqItemProps {
  faqItem: {
    question: string;
    answer: string;
  };
}

export default function FaqItem({ faqItem }: FaqItemProps) {
  const [isShownMore, setIsShownMore] = useState(false);

  const toggleShowMore = () => setIsShownMore(!isShownMore);
  const { question, answer } = faqItem;

  return (
    <motion.li
      viewport={{ once: true, amount: 0.2 }}
      variants={listItemVariantsLeft}
      onClick={toggleShowMore}
      className="relative cursor-pointer bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)] rounded-[16px] xl:hover:brightness-125 focus-visible:brightness-125
      transition duration-300 ease-out"
    >
      <div
        className={`flex items-center gap-4 justify-between px-4 py-[16.5px] lg:py-[19.5px] rounded-[16px] bg-accent`}
      >
        <h3 className="text-[12px] lg:text-[14px] font-semibold leading-[120%] uppercase text-white">
          {question}
        </h3>
        <ShevronIcon
          className={`size-6 shrink-0 text-white ${
            isShownMore ? "rotate-180" : "rotate-0"
          } transition duration-300 ease-out`}
        />
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-700 will-change-transform  rounded-b-[16px] ${
          isShownMore ? "max-h-[1000px] ease-in" : "max-h-0 ease-out"
        }`}
      >
        <p className={`p-4 whitespace-pre-line`}>{answer}</p>
      </div>
    </motion.li>
  );
}
