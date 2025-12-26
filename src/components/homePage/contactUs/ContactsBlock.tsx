import { useTranslations } from "next-intl";
import Image from "next/image";
import { EMAIL, PHONE } from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function ContactsBlock() {
  const t = useTranslations("homePage.contactUs");

  return (
    <motion.div initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30 })} className="flex flex-col sm:flex-row gap-12 lg:gap-6 p-6 lg:p-8 rounded-[16px] border border-black/40">
      <div className="flex lg:flex-col gap-4 w-full lg:w-[calc(50%-12px)]">
        <div className="flex items-center justify-center size-10 rounded-[8px] bg-black">
          <Image
            src="/images/homePage/contactUs/envelope.svg"
            alt="envelope"
            width={24}
            height={24}
          />
        </div>
        <div>
          <h3 className="mb-4 font-actay text-[18px] lg:text-[20px] font-bold leading-[120%] uppercase">
            {t("writeUs")}
          </h3>
          <p className="mb-2.5">{t("email")}</p>
          <a
            href={`mailto:${EMAIL}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-[12px] lg:text-[14px] font-semibold leading-none xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out"
          >
            {EMAIL}
          </a>
        </div>
      </div>
      <div className="flex lg:flex-col gap-4 w-full lg:w-[calc(50%-12px)]">
        <div className="flex items-center justify-center size-10 rounded-[8px] bg-black">
          <Image
            src="/images/homePage/contactUs/phone.svg"
            alt="envelope"
            width={24}
            height={24}
          />
        </div>
        <div>
          <h3 className="mb-4 font-actay text-[18px] lg:text-[20px] font-bold leading-[120%] uppercase">
            {t("callUs")}
          </h3>
          <p className="mb-2.5">{t("schedule")}</p>
          <a
            href={`tel:${PHONE}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-[12px] lg:text-[14px] font-semibold leading-none xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out"
          >
            {PHONE.replace(contactsPhoneRegex, "+38 ($1) $2 $3 $4")}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
