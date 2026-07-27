import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fg bg-bg mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="font-display uppercase text-sm mb-2">CAFE DEPO</div>
            <div className="opacity-70">Nádražní 1118</div>
            <div className="opacity-70">511 01 Turnov</div>
          </div>
          <div>
            <div className="uppercase opacity-60 mb-2">{c("phoneTitle")}</div>
            <a href="tel:+420776620290" className="link-underline hover:text-accent">
              776 620 290
            </a>
            <div className="uppercase opacity-60 mt-3 mb-2">
              {c("emailTitle")}
            </div>
            <a href="mailto:info@depocafe.cz" className="link-underline hover:text-accent">
              info@depocafe.cz
            </a>
          </div>
          <div>
            <div className="uppercase opacity-60 mb-2">{c("socialTitle")}</div>
            <div className="flex flex-col gap-1">
              <a
                href="https://www.facebook.com/depocafe.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-accent"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/cafedepo_"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-accent"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-fg/20 pt-4 opacity-70">
          <span>
            © {year} CAFE DEPO — {t("rights")}
          </span>
          <div className="flex flex-wrap gap-4 uppercase">
            <Link href="/ochrana-osobnich-udaju" className="link-underline hover:text-accent">
              {t("privacy")}
            </Link>
            <Link href="/cookies" className="link-underline hover:text-accent">
              {t("cookies")}
            </Link>
            <Link href="/obchodni-podminky" className="link-underline hover:text-accent">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
