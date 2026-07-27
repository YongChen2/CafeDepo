import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MenuLinks } from "@/components/MenuLinks";
import { OpeningHoursBoard } from "@/components/OpeningHoursBoard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonld";
import { VYDEJ_OBEDU } from "@/lib/opening-hours";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menuPage" });
  return { title: t("title"), description: t("description") };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("menuPage");
  const linksT = await getTranslations("menuLinks");
  const commonT = await getTranslations("common");
  const hoursT = await getTranslations("hours");
  const navT = await getTranslations("nav");

  const categories = [
    { title: t("coffeeTitle"), text: t("coffeeText") },
    { title: t("breakfastTitle"), text: t("breakfastText") },
    { title: t("cakesTitle"), text: t("cakesText") },
    { title: t("lemonadeTitle"), text: t("lemonadeText") },
    { title: t("beerTitle"), text: t("beerText") },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd(
            [
              { name: navT("home"), path: "/" },
              { name: navT("menu"), path: "/menu" },
            ],
            locale,
          ),
        )}
      />

      <div>
        <h1 className="font-display uppercase tracking-tight text-4xl sm:text-6xl">
          {t("title")}
        </h1>
        <p className="font-mono text-sm uppercase tracking-widest opacity-70 mt-2">
          {t("servingLabel")} {VYDEJ_OBEDU.open}—{VYDEJ_OBEDU.close}
        </p>
      </div>

      <ScrollReveal>
        <MenuLinks
          labels={{
            facebookTitle: linksT("facebookTitle"),
            menickaTitle: linksT("menickaTitle"),
            note: linksT("note"),
            newWindow: commonT("newWindowSuffix"),
          }}
        />
      </ScrollReveal>

      <div>
        <h2 className="font-display uppercase text-xl tracking-tight mb-4">
          {t("permanentTitle")}
        </h2>
        <div className="ascii-frame">
          <div className="hairline-grid grid-cols-1 sm:grid-cols-2">
            {categories.map((c) => (
              <div key={c.title} className="bg-bg p-4 font-mono">
                <div className="font-display uppercase text-base tracking-tight">
                  {c.title}
                </div>
                <div className="text-sm opacity-70 mt-1">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display uppercase text-xl tracking-tight mb-4">
          {t("hoursTitle")}
        </h2>
        <OpeningHoursBoard
          labels={{
            title: hoursT("title"),
            mon_fri: hoursT("mon_fri"),
            sat: hoursT("sat"),
            sun: hoursT("sun"),
            closed: hoursT("closed"),
            lunchNote: hoursT("lunchNote"),
            today: hoursT("today"),
          }}
        />
      </div>
    </main>
  );
}
