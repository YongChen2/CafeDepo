import { SITE } from "./site";

const MENICKA_URL = "https://www.menicka.cz/8771-cafe-depo.html";

// Otevírací doba ověřená klientkou (2026-07-28), viz lib/opening-hours.ts.
const OPENING_HOURS_SPEC = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "18:00" },
  { dayOfWeek: ["Friday"], opens: "08:00", closes: "22:00" },
  { dayOfWeek: ["Saturday"], opens: "09:00", closes: "22:00" },
  { dayOfWeek: ["Sunday"], opens: "09:00", closes: "14:00" },
];

export function cafeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: SITE.name,
    url: SITE.url,
    telephone: `+420${SITE.phone}`,
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
    hasMenu: MENICKA_URL,
    publicAccess: true,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Terasa",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Salonek v patře",
        value: true,
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: string,
) {
  const prefix = locale === "cs" ? "" : `/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${prefix}${item.path}`,
    })),
  };
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  };
}
