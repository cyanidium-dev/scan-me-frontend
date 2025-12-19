"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { useLocale } from "next-intl";
import LocaleSwitcherArrowIcon from "../icons/LocaleSwitcherArrowIcons";

export default function LocaleSwitcher() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const locales = routing.locales;
  const currentLocale = useLocale();
  const pathName = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: Locale) => {
    const hash = window.location.hash;

    const newPath = `${pathName}${hash}`;

    router.replace(newPath, { locale: newLocale });

    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group cursor-pointer flex items-center gap-[9px] outline-none xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out"
      >
        <span className="text-[16px] font-bold leading-[145%] uppercase">
          {currentLocale === "uk" ? "UA" : currentLocale}
        </span>
        <LocaleSwitcherArrowIcon
          className={`size-4 ${
            isOpen ? "rotate-180" : "rotate-0"
          } xl:group-hover:text-accent group-focus-visible:text-accent transition duration-300 ease-in-out`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-[65px] xl:w-[72px] bg-white shadow-md rounded-lg z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`cursor-pointer w-full flex items-center justify-center px-4 py-2`}
              >
                <span
                  className={`uppercase xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out ${
                    currentLocale === locale
                      ? "text-accent text-[16px] font-bold leading-[120%]"
                      : "text-black text-[16px] lg:text-[14px] xl:text-[16px] font-medium leading-[120%]"
                  }`}
                >
                  {locale === "uk" ? "UA" : locale}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
