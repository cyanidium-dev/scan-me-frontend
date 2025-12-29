import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client";
import { listVariants, listItemVariants } from "@/utils/animationVariants";

export default function FoundersList() {
  const t = useTranslations("homePage.team");

  const teamList = [
    {
      name: t("personOne.name"),
      role: t("personOne.role"),
      description: t("personOne.description"),
      photo: "/images/homePage/team/andrii.webp",
    },
    {
      name: t("personTwo.name"),
      role: t("personTwo.role"),
      description: t("personTwo.description"),
      photo: "/images/homePage/team/victoria.webp",
    },
  ];
  return (
    <motion.ul
      key="benefits"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col sm:flex-row gap-6 text-white"
    >
      {teamList.map(({ name, role, description, photo }, idx) => (
        <motion.li
          variants={listItemVariants}
          key={idx}
          className="relative flex items-end sm:w-[calc(50%-12px)] px-4 py-5 rounded-[16px] h-[323px] xs:h-[403px] sm:h-[323px] lg:h-[363px] xl:h-[423px] overflow-hidden"
        >
          <Image
            src={photo}
            alt={name}
            fill
            className="-z-10 object-cover object-top"
          />
          {/* TODO update when new design is ready */}
          {/* <div className="w-[77%] p-3 bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] rounded-[8px]">
            <h3 className="mb-1 font-actay text-[18px] font-bold leading-[120%] uppercase">
              {name}
            </h3>
            <p>{role}</p>
          </div> */}
        </motion.li>
      ))}
    </motion.ul>
  );
}
