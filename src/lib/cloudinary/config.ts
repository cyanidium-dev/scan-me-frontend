/**
 * Конфігурація Cloudinary
 * Використовується для завантаження фото користувачів
 */

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "scan-me-photos",
};

/**
 * Перевіряє, чи налаштовано Cloudinary
 */
export function isCloudinaryConfigured(): boolean {
  return !!(
    cloudinaryConfig.cloudName &&
    cloudinaryConfig.apiKey &&
    cloudinaryConfig.uploadPreset
  );
}

