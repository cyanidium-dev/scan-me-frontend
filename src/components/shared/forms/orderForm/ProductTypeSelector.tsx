"use client";

import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

interface ProductTypeSelectorProps {
  productType: "sticker" | "bracelet";
  onProductTypeChange: (type: "sticker" | "bracelet") => void;
}

export default function ProductTypeSelector({
  productType,
  onProductTypeChange,
}: ProductTypeSelectorProps) {
  const t = useTranslations("orderForm");

  return (
    <div className="relative flex flex-1 h-[49px] border border-black rounded-full p-0.5">
      {/* Червоний слайдер */}
      <div
        className={twMerge(
          "absolute top-0.5 left-0.5 w-[calc(50%-2px)] h-[calc(100%-4px)] bg-accent rounded-full transition duration-300 ease-out",
          productType === "bracelet" && "translate-x-full"
        )}
      />
      {/* Кнопки */}
      <button
        type="button"
        onClick={() => onProductTypeChange("sticker")}
        className={twMerge(
          "cursor-pointer relative z-10 flex-1 h-full rounded-full font-actay text-[12px] lg:text-[16px] font-bold leading-none uppercase transition duration-300 ease-out",
          productType === "sticker" ? "text-white" : "text-black"
        )}
      >
        {t("sticker")}
      </button>
      <button
        type="button"
        onClick={() => onProductTypeChange("bracelet")}
        className={twMerge(
          "cursor-pointer relative z-10 flex-1 h-full rounded-full font-actay text-[12px] lg:text-[16px] font-bold leading-none uppercase transition-colors duration-300",
          productType === "bracelet" ? "text-white" : "text-black"
        )}
      >
        {t("bracelet")}
      </button>
    </div>
  );
}
