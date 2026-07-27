export const SITE = {
  name: "CAFE DEPO",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  streetAddress: "Nádražní 1118",
  postalCode: "511 01",
  addressLocality: "Turnov",
  addressCountry: "CZ",
  phone: "776620290",
  phoneDisplay: "776 620 290",
  email: "info@depocafe.cz",
  facebook: "https://www.facebook.com/depocafe.cz",
  instagram: "https://www.instagram.com/cafedepo_",
} as const;
