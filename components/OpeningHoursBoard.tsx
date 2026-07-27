import { OTEVIRACI_DOBA, VYDEJ_OBEDU, dnesniIndex } from "@/lib/opening-hours";

export function OpeningHoursBoard({
  labels,
}: {
  labels: {
    title: string;
    mon_fri: string;
    sat: string;
    sun: string;
    closed: string;
    lunchNote: string;
    today: string;
  };
}) {
  const dnes = dnesniIndex();
  const labelFor = (key: "mon_fri" | "sat" | "sun") => labels[key];

  return (
    <div className="ascii-frame">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 p-3 border-b border-fg bg-fg text-bg">
        <span className="font-display uppercase text-sm tracking-tight">
          {labels.title}
        </span>
        <span className="font-mono text-xs tabular-nums">001—007</span>
      </div>

      <div className="hairline-grid grid-cols-1">
        {OTEVIRACI_DOBA.map((radek, i) => {
          const jeDnes = i === dnes;
          const zavreno = radek.open === null;
          return (
            <div
              key={radek.den}
              className={
                "flex items-center justify-between px-3 py-2 font-mono text-sm " +
                (jeDnes
                  ? "bg-fg text-bg border-l-4 border-accent"
                  : "bg-bg text-fg")
              }
            >
              <span className="w-24 shrink-0 font-display text-base">
                {radek.den}
              </span>
              <span className="flex-1 text-left pl-4 uppercase opacity-80 hidden sm:inline">
                {labelFor(radek.labelKey)}
              </span>
              <span className="tabular-nums">
                {zavreno ? labels.closed : `${radek.open}—${radek.close}`}
              </span>
              {jeDnes && (
                <span className="ml-3 flex items-center gap-1.5 uppercase text-xs border border-bg px-1">
                  <span className="w-1.5 h-1.5 bg-accent" aria-hidden="true" />
                  {labels.today}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3 font-mono text-xs border-t border-fg bg-bg opacity-70">
        {labels.lunchNote} ({VYDEJ_OBEDU.open}—{VYDEJ_OBEDU.close})
      </div>
    </div>
  );
}
