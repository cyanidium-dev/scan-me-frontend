interface LogoutIconProps {
    className?: string;
    strokeWidth?: number | string;
}

export default function LogoutIcon({
    className,
    strokeWidth = 1.5,
}: LogoutIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="logout icon"
            className={className}
        >
            <path
                d="M7.4165 6.3002C7.67484 3.3002 9.2165 2.0752 12.5915 2.0752H12.6998C16.4248 2.0752 17.9165 3.56686 17.9165 7.29186V12.7252C17.9165 16.4502 16.4248 17.9419 12.6998 17.9419H12.5915C9.2415 17.9419 7.69984 16.7335 7.42484 13.7835"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.4999 10H3.0166"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.87516 7.2085L2.0835 10.0002L4.87516 12.7918"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
