"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitch() {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("languageSwitch")}
      className="flex items-center gap-1 font-mono text-xs uppercase"
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && (
            <span className="text-muted" aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === activeLocale ? "true" : undefined}
            className={
              loc === activeLocale
                ? "text-accent"
                : "text-muted hover:text-fg transition-colors duration-300 ease-in-out"
            }
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
