import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, getLocale, getMessages } from "next-intl/server";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import Providers from "@/components/shared/providers/Providers";
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

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("metadata");

  return getDefaultMetadata(t, locale);
}

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

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${actay.variable} flex min-h-dvh flex-col text-[12px] lg:text-[14px] font-light leading-[120%] antialiased`}
      >
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
