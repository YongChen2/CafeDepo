"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "depo_cookie_consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(CONSENT_KEY);
}

function getServerSnapshot() {
  return null;
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function rozhodni(volba: "accepted" | "rejected") {
    localStorage.setItem(CONSENT_KEY, volba);
    window.dispatchEvent(new StorageEvent("storage"));
  }

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      className="fixed bottom-0 inset-x-0 z-50 border-t border-fg bg-bg"
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 font-mono text-xs">
        <p className="flex-1">
          {t("text")}{" "}
          <Link href="/cookies" className="link-underline hover:text-accent">
            {t("more")}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => rozhodni("rejected")}
            className="btn-outline bg-bg text-fg border border-fg px-4 py-3 rounded-[2px] uppercase"
          >
            {t("reject")}
          </button>
          <button
            onClick={() => rozhodni("accepted")}
            className="btn-invert bg-fg text-bg px-4 py-3 rounded-[2px] uppercase"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
