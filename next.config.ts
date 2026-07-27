import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    // Máme dva samostatné "root" layouty (app/[locale] a app/admin), takže
    // Next doporučuje global-not-found.js pro opravdu nezachycené cesty.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
