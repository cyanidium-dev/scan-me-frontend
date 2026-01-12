"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Container from "../shared/container/Container";
import SignUpForm from "../shared/forms/SignUpForm";
import SectionTitle from "../shared/titles/SectionTitle";
import AnimatedAuthImage from "../shared/images/AnimatedAuthImage";

type SignUpStep = 0 | 1 | 2 | 3;

export default function SignUp() {
  const t = useTranslations("signInPage");
  const [currentStep, setCurrentStep] = useState<SignUpStep>(0);

  // Змінюємо фон сторінки залежно від кроку
  useEffect(() => {
    const pageElement = document.querySelector('[data-signup-page]');
    if (pageElement) {
      if (currentStep === 0) {
        pageElement.classList.remove('bg-white');
        pageElement.classList.add('bg-black');
      } else {
        pageElement.classList.remove('bg-black');
        pageElement.classList.add('bg-white');
      }
    }
  }, [currentStep]);

  // На кроці 0 показуємо звичайний layout з картинкою
  // На кроці 1+ показуємо повноекранний білий фон без картинки
  if (currentStep === 0) {
    return (
      <section className="pt-[147px] lg:pt-[205px] pb-15 lg:pb-[105px]">
        <Container className="relative lg:flex lg:gap-20 xl:gap-[150px]">
          <SignUpForm currentStep={currentStep} onStepChange={setCurrentStep} />
          <SectionTitle className="relative z-10 hidden lg:block lg:mt-[-32px] xl:mt-[-49px] text-white lg:text-[26px] xl:text-[40px]">
            {t.rich("qr", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </SectionTitle>
          <AnimatedAuthImage />
        </Container>
      </section>
    );
  }

  // На кроці 1+ - повноекранний білий фон
  return (
    <section className="min-h-screen bg-white pt-26 lg:pt-[205px] pb-15 lg:pb-[105px]">
      <Container>
        <SignUpForm currentStep={currentStep} onStepChange={setCurrentStep} />
      </Container>
    </section>
  );
}

