import { useTranslations } from "next-intl";
import BenefitItem from "./BenefitItem";
import Image from "next/image";

export default function BenefitsList() {
  const t = useTranslations("homePage.about");

  const benefitsList = [
    { title: t("benefits.titleOne"), value: t("benefits.valueOne") },
    { title: t("benefits.titleTwo"), value: t("benefits.valueTwo") },
    { title: t("benefits.titleThree"), value: t("benefits.valueThree") },
  ];

  return (
    <ul className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-6">
      <li className="relative flex flex-col justify-center items-center w-[calc(50%-6px)] lg:w-[calc(25%-18px)] p-2 lg:p-8 rounded-[16px] bg-black overflow-hidden">
        <p
          className="relative z-60 font-actay text-[24px] font-bold leading-[120%] uppercase text-transparent bg-clip-text bg-[linear-gradient(273.85deg,#D32330_-30.34%,#FFFFFF_43.55%)]
              xl:hover:brightness-125 focus-visible:brightness-125 transition duration-300 ease-out outline-none"
        >
          {t("company")}
        </p>
        <Image
          src="/images/homePage/about/fingerprint.webp"
          alt="fingerprint"
          width={130}
          height={120}
          className="absolute top-0 left-[-46px] lg:left-0"
        />
      </li>
      {benefitsList.map((benefit, idx) => (
        <BenefitItem key={idx} benefit={benefit} />
      ))}
    </ul>
  );
}
