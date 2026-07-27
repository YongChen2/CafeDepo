import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OpeningHoursBoard } from "@/components/OpeningHoursBoard";
import { MapEmbed } from "@/components/MapEmbed";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const hoursT = await getTranslations("hours");

  const mapsQuery = encodeURIComponent(
    `${SITE.streetAddress}, ${SITE.postalCode} ${SITE.addressLocality}`,
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
      <h1 className="font-display uppercase tracking-tight text-4xl sm:text-6xl">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="ascii-frame p-6 font-mono text-sm flex flex-col gap-5">
          <div>
            <div className="uppercase opacity-50 text-xs mb-1">
              {t("addressTitle")}
            </div>
            <div className="text-lg font-display normal-case tracking-tight">
              CAFE DEPO
            </div>
            <div>{SITE.streetAddress}</div>
            <div>
              {SITE.postalCode} {SITE.addressLocality}
            </div>
          </div>

          <div>
            <div className="uppercase opacity-50 text-xs mb-1">
              {t("phoneTitle")}
            </div>
            <a href={`tel:+420${SITE.phone}`} className="link-underline hover:text-accent">
              {SITE.phoneDisplay}
            </a>
          </div>

          <div>
            <div className="uppercase opacity-50 text-xs mb-1">
              {t("emailTitle")}
            </div>
            <a href={`mailto:${SITE.email}`} className="link-underline hover:text-accent">
              {SITE.email}
            </a>
          </div>

          <div>
            <div className="uppercase opacity-50 text-xs mb-1">
              {t("socialTitle")}
            </div>
            <div className="flex flex-col gap-1">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-accent"
              >
                Facebook — depocafe.cz
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-accent"
              >
                Instagram — @cafedepo_
              </a>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-invert bg-fg text-bg uppercase text-xs px-4 py-3 self-start"
          >
            {t("mapTitle")} →
          </a>
        </div>

        <MapEmbed
          className="aspect-[4/3]"
          labels={{
            consentNote: t("mapConsentNote"),
            consentCta: t("mapConsentCta"),
          }}
        />
      </div>

      <ScrollReveal>
        <h2 className="font-display uppercase text-2xl tracking-tight mb-4">
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
      </ScrollReveal>
    </main>
  );
}
