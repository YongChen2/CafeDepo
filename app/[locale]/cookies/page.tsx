import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonld";

const CS = {
  h1: "COOKIES",
  metaDescription:
    "Přehled cookies používaných na webu CAFE DEPO — jen nezbytná cookie pro uložení souhlasu a Google Maps po souhlasu. Vercel Analytics cookies nepoužívá.",
  intro:
    "Tento web se snaží pracovat s co nejmenším množstvím cookies a sledovacích technologií.",
  rows: [
    {
      name: "depo_cookie_consent",
      ucel: "Nezbytná — uložení vaší volby ohledně tohoto cookie banneru.",
      doba: "trvale (do smazání v prohlížeči)",
    },
    {
      name: "Vercel Analytics",
      ucel: "Analytika návštěvnosti webu. Nepoužívá cookies ani neukládá osobní identifikátory.",
      doba: "—",
    },
    {
      name: "Google Maps (mapa v kontaktu a na homepage)",
      ucel: "Vloží se až po vašem souhlasu s cookies. Google může při zobrazení mapy nastavit vlastní cookies.",
      doba: "dle Google",
    },
  ],
  outro:
    "Cookies můžete kdykoliv smazat nebo zablokovat v nastavení svého prohlížeče. Nezbytnou cookie pro uložení souhlasu vyžaduje funkčnost webu a nevyžaduje souhlas dle zákona o elektronických komunikacích.",
};

const EN = {
  h1: "COOKIES",
  metaDescription:
    "Overview of cookies used on the CAFE DEPO website — only a necessary cookie for consent storage and Google Maps after consent. Vercel Analytics is cookieless.",
  intro: "This website tries to use as few cookies and tracking technologies as possible.",
  rows: [
    {
      name: "depo_cookie_consent",
      ucel: "Necessary — stores your choice regarding this cookie banner.",
      doba: "persistent (until cleared in browser)",
    },
    {
      name: "Vercel Analytics",
      ucel: "Website traffic analytics. Does not use cookies or store personal identifiers.",
      doba: "—",
    },
    {
      name: "Google Maps (contact page and homepage map)",
      ucel: "Embedded only after you give cookie consent. Google may set its own cookies when the map is displayed.",
      doba: "per Google",
    },
  ],
  outro:
    "You can delete or block cookies at any time in your browser settings. The necessary consent-storage cookie is required for the website to function and does not require consent under electronic communications law.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = locale === "en" ? EN : CS;
  return { title: content.h1, description: content.metaDescription };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = locale === "en" ? EN : CS;
  const navT = await getTranslations("nav");

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 w-full flex flex-col gap-8">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd(
            [
              { name: navT("home"), path: "/" },
              { name: content.h1, path: "/cookies" },
            ],
            locale,
          ),
        )}
      />

      <h1 className="font-display uppercase tracking-[-0.03em] text-3xl sm:text-5xl">
        {content.h1}
      </h1>
      <p className="text-sm leading-[1.6]">{content.intro}</p>

      <div className="card-frame">
        <div className="hairline-grid grid-cols-1">
          <div className="grid grid-cols-3 bg-fg text-bg font-mono text-xs uppercase p-3 gap-2">
            <span>Name</span>
            <span>Účel / Purpose</span>
            <span>Doba / Duration</span>
          </div>
          {content.rows.map((r) => (
            <div
              key={r.name}
              className="grid grid-cols-3 bg-bg font-mono text-xs p-3 gap-2"
            >
              <span className="font-mono">{r.name}</span>
              <span className="text-muted">{r.ucel}</span>
              <span className="text-muted">{r.doba}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm leading-[1.6] text-muted">{content.outro}</p>
    </main>
  );
}
