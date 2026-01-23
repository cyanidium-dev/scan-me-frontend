import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, getLocale, getMessages } from "next-intl/server";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import Providers from "@/components/shared/providers/Providers";
import { headers } from "next/headers";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("metadata");
  const headersList = await headers();
  
  // Отримуємо pathname з заголовків
  let pathname = "";
  const pathnameHeader = headersList.get("x-pathname");
  if (pathnameHeader) {
    pathname = pathnameHeader;
    // Видаляємо префікс локалі, якщо він є
    const localePrefix = `/${locale}`;
    if (pathname.startsWith(localePrefix)) {
      pathname = pathname.slice(localePrefix.length);
    }
    // Якщо pathname порожній після видалення префіксу, це головна сторінка
    if (pathname === "/" || pathname === "") {
      pathname = "";
    }
  }

  return getDefaultMetadata(t, locale, pathname);
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
        className={`${montserrat.variable} ${actay.variable} relative z-1 flex min-h-dvh flex-col text-[12px] lg:text-[14px] font-light leading-[120%] antialiased`}
      >
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
