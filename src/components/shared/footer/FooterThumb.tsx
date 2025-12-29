import { CODE_SITE_URL } from "@/constants/constants";
import TagIcon from "../icons/TagIcon";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function FooterThumb() {
  const year = new Date().getFullYear();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
      className="flex justify-between items-center mt-12 text-white"
    >
      <div>© {year} Scan Me</div>
      <div>
        <p className="text-[7px] font-normal leading-[200%] uppercase">
          Created by
        </p>
        <a
          href={CODE_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5"
        >
          <p className="text-[14px] font-medium leading-[180%] uppercase active:text-gray-300 xl:group-hover:text-gray-300 focus-visible:text-gray-300 transition duration-300 ease-in-out">
            Code-site.art
          </p>
          <TagIcon className="mb-1.5 xl:group-hover:text-gray-300 transition duration-300 ease-in-out" />
        </a>
      </div>
    </motion.div>
  );
}
