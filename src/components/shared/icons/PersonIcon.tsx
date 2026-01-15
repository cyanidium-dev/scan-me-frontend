interface PersonIconProps {
  className?: string;
  strokeWidth?: number | string;
}

export default function PersonIcon({
  className,
  strokeWidth = 1.5,
}: PersonIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="person icon"
      className={className}
    >
      <circle
        cx="8.00016"
        cy="4.00016"
        r="2.66667"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M13.3332 11.6665C13.3332 13.3234 13.3332 14.6665 7.99984 14.6665C2.6665 14.6665 2.6665 13.3234 2.6665 11.6665C2.6665 10.0096 5.05432 8.6665 7.99984 8.6665C10.9454 8.6665 13.3332 10.0096 13.3332 11.6665Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
