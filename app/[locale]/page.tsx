import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OpeningHoursBoard } from "@/components/OpeningHoursBoard";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { nactiMenu } from "@/lib/menu-store";
import { najdiDnesniDen, jeAktualniTyden, formatCena } from "@/lib/menu-utils";
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
  const menuT = await getTranslations("menuPage");

  const menu = await nactiMenu();
  const aktualni = jeAktualniTyden(menu);
  const dnesniDen = aktualni ? najdiDnesniDen(menu) : null;

  const mapsQuery = encodeURIComponent(
    `${SITE.streetAddress}, ${SITE.postalCode} ${SITE.addressLocality}`,
  );

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="border-b border-fg">
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-12 flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">
            {t("heroKicker")}
          </p>
          <h1
            className="font-display uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(4.5rem, 18vw, 13rem)" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="font-mono text-base sm:text-lg max-w-xl opacity-80">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/menu"
              className="bg-fg text-bg font-display uppercase px-6 py-4 tracking-tight"
            >
              {t("heroCtaMenu")}
            </Link>
            <Link
              href="/kontakt"
              className="border border-fg font-display uppercase px-6 py-4 tracking-tight hover:bg-fg hover:text-bg"
            >
              {t("heroCtaContact")}
            </Link>
          </div>
        </div>
      </section>

      {/* ODJEZDOVÁ TABULE + DNEŠNÍ MENU */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div>
          <h2 className="font-display uppercase text-2xl tracking-tight mb-4">
            {t("boardTitle")}
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

        <div>
          <h2 className="font-display uppercase text-2xl tracking-tight mb-4">
            {t("todayMenuTitle")}
          </h2>
          <div className="ascii-frame">
            <div className="p-4 bg-fg text-bg flex items-center justify-between font-mono text-xs uppercase">
              <span>{menuT("kicker")}</span>
              <span className="tabular-nums">
                {menu.platnostOd} — {menu.platnostDo}
              </span>
            </div>
            <div className="p-4 font-mono text-sm flex flex-col gap-4">
              {dnesniDen ? (
                <>
                  <div>
                    <div className="uppercase opacity-60 text-xs mb-1">
                      {menuT("soup")}
                    </div>
                    {dnesniDen.polevka ? (
                      <div className="flex justify-between gap-2">
                        <span>{dnesniDen.polevka.nazev}</span>
                        <span className="tabular-nums opacity-70 shrink-0">
                          {formatCena(dnesniDen.polevka.cena)}
                        </span>
                      </div>
                    ) : (
                      <span className="opacity-40">—</span>
                    )}
                  </div>
                  <div>
                    <div className="uppercase opacity-60 text-xs mb-1">
                      {menuT("mains")}
                    </div>
                    <div className="flex flex-col gap-2">
                      {dnesniDen.hlavni.map((j) => (
                        <div key={j.id} className="flex justify-between gap-2">
                          <span>{j.nazev}</span>
                          <span className="tabular-nums opacity-70 shrink-0">
                            {formatCena(j.cena)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="opacity-60">{menuT("noMenuText")}</p>
              )}
              <Link
                href="/menu"
                className="text-accent uppercase text-xs pt-2 inline-block"
              >
                {t("todayMenuCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SNÍDANĚ / KÁVA / DORTY */}
      <section className="border-y border-fg bg-fg text-bg">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="font-display uppercase text-2xl tracking-tight mb-8">
            {t("sectionsTitle")}
          </h2>
          <div className="hairline-grid grid-cols-1 sm:grid-cols-3 bg-bg">
            {[
              { title: t("breakfastTitle"), text: t("breakfastText") },
              { title: t("coffeeTitle"), text: t("coffeeText") },
              { title: t("cakeTitle"), text: t("cakeText") },
            ].map((s) => (
              <div key={s.title} className="bg-fg text-bg p-6 flex flex-col gap-3">
                <h3 className="font-display uppercase text-xl tracking-tight">
                  {s.title}
                </h3>
                <p className="font-mono text-sm opacity-80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="max-w-5xl mx-auto px-4 py-12 w-full">
        <h2 className="font-display uppercase text-2xl tracking-tight mb-6">
          {t("galleryTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          <PlaceholderImage label="interier/sal-01.webp — hlavní sál" />
          <PlaceholderImage label="interier/bar-01.webp — barový pult" />
          <PlaceholderImage label="interier/detail-01.webp — detail / dekor" />
          <PlaceholderImage label="exterier/terasa-01.webp — venkovní terasa" />
        </div>
      </section>

      {/* SALONEK */}
      <section className="border-t border-fg">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <PlaceholderImage
            label="interier/salonek-01.webp — salonek v patře"
            aspect="aspect-[3/2]"
          />
          <div className="flex flex-col gap-4">
            <h2 className="font-display uppercase text-2xl tracking-tight">
              {t("loungeTitle")}
            </h2>
            <p className="font-mono text-sm opacity-80">{t("loungeText")}</p>
            <Link
              href="/kontakt"
              className="bg-fg text-bg font-display uppercase px-6 py-4 tracking-tight self-start"
            >
              {t("loungeCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* MAPA / KONTAKT */}
      <section className="border-t border-fg bg-bg-alt">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="font-display uppercase text-2xl tracking-tight mb-6">
            {t("mapTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="ascii-frame p-6 font-mono text-sm flex flex-col gap-2 bg-bg">
              <span className="font-display uppercase text-lg">CAFE DEPO</span>
              <span>{SITE.streetAddress}</span>
              <span>
                {SITE.postalCode} {SITE.addressLocality}
              </span>
              <a href={`tel:+420${SITE.phone}`} className="hover:text-accent">
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                {SITE.email}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent uppercase text-xs pt-2"
              >
                {t("mapTitle")} →
              </a>
            </div>
            <PlaceholderImage
              label="mapa — statický snímek okolí nádraží"
              aspect="aspect-[4/3]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
