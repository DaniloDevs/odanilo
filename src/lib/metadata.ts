import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = { title: string; description: string; path: string };

/**
 * Metadata por página. O `openGraph` de uma página substitui o do layout
 * raiz (não há merge profundo), então título e descrição são repetidos aqui.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.shortName}`,
      description,
    },
  };
}
