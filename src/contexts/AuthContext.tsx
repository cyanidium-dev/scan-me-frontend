"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  verifyPasswordResetCode,
  confirmPasswordReset,
  deleteUser,
  ActionCodeSettings,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Підписка на Firebase Auth (єдине місце для setState)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -------- AUTH ACTIONS --------

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = () => {
    return firebaseSignOut(auth);
  };

  const resetPassword = (email: string, languageCode?: string) => {
    // Встановлюємо мову для Firebase Auth
    // Firebase використає шаблон email для цієї мови, якщо він налаштований в Console
    // Мапінг локалей на формат Firebase (uk -> uk-UA, en -> en-US, pl -> pl-PL)
    const localeMap: Record<string, string> = {
      uk: "uk-UA",
      en: "en-US",
      pl: "pl-PL",
    };
    
    if (languageCode) {
      // Використовуємо мапінг, якщо він є, інакше використовуємо оригінальний код
      auth.languageCode = localeMap[languageCode] || languageCode;
    }
    
    return sendPasswordResetEmail(auth, email);
  };

  const verifyResetCode = (code: string) => {
    return verifyPasswordResetCode(auth, code);
  };

  const confirmResetPassword = (code: string, newPassword: string) => {
    return confirmPasswordReset(auth, code, newPassword);
  };

  const updateProfile = async (displayName?: string, photoURL?: string) => {
    if (!auth.currentUser) {
      throw new Error("Користувач не авторизований");
    }

    await firebaseUpdateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const checkEmailExists = async (email: string, password: string): Promise<boolean> => {
    try {
      // Оскільки fetchSignInMethodsForEmail застаріла, використовуємо інший підхід:
      // Спробуємо створити користувача з тимчасовим паролем
      // Якщо email вже існує, отримаємо помилку auth/email-already-in-use
      // Якщо користувач був створений (email не існував), видалимо його
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Якщо досягли цього кроку, значить користувач був створений (email не існував)
      // Видаляємо тимчасового користувача
      if (userCredential.user) {
        await deleteUser(userCredential.user);
        await firebaseSignOut(auth);
      }
      return false; // Email не існував
    } catch (error: any) {
      // Якщо помилка "auth/email-already-in-use", значить email вже зареєстрований
      if (error?.code === "auth/email-already-in-use") {
        return true;
      }
      // Якщо інша помилка (наприклад, auth/invalid-email, auth/weak-password)
      // вважаємо що email не існує (або не можемо перевірити)
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    verifyResetCode,
    confirmResetPassword,
    updateProfile,
    checkEmailExists,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// -------- HOOK --------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
