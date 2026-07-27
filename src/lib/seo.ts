import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nimadfarazpars.ir";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.jpg",
  type = "website",
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes("نیماد فراز پارس") ? title : `${title} | موسسه حقوقی نیماد فراز پارس`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "موسسه حقوقی نیماد فراز پارس",
      locale: "fa_IR",
      type,
      images: [{ url: image.startsWith("http") ? image : `${SITE_URL}${image}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "موسسه حقوقی نیماد فراز پارس",
    url: SITE_URL,
    slogan: "حراست از حق، رسالت ماست.",
    areaServed: "IR",
    inLanguage: "fa",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export { SITE_URL };
