interface TrashIconProps {
  className?: string;
}

export default function TrashIcon({ className }: TrashIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="trash icon"
    >
      <path
        d="M17.0832 5H2.9165"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.6946 7.0835L15.3113 12.8328C15.1638 15.0452 15.09 16.1514 14.3692 16.8258C13.6483 17.5002 12.5397 17.5002 10.3223 17.5002H9.67787C7.46054 17.5002 6.35187 17.5002 5.63103 16.8258C4.91019 16.1514 4.83644 15.0452 4.68895 12.8328L4.30566 7.0835"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.9165 9.1665L8.33317 13.3332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.0832 9.1665L11.6665 13.3332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.4165 5C5.46307 5 5.48635 5 5.50746 4.99947C6.19366 4.98208 6.79902 4.54576 7.03252 3.90027C7.0397 3.88041 7.04706 3.85832 7.06179 3.81415L7.14269 3.57143C7.21176 3.36423 7.24629 3.26063 7.2921 3.17267C7.47485 2.82173 7.81296 2.57803 8.20368 2.51564C8.30161 2.5 8.41082 2.5 8.62922 2.5H11.3705C11.5889 2.5 11.6981 2.5 11.796 2.51564C12.1867 2.57803 12.5248 2.82173 12.7076 3.17267C12.7534 3.26063 12.7879 3.36423 12.857 3.57143L12.9379 3.81415C12.9526 3.85826 12.96 3.88042 12.9672 3.90027C13.2007 4.54576 13.806 4.98208 14.4922 4.99947C14.5133 5 14.5366 5 14.5832 5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
