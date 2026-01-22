"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  transparent?: boolean;
}

export default function Backdrop({
  isVisible = false,
  onClick,
  className = "",
  transparent = false,
}: BackdropProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mounted, isVisible, onClick]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed z-[90] inset-0 w-dvw h-dvh transition duration-[1000ms] ease-in-out ${
        isVisible
          ? "opacity-100 no-doc-scroll"
          : "opacity-0 pointer-events-none"
      } ${transparent ? "bg-transparent" : "bg-black/40"} ${className}`}
      onClick={onClick}
    />,
    document.body
  );
}
