import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// Список статичних сторінок (без динамічних параметрів)
// Виключаємо сторінки, які заборонені для індексації в robots.txt
const staticPages = [
  "",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  // Нормалізуємо SITE_URL: видаляємо завершальний слеш, якщо він є
  const normalizedSiteUrl = SITE_URL?.replace(/\/$/, "") || "";

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Генеруємо записи для кожної сторінки та кожної мови
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      // Для дефолтної мови (uk) не додаємо префікс (localePrefix: "as-needed")
      let path = "";
      if (page) {
        path = locale === defaultLocale ? `/${page}` : `/${locale}/${page}`;
      } else {
        path = locale === defaultLocale ? "" : `/${locale}`;
      }
      const url = `${normalizedSiteUrl}${path}`;

      // Додаємо альтернативні мови для кожної сторінки
      const alternates: Record<string, string> = {};
      locales.forEach((altLocale) => {
        let altPath = "";
        if (page) {
          altPath =
            altLocale === defaultLocale ? `/${page}` : `/${altLocale}/${page}`;
        } else {
          altPath = altLocale === defaultLocale ? "" : `/${altLocale}`;
        }
        alternates[altLocale] = `${normalizedSiteUrl}${altPath}`;
      });

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}
