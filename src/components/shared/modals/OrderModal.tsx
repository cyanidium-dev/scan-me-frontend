"use client";

import { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import Backdrop from "../backdrop/Backdrop";
import OrderForm from "../forms/orderForm/OrderForm";

interface OrderModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  setIsError?: (error: boolean) => void;
  setIsNotificationShown?: (shown: boolean) => void;
}

export default function OrderModal({
  isModalShown,
  setIsModalShown,
  setIsError,
  setIsNotificationShown,
}: OrderModalProps) {
  return (
    <>
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
      <Modal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        className="bg-white text-black w-full"
      >
        <OrderForm
          setIsError={setIsError}
          setIsNotificationShown={setIsNotificationShown}
          setIsModalShown={setIsModalShown}
        />
      </Modal>
    </>
  );
}
