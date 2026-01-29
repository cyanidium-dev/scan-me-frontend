import { useTranslations } from "next-intl";
import { EMAIL, PHONE } from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function ContactUs() {
    const t = useTranslations("footer");

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.6 })}
            className="flex flex-col gap-6 text-white"
        >
            {/* <div>
        <h3 className="mb-3 text-[12px] lg:text-[14px] font-light leading-[120%]">
          {t("callUs")}
        </h3>
        <a
          href={`tel:${PHONE}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-[12px] lg:text-[14px] font-semibold leading-none xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out"
        >
          {PHONE.replace(contactsPhoneRegex, "+38 ($1) $2 $3 $4")}
        </a>
      </div> */}
            <div>
                <h3 className="mb-3 text-[12px] lg:text-[14px] font-light leading-[120%]">
                    {t("writeUs")}
                </h3>
                <a
                    href={`mailto:${EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[12px] lg:text-[14px] font-semibold leading-none xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out"
                >
                    {EMAIL}
                </a>
            </div>
        </motion.div>
    );
}
