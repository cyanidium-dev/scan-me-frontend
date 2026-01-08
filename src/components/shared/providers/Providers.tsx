"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from "next-intl";

interface ProvidersProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export default function Providers({ children, messages, locale }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}

