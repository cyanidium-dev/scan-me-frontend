interface ShevronIconProps {
  className?: string;
}
export default function ShevronIcon({ className }: ShevronIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="shevron icon"
    >
      <g clip-path="url(#clip0_216_12137)">
        <path
          d="M19 9L12 15L5 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_216_12137">
          <rect width="24" height="24" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
