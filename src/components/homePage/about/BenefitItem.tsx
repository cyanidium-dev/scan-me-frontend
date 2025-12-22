import * as motion from "motion/react-client";
import { listItemVariants } from "@/utils/animationVariants";

interface BenefitItemProps {
  benefit: { title: string; value: string };
}

export default function BenefitItem({ benefit }: BenefitItemProps) {
  const { title, value } = benefit;

  return (
    <motion.li
      variants={listItemVariants}
      className="flex flex-col justify-center items-center w-[calc(50%-6px)] lg:w-[calc(25%-18px)] min-h-[116px] p-2 lg:p-8 rounded-[16px] bg-accent last:bg-black lg:even:bg-accent lg:odd:bg-black text-white"
    >
      <h3 className="mb-2 font-actay text-[18px] lg:text-[24px] font-bold leading-[120%] uppercase text-center">
        {title}
      </h3>
      <p className="text-center">{value}</p>
    </motion.li>
  );
}
