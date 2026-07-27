import { SITE } from "./site";

// TODO: ověřit u klienta
const OPENING_HOURS_SPEC = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
  { dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
];

export function cafeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      postalCode: SITE.postalCode,
      addressLocality: SITE.addressLocality,
      addressCountry: SITE.addressCountry,
    },
    sameAs: [SITE.facebook, SITE.instagram],
    openingHoursSpecification: OPENING_HOURS_SPEC.map((s) => ({
      "@type": "OpeningHoursSpecification",
      ...s,
    })),
    servesCuisine: "Czech",
    priceRange: "$$",
  };
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  };
}
