import type { MetadataRoute } from "next";
import { getProjects } from "@/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const routes = ["", "/projetos", "/academy", "/blog", "/sobre"];

  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}` })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/projetos/${p.slug}` })),
  ];
}
