import Image from "next/image";
import * as motion from "motion/react-client";
import { listVariants, listItemVariants } from "@/utils/animationVariants";

interface WhyUsListProps {
  list: { title: string; description: string; icon: string }[];
}

export default function WhyUsList({ list }: WhyUsListProps) {
  return (
    <motion.ul
      key="benefits"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col gap-2.5 lg:gap-[15.5px]"
    >
      {list.map(({ title, description, icon }, idx) => (
        <motion.li
          variants={listItemVariants}
          key={idx}
          className="p-4 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)] rounded-[16px]"
        >
          <div className="flex gap-4 items-center mb-4.5 lg:mb-0">
            <div className="flex items-center justify-center size-12 lg:size-26 rounded-[12px] bg-accent/10 shrink-0">
              <Image
                src={icon}
                width={24}
                height={24}
                alt="icon"
                className="size-6 lg:size-16.5"
              />
            </div>
            <div>
              <h3 className="lg:mb-4 text-[18px] lg:text-[20px] font-semibold leading-[120%] uppercase">
                {title}
              </h3>
              <p className="hidden lg:block whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
          <p className="lg:hidden whitespace-pre-line">{description}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
