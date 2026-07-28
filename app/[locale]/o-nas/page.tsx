import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SmartImage } from "@/components/SmartImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const navT = await getTranslations("nav");

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd(
            [
              { name: navT("home"), path: "/" },
              { name: navT("about"), path: "/o-nas" },
            ],
            locale,
          ),
        )}
      />

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {t("kicker")}
        </p>
        <h1 className="font-display uppercase tracking-[-0.03em] text-4xl sm:text-6xl mt-2">
          {t("title")}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <SmartImage
          src="/images/exterier/nadrazi-01.webp"
          seed="exterier/nadrazi-01"
          kind="exterier"
          aspect="aspect-[3/2]"
          alt={
            locale === "en"
              ? "Entrance to CAFE DEPO in the former Turnov railway station building, with the illuminated menu board by the door"
              : "Vstup do CAFE DEPO v budově bývalého turnovského nádraží, u dveří tabule s denní nabídkou"
          }
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 512px"
        />
        <div className="flex flex-col gap-4 text-base leading-[1.6]">
          <p className="text-lg">{t("lead")}</p>
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </div>
      </div>

      <ScrollReveal className="card-frame bg-bg p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="w-32 shrink-0">
          <SmartImage
            src="/images/logo/sestry-01.webp"
            seed="logo/sestry-01"
            kind="logo"
            aspect="aspect-square"
            label="logo/sestry-01.webp — Pavla Linková & Eliška Konejlová"
            alt={
              locale === "en"
                ? "Sisters Pavla Linková and Eliška Konejlová"
                : "Sestry Pavla Linková a Eliška Konejlová"
            }
            sizes="128px"
          />
        </div>
        <div>
          <h2 className="font-display uppercase text-lg">
            {t("ownersTitle")}
          </h2>
          <p className="text-sm mt-1 leading-[1.6]">{t("ownersText")}</p>
        </div>
      </ScrollReveal>
    </main>
  );
}
