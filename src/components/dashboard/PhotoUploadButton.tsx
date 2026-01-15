"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { uploadUserPhoto, updateUserProfile } from "@/lib/firebase/userService";
import CameraIcon from "../shared/icons/CameraIcon";
import CameraPlusIcon from "../shared/icons/CameraPlusIcon";

interface PhotoUploadButtonProps {
    currentPhoto?: string;
    onPhotoUpdate: () => void;
    size?: "desktop" | "mobile";
    variant?: "form" | "dashboard"; // "form" для реєстрації, "dashboard" для дашборда
    userName?: string;
    userEmail?: string;
}

export default function PhotoUploadButton({
    currentPhoto,
    onPhotoUpdate,
    size = "desktop",
    variant = "form",
    userName,
    userEmail,
}: PhotoUploadButtonProps) {
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.uid) return;

        // Перевірка типу файлу
        if (!file.type.startsWith("image/")) {
            setError("Оберіть файл зображення");
            return;
        }

        // Перевірка розміру файлу (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Розмір файлу не повинен перевищувати 5MB");
            return;
        }

        try {
            setUploading(true);
            setError(null);

            // Завантажуємо фото в Cloudinary
            const photoUrl = await uploadUserPhoto(user.uid, file);

            // Оновлюємо профіль в Firestore
            await updateUserProfile(user.uid, {
                photo: photoUrl,
            });

            // Викликаємо callback для оновлення даних
            onPhotoUpdate();
        } catch (err: any) {
            console.error("Помилка завантаження фото:", err);
            setError(err.message || "Не вдалося завантажити фото");
        } finally {
            setUploading(false);
            // Очищаємо input для можливості повторного вибору того ж файлу
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleClick = () => {
        if (!uploading) {
            fileInputRef.current?.click();
        }
    };

    const isDesktop = size === "desktop";
    const isDashboard = variant === "dashboard";

    // Розміри фото: для дашборда на desktop - 147px, для форми - 96px (w-24)
    const photoSize = isDesktop
        ? isDashboard
            ? "w-[147px] h-[147px]"
            : "w-24 h-24"
        : "w-16 h-16";

    // Розміри кнопки: для дашборда на desktop - 36px, для інших - стандартні
    const buttonSize =
        isDesktop && isDashboard
            ? "w-9 h-9"
            : isDesktop
              ? "w-8 h-8"
              : "w-6 h-6";

    // Розміри іконки: для дашборда на desktop - 24px, для інших - стандартні
    const iconSize =
        isDesktop && isDashboard
            ? "w-6 h-6"
            : isDesktop
              ? "w-4 h-4"
              : "w-3 h-3";

    return (
        <div className="relative">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
            />
            <div
                className={`${photoSize} rounded-full bg-black/20 overflow-hidden relative`}
            >
                {currentPhoto ? (
                    <Image
                        src={currentPhoto}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div
                        className={`w-full h-full flex items-center justify-center ${
                            isDesktop ? "text-white text-2xl" : "text-gray-500"
                        }`}
                    >
                        {userName?.[0]?.toUpperCase() ||
                            userEmail?.[0]?.toUpperCase() ||
                            "U"}
                    </div>
                )}
                {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>
            <button
                onClick={handleClick}
                disabled={uploading}
                className={`absolute ${isDesktop ? "bottom-0 right-0" : "bottom-0 right-0"} ${buttonSize} ${
                    isDesktop
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-accent hover:bg-accent/80"
                } rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Upload photo"
            >
                {currentPhoto ? (
                    <CameraIcon className={`text-white ${iconSize}`} />
                ) : (
                    <CameraPlusIcon
                        className={`text-white ${iconSize}`}
                        strokeWidth={0.7}
                    />
                )}
            </button>
            {error && (
                <div className="absolute top-full left-0 mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                    {error}
                </div>
            )}
        </div>
    );
}
