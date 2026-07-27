import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

const PATHS = ["", "/menu", "/o-nas", "/kontakt", "/ochrana-osobnich-udaju", "/cookies", "/obchodni-podminky"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      entries.push({
        url: `${SITE.url}${prefix}${path}`,
        changeFrequency: path === "/menu" || path === "" ? "daily" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
