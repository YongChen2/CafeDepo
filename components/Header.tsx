import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitch } from "@/components/LanguageSwitch";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="border-b border-fg bg-bg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Logo className="text-2xl" />
        <nav
          aria-label={t("ariaLabel")}
          className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm uppercase"
        >
          <Link href="/" className="hover:text-accent">
            {t("home")}
          </Link>
          <Link href="/menu" className="hover:text-accent">
            {t("menu")}
          </Link>
          <Link href="/o-nas" className="hover:text-accent">
            {t("about")}
          </Link>
          <Link href="/kontakt" className="hover:text-accent">
            {t("contact")}
          </Link>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
