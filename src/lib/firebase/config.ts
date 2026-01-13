import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import type { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// 🔐 Ініціалізація Firebase App (singleton)
const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// 🔐 Auth НІКОЛИ не null
export const auth = getAuth(app);

// 🔥 Firestore Database
export const db = getFirestore(app);

// 📦 Storage для файлів (опціонально, якщо доступний)
let storageInstance: FirebaseStorage | null = null;
try {
  if (firebaseConfig.storageBucket) {
    storageInstance = getStorage(app);
  }
} catch (error) {
  console.warn("Firebase Storage недоступний:", error);
}

export const storage = storageInstance;

export default app;
