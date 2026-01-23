"use client";
import { useState } from "react";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import NavMenu from "./navMenu/NavMenu";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";
import BurgerMenu from "./burgerMenu/BurgerMenu";
import AuthButtons from "./AuthButtons";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Header() {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInAnimation({})}
      className="fixed z-30 top-0 left-0 w-full py-6 lg:py-11 bg-black rounded-b-2xl text-white"
    >
      <div className="absolute z-50 top-0 left-0 h-full w-full overflow-hidden rounded-b-2xl">
        <div
          className="absolute top-[-115px] lg:top-[-104px] left-[-95px] sm:left-[calc(50%-320px-95px)] md:left-[calc(50%-384px-95px)] 
        lg:left-[calc(50%-512px-57px)] xl:left-[calc(50%-640px-57px)] w-[262px] h-[258px]"
        >
          <Image
            src="/images/decorations/fingerprint.webp"
            fill
            priority
            alt="fingerprint"
            className="object-cover"
          />
        </div>
      </div>
      <Container className="relative flex items-center justify-between">
        <Logo setIsOpenBurgerMenu={setIsOpenBurgerMenu} />
        <div className="flex items-center lg:gap-5 xl:gap-12.5">
          <NavMenu className="hidden lg:block relative z-60" />
          <LocaleSwitcher />
          <div className="relative z-60 hidden lg:flex items-center gap-3 min-w-[200px] justify-end">
            <AuthButtons />
          </div>
          <BurgerMenu
            isOpenBurgerMenu={isOpenBurgerMenu}
            setIsOpenBurgerMenu={setIsOpenBurgerMenu}
          />
        </div>
      </Container>
    </motion.header>
  );
}
