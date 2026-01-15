interface EmergencyIconProps {
  className?: string;
  strokeWidth?: number | string;
}

export default function EmergencyIcon({
  className,
  strokeWidth = 1.5,
}: EmergencyIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="emergency icon"
      className={className}
    >
      <path
        d="M13.3332 14.6668V10.6668C13.3332 7.72131 10.9454 5.3335 7.99984 5.3335C5.05432 5.3335 2.6665 7.72131 2.6665 10.6668V14.6668"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M9.52686 7.6665C10.1953 7.93709 10.7291 8.47087 10.9997 9.13933"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M1.3335 14.6665H14.6668"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8 1.3335V3.3335"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M14 4L13 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M2 4L3 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 11.6665C9 12.2188 8.55228 12.6665 8 12.6665C7.44772 12.6665 7 12.2188 7 11.6665C7 11.1142 7.44772 10.6665 8 10.6665C8.55228 10.6665 9 11.1142 9 11.6665Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M8 12.6665V14.6665"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

