"use client";

import { useSyncExternalStore } from "react";
import { SITE } from "@/lib/site";

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

export function MapEmbed({
  className = "",
  labels,
}: {
  className?: string;
  labels: { consentNote: string; consentCta: string };
}) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const mapsQuery = encodeURIComponent(
    `${SITE.streetAddress}, ${SITE.postalCode} ${SITE.addressLocality}`,
  );

  if (consent !== "accepted") {
    return (
      <div
        className={`card-frame bg-bg-alt flex flex-col items-center justify-center gap-3 p-6 text-center font-mono text-xs ${className}`}
      >
        <p className="text-muted">{labels.consentNote}</p>
        <button
          onClick={() => {
            localStorage.setItem(CONSENT_KEY, "accepted");
            window.dispatchEvent(new StorageEvent("storage"));
          }}
          className="btn-invert bg-fg text-bg uppercase px-4 py-3 rounded-[2px]"
        >
          {labels.consentCta}
        </button>
      </div>
    );
  }

  return (
    <iframe
      title="Mapa — CAFE DEPO, Nádražní 1118, Turnov"
      src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`card-frame w-full border-0 ${className}`}
    />
  );
}
