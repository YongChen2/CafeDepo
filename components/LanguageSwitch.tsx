"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function LanguageSwitch() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div className="flex items-center gap-1 font-mono text-xs uppercase">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={pathname}
            locale={loc}
            className={
              loc === activeLocale
                ? "text-accent"
                : "opacity-60 hover:opacity-100"
            }
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
