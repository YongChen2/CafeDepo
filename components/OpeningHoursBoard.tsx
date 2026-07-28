import { OTEVIRACI_DOBA, VYDEJ_OBEDU, dnesniIndex } from "@/lib/opening-hours";
import { SplitFlap } from "@/components/SplitFlap";

export function OpeningHoursBoard({
  labels,
  splitFlap = false,
}: {
  labels: {
    title: string;
    lunchNote: string;
    today: string;
  };
  splitFlap?: boolean;
}) {
  const dnes = dnesniIndex();

  return (
    <div className="ascii-frame">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 p-3 border-b border-fg bg-fg text-bg">
        <span className="font-semibold uppercase text-sm">{labels.title}</span>
        <span className="font-mono text-xs tabular-nums">001—007</span>
      </div>

      <div className="hairline-grid grid-cols-1">
        {OTEVIRACI_DOBA.map((radek, i) => {
          const jeDnes = i === dnes;
          const cas = `${radek.open}—${radek.close}`;
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
              <span className="w-24 shrink-0 font-mono uppercase">
                {radek.den}
              </span>
              {splitFlap ? (
                <SplitFlap
                  text={cas}
                  seed={`hours-${radek.den}`}
                  className="tabular-nums"
                />
              ) : (
                <span className="tabular-nums">{cas}</span>
              )}
              {jeDnes && (
                <span className="ml-3 flex items-center gap-1.5 uppercase text-xs border border-bg px-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {labels.today}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3 font-mono text-xs border-t border-fg bg-bg text-muted">
        {labels.lunchNote} ({VYDEJ_OBEDU.open}—{VYDEJ_OBEDU.close})
      </div>
    </div>
  );
}
