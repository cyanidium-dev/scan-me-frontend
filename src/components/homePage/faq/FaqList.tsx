import { useTranslations } from "next-intl";
import FaqItem from "./FaqItem";
import * as motion from "motion/react-client";
import { listVariants } from "@/utils/animationVariants";

export default function FaqList() {
  const t = useTranslations("homePage.faq.list");

  const faqList = [
    { question: t("questionOne"), answer: t("answerOne") },
    { question: t("questionTwo"), answer: t("answerTwo") },
    { question: t("questionThree"), answer: t("answerThree") },
    { question: t("questionFour"), answer: t("answerFour") },
    { question: t("questionFive"), answer: t("answerFive") },
    { question: t("questionSix"), answer: t("answerSix") },
  ];

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col gap-3 lg:gap-6"
    >
      {faqList.map((faqItem, idx) => (
        <FaqItem key={idx} faqItem={faqItem} />
      ))}
    </motion.ul>
  );
}
