"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { AuthContextType, AuthUser } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Перевірка, чи auth ініціалізовано
    if (!auth) {
      console.warn("Firebase Auth не ініціалізовано");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as AuthUser | null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase Auth не ініціалізовано. Перевірте конфігурацію.");
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase Auth не ініціалізовано. Перевірте конфігурацію.");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Firebase signUp error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) {
      throw new Error("Firebase Auth не ініціалізовано. Перевірте конфігурацію.");
    }
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) {
      throw new Error("Firebase Auth не ініціалізовано. Перевірте конфігурацію.");
    }
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (displayName?: string, photoURL?: string) => {
    if (!auth) {
      throw new Error("Firebase Auth не ініціалізовано. Перевірте конфігурацію.");
    }
    if (!auth.currentUser) {
      throw new Error("Користувач не авторизований");
    }

    try {
      await firebaseUpdateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

