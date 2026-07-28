import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { OpeningHoursBoard } from "@/components/OpeningHoursBoard";
import { SmartImage } from "@/components/SmartImage";
import { MapEmbed } from "@/components/MapEmbed";
import { MenuLinks } from "@/components/MenuLinks";
import { Ticker } from "@/components/Ticker";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SITE } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const hoursT = await getTranslations("hours");
  const linksT = await getTranslations("menuLinks");
  const commonT = await getTranslations("common");
  const contactT = await getTranslations("contact");

  const mapsQuery = encodeURIComponent(
    `${SITE.streetAddress}, ${SITE.postalCode} ${SITE.addressLocality}`,
  );

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative border-b border-fg overflow-hidden">
        <BackgroundPattern kind="rays" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-16 pb-12 flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("heroKicker")}
          </p>
          <h1
            className="font-display uppercase leading-[0.85] tracking-[-0.03em]"
            style={{ fontSize: "clamp(4.5rem, 18vw, 13rem)" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="text-base sm:text-lg max-w-xl leading-[1.6]">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/menu"
              className="btn-invert bg-fg text-bg font-semibold uppercase px-6 py-4 rounded-[2px]"
            >
              {t("heroCtaMenu")}
            </Link>
            <Link
              href="/kontakt"
              className="btn-outline bg-bg text-fg border border-fg font-semibold uppercase px-6 py-4 rounded-[2px]"
            >
              {t("heroCtaContact")}
            </Link>
          </div>
        </div>
      </section>

      <Ticker text="SNÍDANĚ /// 15 DRUHŮ KÁVY /// DOMÁCÍ DORTY /// POLEDNÍ MENU 11:00–14:45 /// TERASA /// SALONEK V PATŘE ///" />

      {/* ODJEZDOVÁ TABULE + DNEŠNÍ MENU */}
      <ScrollReveal className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div>
          <h2 className="font-display uppercase text-2xl mb-4">
            {t("boardTitle")}
          </h2>
          <OpeningHoursBoard
            splitFlap
            labels={{
              title: hoursT("title"),
              lunchNote: hoursT("lunchNote"),
              today: hoursT("today"),
            }}
          />
        </div>

        <div>
          <h2 className="font-display uppercase text-2xl mb-4">
            {t("todayMenuTitle")}
          </h2>
          <MenuLinks
            compact
            labels={{
              facebookTitle: linksT("facebookTitle"),
              menickaTitle: linksT("menickaTitle"),
              note: linksT("note"),
              newWindow: commonT("newWindowSuffix"),
            }}
          />
        </div>
      </ScrollReveal>

      {/* SNÍDANĚ / KÁVA / DORTY */}
      <section className="relative border-y border-fg bg-bg-alt overflow-hidden">
        <BackgroundPattern kind="halftone" />
        <ScrollReveal className="relative z-10 max-w-5xl mx-auto px-4 py-16">
          <h2 className="font-display uppercase text-2xl mb-8">
            {t("sectionsTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: t("breakfastTitle"),
                text: t("breakfastText"),
                src: "/images/jidlo/snidane-01.webp",
                seed: "jidlo/snidane-01",
                kind: "jidlo" as const,
                alt:
                  locale === "en"
                    ? "Hearty breakfast at CAFE DEPO"
                    : "Vydatná snídaně v CAFE DEPO",
              },
              {
                title: t("coffeeTitle"),
                text: t("coffeeText"),
                src: "/images/jidlo/kava-01.webp",
                seed: "jidlo/kava-01",
                kind: "kava" as const,
                alt:
                  locale === "en"
                    ? "One of 15 kinds of coffee at CAFE DEPO"
                    : "Jeden z 15 druhů kávy v CAFE DEPO",
              },
              {
                title: t("cakeTitle"),
                text: t("cakeText"),
                src: "/images/jidlo/dort-01.webp",
                seed: "jidlo/dort-01",
                kind: "dort" as const,
                alt:
                  locale === "en"
                    ? "Homemade pastries and cakes on a café table — macarons, tarts and cold drinks"
                    : "Domácí zákusky a dorty na kavárenském stole — makronky, tartaletky a studené nápoje",
              },
            ].map((s) => (
              <div key={s.title} className="card-frame bg-bg flex flex-col gap-3">
                <SmartImage
                  src={s.src}
                  alt={s.alt}
                  kind={s.kind}
                  seed={s.seed}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 341px"
                />
                <div className="p-6 pt-3 flex flex-col gap-3">
                  <h3 className="font-semibold uppercase text-xl">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-[1.6]">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* GALERIE */}
      <ScrollReveal className="max-w-5xl mx-auto px-4 py-16 w-full">
        <h2 className="font-display uppercase text-2xl mb-6">
          {t("galleryTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <SmartImage
            src="/images/interier/sal-01.webp"
            seed="interier/sal-01"
            kind="interier"
            alt={
              locale === "en"
                ? "Main seating area of CAFE DEPO with wooden beams, plants and armchairs"
                : "Hlavní sál kavárny CAFE DEPO s dřevěnými trámy, zelení a křesly"
            }
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 256px"
          />
          <SmartImage
            src="/images/interier/bar-01.webp"
            seed="interier/bar-01"
            kind="interier"
            label="interier/bar-01.webp — barový pult"
            alt={locale === "en" ? "Coffee bar counter" : "Barový pult"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 256px"
          />
          <SmartImage
            src="/images/interier/detail-01.webp"
            seed="interier/detail-01"
            kind="interier"
            label="interier/detail-01.webp — detail / dekor"
            alt={locale === "en" ? "Interior decor detail" : "Detail interiéru / dekor"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 256px"
          />
          <SmartImage
            src="/images/exterier/terasa-01.webp"
            seed="exterier/terasa-01"
            kind="exterier"
            label="exterier/terasa-01.webp — venkovní terasa"
            alt={locale === "en" ? "Outdoor terrace" : "Venkovní terasa"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 256px"
          />
        </div>
      </ScrollReveal>

      {/* SALONEK */}
      <ScrollReveal className="border-t border-fg">
        <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <SmartImage
            src="/images/interier/salonek-01.webp"
            seed="interier/salonek-01"
            kind="interier"
            aspect="aspect-[3/2]"
            label="interier/salonek-01.webp — salonek v patře"
            alt={locale === "en" ? "Upstairs lounge" : "Salonek v patře"}
            sizes="(max-width: 768px) 100vw, 512px"
          />
          <div className="flex flex-col gap-4">
            <h2 className="font-display uppercase text-2xl">
              {t("loungeTitle")}
            </h2>
            <p className="text-sm leading-[1.6]">{t("loungeText")}</p>
            <Link
              href="/kontakt"
              className="btn-invert bg-fg text-bg font-semibold uppercase px-6 py-4 rounded-[2px] self-start"
            >
              {t("loungeCta")}
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* MAPA / KONTAKT */}
      <section className="relative border-t border-fg bg-bg-alt overflow-hidden">
        <BackgroundPattern kind="halftone" />
        <ScrollReveal className="relative z-10 max-w-5xl mx-auto px-4 py-16">
          <h2 className="font-display uppercase text-2xl mb-6">
            {t("mapTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-frame p-6 font-mono text-sm flex flex-col gap-2 bg-bg">
              <span className="font-semibold uppercase text-lg">CAFE DEPO</span>
              <span>{SITE.streetAddress}</span>
              <span>
                {SITE.postalCode} {SITE.addressLocality}
              </span>
              <a href={`tel:+420${SITE.phone}`} className="link-underline hover:text-accent">
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="link-underline hover:text-accent">
                {SITE.email}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("mapTitle")} — ${commonT("newWindowSuffix")}`}
                className="link-underline text-accent uppercase text-xs pt-2"
              >
                {t("mapTitle")} →
              </a>
            </div>
            <MapEmbed
              className="aspect-[4/3]"
              labels={{
                consentNote: contactT("mapConsentNote"),
                consentCta: contactT("mapConsentCta"),
              }}
            />
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
