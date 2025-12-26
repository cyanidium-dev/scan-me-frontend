import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/Modal";
import MainButton from "../buttons/MainButton";
import Image from "next/image";

interface NotificationPopUpProps {
  title: string;
  description: string;
  isPopUpShown: boolean;

  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationPopUp({
  title,
  description,
  isPopUpShown,

  setIsPopUpShown,
}: NotificationPopUpProps) {
  return (
    <Modal isModalShown={isPopUpShown} setIsModalShown={setIsPopUpShown}>
      <div className="px-6 lg:px-8 py-10 relative flex flex-col justify-center items-center w-full">
        <h3 className="mb-6 mt-10 font-actay text-[24px] lg:text-[32px] font-bold leading-[120%] text-center uppercase">
          {title}
        </h3>
        <p className="mb-[220px] lg:mb-[207px] lg:mb-[27px] text-center">
          {description}
        </p>
      </div>
      <div className="absolute -z-10 bottom-0 left-0 w-full h-[308px]">
        <Image
          src="/images/notifications/scanme.webp"
          alt="scan me"
          fill
          className="object-cover"
        />
      </div>
    </Modal>
  );
}
