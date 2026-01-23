import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  // Нормалізуємо SITE_URL: видаляємо завершальний слеш, якщо він є
  const normalizedSiteUrl = SITE_URL?.replace(/\/$/, "") || "";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/reset-password/",
          "/emergency-info/",
          "/forgot-password/",
          "/sign-in/",
          "/sign-up/",
        ],
      },
    ],
    sitemap: `${normalizedSiteUrl}/sitemap.xml`,
  };
}
