import { defineRouting } from "next-intl/routing";

// Struktura připravená na přidání dalšího jazyka (např. "de"):
// 1) přidat kód do pole `locales` níže
// 2) vytvořit messages/de.json podle vzoru cs.json / en.json
export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
