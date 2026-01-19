interface CameraIconProps {
    className?: string;
    strokeWidth?: number | string;
}

export default function CameraIcon({
    className,
    strokeWidth = 0.7,
}: CameraIconProps) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="camera icon"
        >
            <circle
                cx="6"
                cy="6.5"
                r="1.5"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <path
                d="M4.88889 10.5H7.11111C8.67163 10.5 9.45188 10.5 10.0124 10.1323C10.255 9.97311 10.4634 9.76857 10.6255 9.53034C11 8.98003 11 8.21396 11 6.68182C11 5.14968 11 4.38361 10.6255 3.8333C10.4634 3.59507 10.255 3.39052 10.0124 3.23134C9.65222 2.99507 9.20133 2.91061 8.511 2.88043C8.18157 2.88043 7.89794 2.63534 7.83333 2.31818C7.73642 1.84244 7.31097 1.5 6.81683 1.5H5.18317C4.68903 1.5 4.26358 1.84244 4.16667 2.31818C4.10206 2.63534 3.81843 2.88043 3.489 2.88043C2.79867 2.91061 2.34778 2.99507 1.98762 3.23134C1.74498 3.39052 1.53664 3.59507 1.37451 3.8333C1 4.38361 1 5.14968 1 6.68182C1 8.21396 1 8.98003 1.37451 9.53034C1.53664 9.76857 1.74498 9.97311 1.98762 10.1323C2.54812 10.5 3.32838 10.5 4.88889 10.5Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <path
                d="M9.5 5H9"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    );
}
