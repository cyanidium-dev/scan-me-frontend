import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const actay = localFont({
  src: [
    {
      path: "../../../public/fonts/actayWideBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-actay",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "QR-наклейка ScanMe — ваш особистий рятувальний код",
  description:
    "У критичній ситуації кожна секунда важлива. QR-наклейка ScanMe передає медикам життєво важливу інформацію одразу після сканування.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${actay.variable} flex min-h-dvh flex-col text-[12px] lg:text-[14px] font-light leading-[120%] antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
