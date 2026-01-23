"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/hooks/useAuth";
import Loader from "../loader/Loader";
import { auth } from "@/lib/firebase/config";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || user) return;

    // Важливо: після signUp/signIn Firebase вже може мати auth.currentUser,
    // але наш AuthContext ще не встиг оновитись. Даємо короткий "grace period",
    // щоб уникнути миготіння /sign-in -> /dashboard.
    const hasFirebaseUser = !!auth.currentUser;
    if (hasFirebaseUser) return;

    const t = window.setTimeout(() => {
      if (!auth.currentUser) {
        router.replace("/sign-in");
      }
    }, 300);

    return () => window.clearTimeout(t);
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    // Якщо контекст ще не оновився, але Firebase user вже є — показуємо лоадер
    // (щоб не робити редірект на /sign-in).
    if (auth.currentUser) {
      return <Loader />;
    }
    return null;
  }

  return <>{children}</>;
}

