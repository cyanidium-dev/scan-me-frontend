"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/hooks/useAuth";
import MainButton from "@/components/shared/buttons/MainButton";
import Order from "@/components/shared/order/Order";

interface HeroButtonProps {
  buttonText: string;
}

export default function HeroButton({ buttonText }: HeroButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);

  const handleButtonClick = () => {
    if (user) {
      // Якщо користувач залогінений - відкриваємо форму замовлення
      setIsOrderModalShown(true);
    } else {
      // Якщо не залогінений - перенаправляємо на сторінку логіну
      router.push("/sign-in");
    }
  };

  return (
    <>
      <MainButton
        variant="gradient"
        className="relative z-10 w-full lg:w-[282px] h-[54px] h-[54px]"
        onClick={handleButtonClick}
      >
        {buttonText}
      </MainButton>

      {/* Order Modal */}
      <Order
        isModalShown={isOrderModalShown}
        setIsModalShown={setIsOrderModalShown}
      />
    </>
  );
}
