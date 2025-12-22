import LoaderIcon from "../icons/LoaderIcon";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  variant?: "gradient" | "white" | "outline";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  loadingText?: string;
}

export default function MainButton({
  type = "button",
  children,
  className,
  variant = "gradient",
  disabled = false,
  isLoading = false,
  loadingText = "Надсилання...",
  onClick,
}: MainButtonProps) {
  const variants = {
    gradient:
      "bg-[linear-gradient(90deg,_#EC4754_0%,_#A01B24_50%,_#6D1219_100%)] text-white enabled:xl:hover:brightness-125 enabled:focus-visible:brightness-125",
    white:
      "bg-white text-black enabled:xl:hover:bg-accent enabled:focus-visible:bg-accent",
    outline:
      "bg-transparent text-white border border-white enabled:xl:hover:bg-white/20 enabled:focus-visible:bg-white/20",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `group relative overflow-hidden enabled:cursor-pointer flex items-center justify-center rounded-full 
          disabled:opacity-60 enabled:active:scale-[98%] 
           font-actay text-[12px] leading-[166%] font-bold uppercase will-change-transform transition duration-300 ease-in-out`,

        variants[variant],
        className
      )}
    >
      {variant === "gradient" ? (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #73131A 0%, #E74451 100%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      ) : null}
      {isLoading ? loadingText : children}

      {/* {isLoading ? <LoaderIcon /> : null} */}
    </button>
  );
}
