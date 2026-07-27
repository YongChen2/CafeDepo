import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    // Root layout je definovaný přes top-level dynamický segment
    // (app/[locale]/layout.tsx), takže Next doporučuje global-not-found.js
    // pro URL, které vůbec nematchují žádnou route.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
