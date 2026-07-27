const FACEBOOK_URL = "https://www.facebook.com/depocafe.cz";
const MENICKA_URL = "https://www.menicka.cz/8771-cafe-depo.html";

export type MenuLinksLabels = {
  facebookTitle: string;
  menickaTitle: string;
  note: string;
  newWindow: string;
};

export function MenuLinks({
  compact = false,
  labels,
}: {
  compact?: boolean;
  labels: MenuLinksLabels;
}) {
  return (
    <div className="ascii-frame flex flex-col">
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.facebookTitle} — ${labels.newWindow}`}
        className={`btn-invert-accent flex items-center justify-between gap-3 bg-fg text-bg font-display uppercase tracking-tight border-b border-bg/20 ${
          compact ? "px-4 py-4 text-lg sm:text-xl" : "px-6 py-6 text-2xl sm:text-3xl"
        }`}
      >
        <span>{labels.facebookTitle}</span>
        <span aria-hidden="true" className="font-mono shrink-0">
          ↗
        </span>
      </a>
      <a
        href={MENICKA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.menickaTitle} — ${labels.newWindow}`}
        className={`link-underline flex items-center justify-between gap-3 font-display uppercase tracking-tight hover:bg-fg hover:text-bg ${
          compact ? "px-4 py-3 text-sm" : "px-6 py-4 text-base sm:text-lg"
        }`}
      >
        <span>{labels.menickaTitle}</span>
        <span aria-hidden="true" className="font-mono text-xs shrink-0">
          ↗
        </span>
      </a>
      <p
        className={`font-mono opacity-70 border-t border-fg/20 ${
          compact ? "text-[11px] px-4 py-2" : "text-xs px-6 py-3"
        }`}
      >
        {labels.note}
      </p>
    </div>
  );
}
