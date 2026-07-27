import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Cookies",
};

const CS = {
  h1: "COOKIES",
  intro:
    "Tento web se snaží pracovat s co nejmenším množstvím cookies a sledovacích technologií.",
  rows: [
    {
      name: "depo_admin",
      ucel: "Nezbytná — přihlášení do administrace obědového menu (/admin). Neslouží k analytice ani reklamě.",
      doba: "7 dní",
    },
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
  ],
  outro:
    "Cookies můžete kdykoliv smazat nebo zablokovat v nastavení svého prohlížeče. Nezbytné cookies (přihlášení do administrace) jsou vyžadovány pro funkčnost webu a nevyžadují souhlas dle zákona o elektronických komunikacích.",
};

const EN = {
  h1: "COOKIES",
  intro: "This website tries to use as few cookies and tracking technologies as possible.",
  rows: [
    {
      name: "depo_admin",
      ucel: "Necessary — login for the lunch menu admin panel (/admin). Not used for analytics or advertising.",
      doba: "7 days",
    },
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
  ],
  outro:
    "You can delete or block cookies at any time in your browser settings. Necessary cookies (admin login) are required for the website to function and do not require consent under electronic communications law.",
};

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = locale === "en" ? EN : CS;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 w-full flex flex-col gap-8">
      <h1 className="font-display uppercase tracking-tight text-3xl sm:text-5xl">
        {content.h1}
      </h1>
      <p className="font-mono text-sm opacity-80">{content.intro}</p>

      <div className="ascii-frame">
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
              <span className="opacity-80">{r.ucel}</span>
              <span className="opacity-60">{r.doba}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-sm opacity-70">{content.outro}</p>
    </main>
  );
}
