import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

const CS = {
  h1: "OCHRANA OSOBNÍCH ÚDAJŮ",
  metaDescription:
    "Zásady zpracování osobních údajů CAFE DEPO — jaké údaje zpracováváme, proč, jak dlouho a jaká máte práva.",
  updated: "Poslední aktualizace: 2026",
  sections: [
    {
      h: "1. Správce osobních údajů",
      p: `Správcem osobních údajů je CAFE DEPO, [DOPLNIT: IČO], se sídlem [DOPLNIT: sídlo] (dále jen „správce“). Kontakt: ${SITE.email}, tel. ${SITE.phoneDisplay}.`,
    },
    {
      h: "2. Jaké údaje zpracováváme",
      p: "V souvislosti s provozem webu zpracováváme údaje, které nám sami poskytnete (např. jméno, e-mail a telefon při poptávce salonku či rezervaci), a dále technické údaje o návštěvnosti webu prostřednictvím anonymizované analytiky (Vercel Analytics), která nepoužívá cookies a neukládá osobní údaje umožňující identifikaci konkrétní osoby.",
    },
    {
      h: "3. Účel a právní základ zpracování",
      p: "Údaje zpracováváme za účelem vyřízení vaší poptávky nebo rezervace (plnění smlouvy / jednání o smlouvě) a za účelem zlepšování webu na základě oprávněného zájmu správce.",
    },
    {
      h: "4. Doba uchování",
      p: "Osobní údaje uchováváme pouze po dobu nezbytně nutnou k naplnění účelu zpracování, nejdéle však po dobu 3 let od posledního kontaktu, pokud právní předpisy nestanoví jinak.",
    },
    {
      h: "5. Vaše práva",
      p: "Máte právo na přístup k osobním údajům, jejich opravu či výmaz, omezení zpracování, přenositelnost údajů a právo vznést námitku proti zpracování. Svá práva můžete uplatnit na e-mailu " + SITE.email + ".",
    },
    {
      h: "6. Předávání třetím stranám",
      p: "Osobní údaje nepředáváme třetím stranám s výjimkou zpracovatelů nezbytných k provozu webu (hosting Vercel Inc.) a s výjimkou případů, kdy nám to ukládá zákon.",
    },
    {
      h: "7. Dozorový úřad",
      p: "V případě nespokojenosti se zpracováním osobních údajů se můžete obrátit na Úřad pro ochranu osobních údajů (uoou.cz).",
    },
  ],
};

const EN = {
  h1: "PRIVACY POLICY",
  metaDescription:
    "CAFE DEPO privacy policy — what personal data we process, why, for how long, and your rights.",
  updated: "Last updated: 2026",
  sections: [
    {
      h: "1. Data controller",
      p: `The data controller is CAFE DEPO, [FILL IN: Company ID], registered office [FILL IN: registered office] (the "controller"). Contact: ${SITE.email}, phone ${SITE.phoneDisplay}.`,
    },
    {
      h: "2. What data we process",
      p: "In connection with operating this website we process data you provide yourself (e.g. name, email and phone when enquiring about the lounge or a reservation), and technical visit data via anonymized analytics (Vercel Analytics), which does not use cookies and does not store data allowing identification of a specific person.",
    },
    {
      h: "3. Purpose and legal basis",
      p: "We process data to handle your enquiry or reservation (performance of / negotiating a contract) and to improve the website based on the controller's legitimate interest.",
    },
    {
      h: "4. Retention period",
      p: "We retain personal data only for as long as necessary for the purpose of processing, for a maximum of 3 years from the last contact, unless legal regulations require otherwise.",
    },
    {
      h: "5. Your rights",
      p: "You have the right to access, correct or erase your personal data, restrict processing, data portability, and the right to object to processing. You may exercise your rights at " + SITE.email + ".",
    },
    {
      h: "6. Disclosure to third parties",
      p: "We do not disclose personal data to third parties, except processors necessary for operating the website (hosting by Vercel Inc.) and where required by law.",
    },
    {
      h: "7. Supervisory authority",
      p: "If you are dissatisfied with how your personal data is processed, you may contact the Czech Office for Personal Data Protection (uoou.cz).",
    },
  ],
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

export default async function PrivacyPage({
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
              { name: content.h1, path: "/ochrana-osobnich-udaju" },
            ],
            locale,
          ),
        )}
      />

      <div>
        <h1 className="font-display uppercase tracking-tight text-3xl sm:text-5xl">
          {content.h1}
        </h1>
        <p className="font-mono text-xs opacity-60 mt-2">{content.updated}</p>
      </div>
      <div className="flex flex-col gap-6 font-mono text-sm">
        {content.sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display uppercase text-base tracking-tight mb-1">
              {s.h}
            </h2>
            <p className="opacity-80">{s.p}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
