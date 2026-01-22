"use client";

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import IconButton from "../buttons/IconButton";
import CrossIcon from "../icons/CrossIcon";

interface ModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isModalShown,
  setIsModalShown,
  children,
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={twMerge(
        isModalShown
          ? " -translate-y-[calc(50dvh-50%)] opacity-100 scale-100"
          : "pointer-events-none opacity-0 scale-90",
        "fixed left-1/2 bottom-0 transform -translate-x-1/2 transition duration-[600ms] ease-out z-[100] w-[82%] max-w-[470px] lg:max-w-[561px] max-h-dvh",
        "overflow-y-auto rounded-[16px] lg:rounded-[20px] scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full",
        "scrollbar-track-rounded-full scrollbar-thumb-accent/40 scrollbar-track-transparent popup-scroll shadow-md bg-black text-white",
        className
      )}
    >
      <IconButton
        handleClick={() => setIsModalShown(false)}
        className="absolute z-10 top-4 right-4 size-6"
      >
        {<CrossIcon />}
      </IconButton>

      {children}
    </div>,
    document.body
  );
}
