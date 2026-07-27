import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest opacity-60">
          {t("kicker")}
        </p>
        <h1 className="font-display uppercase tracking-tight text-4xl sm:text-6xl mt-2">
          {t("title")}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[3/2] photo-industrial">
          <Image
            src="/images/exterier/nadrazi-01.webp"
            alt={
              locale === "en"
                ? "Entrance to CAFE DEPO in the former Turnov railway station building, with the illuminated menu board by the door"
                : "Vstup do CAFE DEPO v budově bývalého turnovského nádraží, u dveří tabule s denní nabídkou"
            }
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 512px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 font-mono text-base">
          <p className="text-lg">{t("lead")}</p>
          <p className="opacity-80">{t("body1")}</p>
          <p className="opacity-80">{t("body2")}</p>
        </div>
      </div>

      <div className="ascii-frame p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <PlaceholderImage
          label="logo/sestry-01.webp — Pavla Linková & Eliška Konejlová"
          aspect="aspect-square"
          className="w-32 shrink-0"
        />
        <div>
          <h2 className="font-display uppercase text-lg tracking-tight">
            {t("ownersTitle")}
          </h2>
          <p className="font-mono text-sm opacity-80 mt-1">{t("ownersText")}</p>
        </div>
      </div>
    </main>
  );
}
