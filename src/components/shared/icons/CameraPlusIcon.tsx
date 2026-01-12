interface CameraPlusIconProps {
    className?: string;
}

export default function CameraPlusIcon({ className }: CameraPlusIconProps) {
    return (
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="camera plus icon">
            <path d="M40.625 35.2083H24.375" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M32.5 27.0833L32.5 43.3333" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M26.4818 56.875H38.5188C46.9716 56.875 51.198 56.875 54.234 54.8833C55.5484 54.021 56.6768 52.9131 57.555 51.6226C59.5837 48.6418 59.5837 44.4923 59.5837 36.1932C59.5837 27.8941 59.5837 23.7445 57.555 20.7637C56.6768 19.4733 55.5484 18.3653 54.234 17.5031C52.2832 16.2233 49.8409 15.7658 46.1016 15.6023C44.3172 15.6023 42.7808 14.2748 42.4309 12.5568C41.906 9.97991 39.6014 8.125 36.9248 8.125H28.0758C25.3992 8.125 23.0947 9.97991 22.5698 12.5568C22.2198 14.2748 20.6835 15.6023 18.8991 15.6023C15.1598 15.7658 12.7174 16.2233 10.7666 17.5031C9.45228 18.3653 8.3238 19.4733 7.4456 20.7637C5.41699 23.7445 5.41699 27.8941 5.41699 36.1932C5.41699 44.4923 5.41699 48.6418 7.4456 51.6226C8.3238 52.9131 9.45228 54.021 10.7666 54.8833C13.8026 56.875 18.029 56.875 26.4818 56.875Z" stroke="#FAFAFA" stroke-width="1.5" />
            <path d="M51.4583 27.0833H48.75" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

    );
}

