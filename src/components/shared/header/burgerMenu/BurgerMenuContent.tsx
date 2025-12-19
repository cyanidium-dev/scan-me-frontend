"use client";

import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  burgerMenuVariants,
  burgerListVariants,
  fadeInAnimation,
} from "@/utils/animationVariants";
import NavMenu from "../navMenu/NavMenu";
import MainButton from "../../buttons/MainButton";
import Container from "../../container/Container";
import Image from "next/image";
import AuthButtons from "../AuthButtons";

interface BurgerMenuContentProps {
  isOpen: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerMenuContent({
  isOpen,
  setIsOpenBurgerMenu,
}: BurgerMenuContentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg:hidden fixed right-0 top-0 z-40 pt-[150px] w-full h-dvh max-h-dvh bg-black"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={burgerMenuVariants}
        >
          <Container
            className="flex flex-col justify-between h-full pt-9 pb-8 overflow-y-auto scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full scrollbar-thumb-beige/50 scrollbar-track-transparent"
          >
            {/* Меню */}
            <motion.div
              variants={burgerListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-10"
            >
              <NavMenu setIsOpenBurgerMenu={setIsOpenBurgerMenu} />
            </motion.div>
            <motion.div className="flex flex-col gap-3">
              <AuthButtons />
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
