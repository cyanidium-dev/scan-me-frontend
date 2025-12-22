import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function getDefaultMetadata(
  t: (key: string) => string,
  locale: string
): Metadata {
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Scan me",
        },
      ],
      type: "website",
      locale: locale === "uk" ? "uk_UA" : locale === "pl" ? "pl_PL" : "en_US",
      siteName: "Scan me",
    },
  };
}
