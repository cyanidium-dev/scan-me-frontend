import MainButton from "@/components/shared/buttons/MainButton";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Cta() {
  const t = useTranslations("homePage.howItWorks");

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      <div>
        <h3 className="mb-4 text-[18px] lg:text-[24px] font-semibold leading-[120%] uppercase">
          {t("subtitle")}
        </h3>
        <p className="lg:max-w-[361px]">{t("descriptionTwo")}</p>
      </div>
      <Link href="/signup">
        <MainButton className="w-full lg:w-[282px] h-[54px]">
          {t("button")}
        </MainButton>
      </Link>
    </div>
  );
}
