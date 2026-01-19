"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import OrderModal from "../modals/OrderModal";
import NotificationPopUp from "../notifications/NotificationPopUp";

interface OrderProps {
  isModalShown: boolean;
  setIsModalShown: (shown: boolean) => void;
}

export default function Order({
  isModalShown,
  setIsModalShown,
}: OrderProps) {
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const t = useTranslations("notifications");

  return (
    <>
      <OrderModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        setIsError={setIsError}
        setIsNotificationShown={setIsNotificationShown}
      />

      <NotificationPopUp
        title={
          isError
            ? t("orderErrorTitle")
            : t("orderSuccessTitle")
        }
        description={
          isError
            ? t("orderErrorDescription")
            : t("orderSuccessDescription")
        }
        isPopUpShown={isNotificationShown}
        setIsPopUpShown={setIsNotificationShown}
      />
    </>
  );
}
