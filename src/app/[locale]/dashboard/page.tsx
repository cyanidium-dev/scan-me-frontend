"use client";

import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/shared/auth/ProtectedRoute";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const t = useTranslations("dashboard");

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Кабінет користувача</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Інформація про користувача</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              {user?.displayName && (
                <p>
                  <span className="font-medium">Ім'я:</span> {user.displayName}
                </p>
              )}
              <p>
                <span className="font-medium">ID користувача:</span> {user?.uid}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Вийти
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

