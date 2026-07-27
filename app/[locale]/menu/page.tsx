import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MenuTable } from "@/components/MenuTable";
import { ScrollReveal } from "@/components/ScrollReveal";
import { nactiMenu } from "@/lib/menu-store";
import { dnesniDatum, jeMenuProsle } from "@/lib/menu-utils";
import type { DenZkratka } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menuPage" });
  return { title: t("title") };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("menuPage");
  const daysT = await getTranslations("days");

  const menu = await nactiMenu();
  const prosle = jeMenuProsle(menu);

  const days: Record<DenZkratka, string> = {
    PO: daysT("PO"),
    UT: daysT("UT"),
    ST: daysT("ST"),
    CT: daysT("CT"),
    PA: daysT("PA"),
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest opacity-60">
          {t("kicker")}: {menu.platnostOd} — {menu.platnostDo}
        </p>
        <h1 className="font-display uppercase tracking-tight text-4xl sm:text-6xl mt-2">
          {t("title")}
        </h1>
        <p className="font-mono text-sm opacity-70 mt-2">{t("lunchServing")}</p>
      </div>

      {prosle ? (
        <div className="ascii-frame p-8 text-center flex flex-col gap-2">
          <p className="font-display uppercase text-2xl tracking-tight text-accent">
            {t("noMenu")}
          </p>
          <p className="font-mono text-sm opacity-70">{t("noMenuText")}</p>
        </div>
      ) : (
        <ScrollReveal>
          <MenuTable
            menu={menu}
            todayISO={dnesniDatum()}
            labels={{
              soup: t("soup"),
              mains: t("mains"),
              allergens: t("allergens"),
              price: t("price"),
              note: t("note"),
              onRequest: t("onRequest"),
              days,
            }}
          />
        </ScrollReveal>
      )}

      <div className="ascii-frame p-6">
        <h2 className="font-display uppercase text-xl tracking-tight mb-2">
          {t("permanentTitle")}
        </h2>
        <p className="font-mono text-sm opacity-80">{t("permanentText")}</p>
      </div>

      <p className="font-mono text-xs opacity-50">
        {t("updated")}: {new Date(menu.aktualizovano).toLocaleString(locale)}
      </p>
    </main>
  );
}
