import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { archivoBlack, inter, jetbrainsMono } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { cafeJsonLd, jsonLdScriptProps } from "@/lib/jsonld";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${t("siteName")} — ${SITE.addressLocality}`,
      template: `%s — ${t("siteName")}`,
    },
    description: t("description"),
    alternates: {
      languages: {
        cs: "/",
        en: "/en",
      },
    },
    openGraph: {
      siteName: t("siteName"),
      type: "website",
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      className={`${archivoBlack.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-fg font-sans antialiased">
        <script {...jsonLdScriptProps(cafeJsonLd())} />
        <NextIntlClientProvider messages={messages} timeZone="Europe/Prague">
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-[1000] focus-visible:bg-fg focus-visible:text-bg focus-visible:px-4 focus-visible:py-3 focus-visible:rounded-[2px] focus-visible:font-mono focus-visible:uppercase focus-visible:text-xs"
          >
            {t("skipLink")}
          </a>
          <Header />
          <div id="main-content" className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
