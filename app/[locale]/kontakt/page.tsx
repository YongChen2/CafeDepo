import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { OpeningHoursBoard } from "@/components/OpeningHoursBoard";
import { MapEmbed } from "@/components/MapEmbed";
import { ScrollReveal } from "@/components/ScrollReveal";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("description") };
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
  const commonT = await getTranslations("common");
  const navT = await getTranslations("nav");

  const mapsQuery = encodeURIComponent(
    `${SITE.streetAddress}, ${SITE.postalCode} ${SITE.addressLocality}`,
  );

  return (
    <main className="relative overflow-hidden">
      <BackgroundPattern kind="halftone" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
        <script
          {...jsonLdScriptProps(
            breadcrumbJsonLd(
              [
                { name: navT("home"), path: "/" },
                { name: navT("contact"), path: "/kontakt" },
              ],
              locale,
            ),
          )}
        />

        <h1 className="font-display uppercase tracking-[-0.03em] text-4xl sm:text-6xl">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-frame bg-bg p-6 font-mono text-sm flex flex-col gap-5">
            <div>
              <div className="uppercase text-muted text-xs mb-1">
                {t("addressTitle")}
              </div>
              <div className="text-lg font-semibold normal-case">
                CAFE DEPO
              </div>
              <div>{SITE.streetAddress}</div>
              <div>
                {SITE.postalCode} {SITE.addressLocality}
              </div>
            </div>

            <div>
              <div className="uppercase text-muted text-xs mb-1">
                {t("phoneTitle")}
              </div>
              <a href={`tel:+420${SITE.phone}`} className="link-underline hover:text-accent">
                {SITE.phoneDisplay}
              </a>
            </div>

            <div>
              <div className="uppercase text-muted text-xs mb-1">
                {t("emailTitle")}
              </div>
              <a href={`mailto:${SITE.email}`} className="link-underline hover:text-accent">
                {SITE.email}
              </a>
            </div>

            <div>
              <div className="uppercase text-muted text-xs mb-1">
                {t("socialTitle")}
              </div>
              <div className="flex flex-col gap-1">
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook — ${commonT("newWindowSuffix")}`}
                  className="link-underline hover:text-accent"
                >
                  Facebook — depocafe.cz
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram — ${commonT("newWindowSuffix")}`}
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
              aria-label={`${t("mapTitle")} — ${commonT("newWindowSuffix")}`}
              className="btn-invert bg-fg text-bg uppercase text-xs px-4 py-3 rounded-[2px] self-start"
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

        <div className="card-frame bg-bg p-6 flex flex-col gap-3">
          <h2 className="font-display uppercase text-xl">
            {t("loungeTitle")}
          </h2>
          <p className="text-sm leading-[1.6]">{t("loungeText")}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm pt-1">
            <a href={`tel:+420${SITE.phone}`} className="link-underline hover:text-accent">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="link-underline hover:text-accent">
              {SITE.email}
            </a>
          </div>
        </div>

        <ScrollReveal>
          <h2 className="font-display uppercase text-2xl mb-4">
            {t("hoursTitle")}
          </h2>
          <OpeningHoursBoard
            labels={{
              title: hoursT("title"),
              lunchNote: hoursT("lunchNote"),
              today: hoursT("today"),
            }}
          />
        </ScrollReveal>
      </div>
    </main>
  );
}
