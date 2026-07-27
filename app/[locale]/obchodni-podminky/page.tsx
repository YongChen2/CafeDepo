import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

const CS = {
  h1: "OBCHODNÍ PODMÍNKY",
  metaDescription:
    "Obchodní podmínky CAFE DEPO — rezervace salonku v patře, storno podmínky, ceny a reklamace.",
  sections: [
    {
      h: "1. Provozovatel",
      p: `Provozovatelem kavárny CAFE DEPO je [DOPLNIT: IČO], se sídlem [DOPLNIT: sídlo], provozovna Nádražní 1118, 511 01 Turnov. Kontakt: ${SITE.email}, tel. ${SITE.phoneDisplay}.`,
    },
    {
      h: "2. Rezervace salonku a akcí",
      p: "Rezervace salonku v patře (oslavy, narozeniny, firemní meetingy, tiskové konference) se sjednává individuálně telefonicky, e-mailem nebo prostřednictvím sociálních sítí. Rezervace je závazná až po jejím písemném či telefonickém potvrzení provozovatelem.",
    },
    {
      h: "3. Storno podmínky",
      p: "Zrušení rezervace je třeba oznámit provozovateli s dostatečným předstihem, nejlépe alespoň 48 hodin před termínem konání akce, aby bylo možné termín nabídnout jinému zájemci.",
    },
    {
      h: "4. Ceny",
      p: "Ceny jídel a nápojů jsou uvedeny v aktuálním menu na místě a v poledním menu na webu. Provozovatel si vyhrazuje právo ceny průběžně upravovat.",
    },
    {
      h: "5. Reklamace",
      p: "Případné reklamace ohledně kvality jídel či služeb uplatňujte přímo v provozovně nebo na kontaktním e-mailu. Reklamace se řídí příslušnými ustanoveními občanského zákoníku.",
    },
  ],
};

const EN = {
  h1: "TERMS & CONDITIONS",
  metaDescription:
    "CAFE DEPO terms & conditions — upstairs lounge bookings, cancellation policy, pricing and complaints.",
  sections: [
    {
      h: "1. Operator",
      p: `CAFE DEPO is operated by [FILL IN: Company ID], registered office [FILL IN: registered office], premises at Nádražní 1118, 511 01 Turnov, Czech Republic. Contact: ${SITE.email}, phone ${SITE.phoneDisplay}.`,
    },
    {
      h: "2. Booking the lounge and events",
      p: "Bookings for the upstairs lounge (celebrations, birthdays, business meetings, press conferences) are arranged individually by phone, email, or social media. A booking becomes binding once confirmed in writing or by phone by the operator.",
    },
    {
      h: "3. Cancellation",
      p: "Please notify the operator of a cancellation with sufficient notice, ideally at least 48 hours before the event, so the slot can be offered to another guest.",
    },
    {
      h: "4. Prices",
      p: "Prices for food and drinks are listed in the current on-site menu and the lunch menu on the website. The operator reserves the right to adjust prices from time to time.",
    },
    {
      h: "5. Complaints",
      p: "Any complaints regarding the quality of food or service can be made directly at the premises or via the contact email. Complaints are handled in accordance with the relevant provisions of the Czech Civil Code.",
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

export default async function TermsPage({
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
              { name: content.h1, path: "/obchodni-podminky" },
            ],
            locale,
          ),
        )}
      />

      <h1 className="font-display uppercase tracking-tight text-3xl sm:text-5xl">
        {content.h1}
      </h1>
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
