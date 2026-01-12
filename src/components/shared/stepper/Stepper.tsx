"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

interface StepperProps {
  currentStep: number;
  totalSteps?: number;
}

export default function Stepper({
  currentStep,
  totalSteps = 3,
}: StepperProps) {
  const t = useTranslations("signUpPage");

  const steps = [
    { number: 1, label: t("personalData.title") },
    { number: 2, label: t("medicalData.title") },
    { number: 3, label: t("emergencyData.title") },
  ];

  return (
    <div className="flex items-center justify-center mb-19 lg:mb-17 relative">
      {steps.map((step, index) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} className="flex items-center">
            {/* Кружечок кроку з підписом */}
            <div className="relative flex items-center justify-center">
              <div
                className={clsx(
                  "size-[49px] lg:size-[59px] rounded-full flex items-center justify-center text-[24px] lg:text-[32px] font-semibold leading-[120%] transition-all duration-300",
                  isActive || isCompleted
                    ? "bg-accent text-white"
                    : "bg-black/10 text-black/40"
                )}
              >
                {step.number}
              </div>
              {/* Підпис під кроком - абсолютний */}
              <span
                className={clsx(
                  "absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] lg:text-[12px] font-medium leading-[120%] text-center lg:whitespace-nowrap",
                  isActive || isCompleted
                    ? "text-black"
                    : "text-black/40"
                )}
              >
                {step.label}
              </span>
            </div>
            {/* Лінія між кроками */}
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  "w-9 lg:w-[131px] h-[1px] mx-4 lg:mx-4.5 transition-all duration-300",
                  isCompleted
                    ? "bg-accent"
                    : "bg-black/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

