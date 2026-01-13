import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "scan-me-photos";

/**
 * Генерує підпис для signed upload в Cloudinary
 */
function generateSignature(params: Record<string, string | number>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  
  const signatureString = sortedParams + CLOUDINARY_API_SECRET;
  return crypto.createHash("sha1").update(signatureString).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    // Перевіряємо наявність необхідних змінних
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary не налаштовано. Перевірте змінні оточення." },
        { status: 500 }
      );
    }

    // Отримуємо дані з запиту
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не надано" },
        { status: 400 }
      );
    }

    // Створюємо унікальний public_id
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = userId ? `users/${userId}/photo_${timestamp}` : `photo_${timestamp}`;

    // Параметри для завантаження (тільки визначені значення)
    const uploadParams: Record<string, string | number> = {
      timestamp,
      public_id: publicId,
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
    };

    // Додаємо folder тільки якщо є userId
    if (userId) {
      uploadParams.folder = `users/${userId}`;
    }

    // Генеруємо підпис
    const signature = generateSignature(uploadParams);

    // Створюємо FormData для завантаження на Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("api_key", CLOUDINARY_API_KEY);
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    
    if (uploadParams.folder) {
      cloudinaryFormData.append("folder", uploadParams.folder as string);
    }
    cloudinaryFormData.append("public_id", publicId);
    cloudinaryFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Завантажуємо на Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Помилка завантаження на Cloudinary:", errorData);
      return NextResponse.json(
        {
          error: errorData.error?.message || "Помилка завантаження фото",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Повертаємо secure URL
    return NextResponse.json({
      url: data.secure_url || data.url,
      publicId: data.public_id,
    });
  } catch (error: any) {
    console.error("Помилка API route для завантаження фото:", error);
    return NextResponse.json(
      { error: error.message || "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}

