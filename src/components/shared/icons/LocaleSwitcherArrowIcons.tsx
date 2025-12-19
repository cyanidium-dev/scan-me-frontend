interface LocaleSwitcherArrowIconProps {
  className?: string;
  strokeWidth?: string;
}

export default function LocaleSwitcherArrowIcon({
  className = "",
}: LocaleSwitcherArrowIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="arrow icon"
      className={className}
    >
      <path
        d="M13.28 5.96667L8.9333 10.3133C7.99997 11.2467 7.99997 11.2467 7.06664 10.3133L2.71997 5.96667"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
