import { OG_SIZE, renderOgImage } from "@/lib/og-image";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const alt = "CAFE DEPO — Nádražní 1118, Turnov";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
