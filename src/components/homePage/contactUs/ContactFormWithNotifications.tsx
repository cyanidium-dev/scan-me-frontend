"use client";

import ContactForm from "@/components/shared/forms/ContactForm";
import { useState } from "react";

export default function ContactFormWithNotifications() {
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <>
      <ContactForm
        setIsError={setIsError}
        setIsNotificationShown={setIsNotificationShown}
      />
      {/* <NotificationPopUp
        title={isError ? "На жаль, щось пішло не так" : "Дякуємо за звернення!"}
        description={
          isError
            ? "Спробуйте відправити форму ще раз"
            : "Наш менеджер скоро зв'яжеться з вами"
        }
        isPopUpShown={isNotificationShown}
        setIsPopUpShown={setIsNotificationShown}
      /> */}
      {/* <Backdrop
        isVisible={isModalShown || isNotificationShown}
        onClick={() => {
          setIsModalShown(false);
          setIsNotificationShown(false);
        }}
      /> */}
    </>
  );
}
