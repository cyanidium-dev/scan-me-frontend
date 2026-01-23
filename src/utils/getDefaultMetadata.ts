import { Metadata } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://scan-me.com";

export function getDefaultMetadata(
  t: (key: string) => string,
  locale: string,
  pathname?: string
): Metadata {
  // Формуємо канонічний URL
  const defaultLocale = routing.defaultLocale;
  // Нормалізуємо pathname: видаляємо початковий слеш, якщо він є
  const normalizedPath = pathname?.replace(/^\//, "") || "";
  
  // Для дефолтної мови (uk) не додаємо префікс
  let canonicalPath = "";
  if (normalizedPath) {
    canonicalPath = locale === defaultLocale 
      ? `/${normalizedPath}` 
      : `/${locale}/${normalizedPath}`;
  } else {
    canonicalPath = locale === defaultLocale ? "" : `/${locale}`;
  }
  
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  // Формуємо альтернативні мови
  const alternates: Record<string, string> = {};
  routing.locales.forEach((altLocale) => {
    let altPath = "";
    if (normalizedPath) {
      altPath = altLocale === defaultLocale 
        ? `/${normalizedPath}` 
        : `/${altLocale}/${normalizedPath}`;
    } else {
      altPath = altLocale === defaultLocale ? "" : `/${altLocale}`;
    }
    alternates[altLocale] = `${SITE_URL}${altPath}`;
  });

  // Формуємо абсолютний URL для Open Graph зображення
  // Next.js автоматично обробляє opengraph-image.jpg з app директорії
  // Але для правильного відображення в соціальних мережах потрібен абсолютний URL
  const ogImageUrl = new URL("/opengraph-image.jpg", SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Scan me",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Scan me",
          type: "image/jpeg",
        },
      ],
      locale: locale === "uk" ? "uk_UA" : locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === "uk" ? "uk_UA" : l === "pl" ? "pl_PL" : "en_US")),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImageUrl],
    },
  };
}
