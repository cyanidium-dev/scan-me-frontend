"use client";

import { twMerge } from "tailwind-merge";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityDecrease: () => void;
  onQuantityIncrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onQuantityDecrease,
  onQuantityIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3 lg:gap-4 bg-white rounded-full border border-black p-2 h-[49px]">
      <button
        type="button"
        onClick={onQuantityDecrease}
        disabled={quantity <= 1}
        className={twMerge(
          "size-8 rounded-full border border-black flex items-center justify-center transition duration-300",
          quantity <= 1
            ? ""
            : "hover:bg-black/10 cursor-pointer"
        )}
      >
        <span className="text-black text-[20px] leading-none">−</span>
      </button>
      <span className="font-actay text-[14px] lg:text-[16px] font-bold min-w-[20px] text-center">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onQuantityIncrease}
        className="size-8 rounded-full bg-accent border border-accent flex items-center justify-center text-white hover:bg-accent/80 transition duration-300 cursor-pointer"
      >
        <span className="text-white text-[20px] leading-none">+</span>
      </button>
    </div>
  );
}
