import {
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TELEGRAM_URL,
  TIKTOK_URL,
} from "@/constants/constants";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import TelegramIcon from "../icons/TelegramIcon";
import TikTokIcon from "../icons/TikTokIcon";
import { twMerge } from "tailwind-merge";

interface SocialsProps {
  className?: string;
}

export default function Socials({className=''}: SocialsProps) {
  const socialsList = [
    { icon: <LinkedinIcon />, url: INSTAGRAM_URL },
    { icon: <InstagramIcon />, url: LINKEDIN_URL },
    { icon: <TelegramIcon />, url: TELEGRAM_URL },
    { icon: <TikTokIcon />, url: TIKTOK_URL },
  ];
  return (
    <ul className={twMerge("flex gap-6", className)}>
      {socialsList.map(({ icon, url }, idx) => (
        <li key={idx}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="xl:hover:text-accent focus-visible:text-accent transition duration-300 ease-in-out"
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
