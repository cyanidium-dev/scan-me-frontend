import { useTranslations } from "next-intl";
import FaqItem from "./FaqItem";

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
    <ul className="flex flex-col gap-3 lg:gap-6">
      {faqList.map((faqItem, idx) => (
        <FaqItem key={idx} faqItem={faqItem} />
      ))}
    </ul>
  );
}
