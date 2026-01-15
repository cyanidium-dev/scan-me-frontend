import { 
  doc, 
  getDoc,
  setDoc, 
  serverTimestamp,
  FieldValue
} from "firebase/firestore";
import { db } from "./config";
import { User } from "firebase/auth";
import { cloudinaryConfig, isCloudinaryConfigured } from "../cloudinary/config";

export interface UserProfileData {
  // Особисті дані
  personalData: {
    name: string;
    surname: string;
    dateOfBirth: string;
    gender: string;
    photo?: string; // URL фото
    country: string;
    city: string;
    address: string;
  };
  // Медичні дані
  medicalData: {
    bloodType: string;
    rhFactor: string;
    allergies: string[];
    chronicDiseases: string;
    operations: Array<{ name: string; year: string }>;
    medications: string[];
    doctors: Array<{ name: string; phone: string; specialization: string }>;
  };
  // Екстрені дані
  emergencyData: {
    emergencyContacts: Array<{ name: string; phone: string; relationship: string }>;
    sendSMS: boolean;
    allowGPS: boolean;
  };
  // Метадані
  createdAt: FieldValue | Date;
  updatedAt: FieldValue | Date;
}

/**
 * Завантажує фото користувача в Cloudinary через API route (signed upload)
 * @param userId - ID користувача
 * @param photoFile - Файл фото
 * @returns URL завантаженого фото
 */
export async function uploadUserPhoto(
  userId: string,
  photoFile: File
): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary не налаштовано. Перевірте змінні оточення.");
  }

  try {
    // Створюємо FormData для завантаження через API route
    const formData = new FormData();
    formData.append("file", photoFile);
    formData.append("userId", userId);

    // Завантажуємо фото через наш API route (який використовує signed upload)
    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || 
        `Помилка завантаження фото: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Повертаємо secure URL (HTTPS)
    return data.url;
  } catch (error) {
    console.error("Помилка завантаження фото в Cloudinary:", error);
    throw error;
  }
}

/**
 * Отримує профіль користувача з Firestore
 * @param userId - ID користувача
 * @returns Дані профілю користувача або null, якщо профіль не знайдено
 */
export async function getUserProfile(
  userId: string
): Promise<UserProfileData | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    return userSnap.data() as UserProfileData;
  } catch (error) {
    console.error("Помилка отримання профілю користувача:", error);
    throw error;
  }
}

/**
 * Зберігає профіль користувача в Firestore
 * @param user - Firebase User об'єкт
 * @param profileData - Дані профілю користувача
 */
export async function saveUserProfile(
  user: User,
  profileData: Omit<UserProfileData, "createdAt" | "updatedAt">
): Promise<void> {
  try {
    const userRef = doc(db, "users", user.uid);
    
    const dataToSave = {
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(userRef, dataToSave, { merge: true });
  } catch (error) {
    console.error("Помилка збереження профілю користувача:", error);
    throw error;
  }
}

