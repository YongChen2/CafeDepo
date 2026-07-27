import type { DenZkratka, TydenniMenu } from "@/lib/types";
import { formatCena, formatDatumCz } from "@/lib/menu-utils";
import { SplitFlap } from "@/components/SplitFlap";

export type MenuTableLabels = {
  soup: string;
  mains: string;
  allergens: string;
  price: string;
  note: string;
  onRequest: string;
  days: Record<DenZkratka, string>;
};

export function MenuTable({
  menu,
  labels,
  todayISO,
}: {
  menu: TydenniMenu;
  labels: MenuTableLabels;
  todayISO?: string;
}) {
  return (
    <div className="ascii-frame">
      <div className="hairline-grid grid-cols-1 md:grid-cols-5">
        {menu.dny.map((den) => {
          const jeDnes = todayISO !== undefined && den.datum === todayISO;
          return (
            <div
              key={den.den}
              className={
                jeDnes
                  ? "bg-fg text-bg flex flex-col border-t-4 border-accent"
                  : "bg-bg text-fg flex flex-col"
              }
            >
              <div className="p-3 font-display uppercase text-sm tracking-tight border-b border-fg/20">
                <div className="flex items-center gap-2">
                  <SplitFlap
                    text={labels.days[den.den]}
                    seed={`menu-day-${den.den}`}
                  />
                  {jeDnes && (
                    <span
                      className="w-1.5 h-1.5 bg-accent blink-square shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="font-mono text-xs opacity-70 tabular-nums">
                  {formatDatumCz(den.datum)}
                </div>
              </div>

              <div className="p-3 font-mono text-xs flex flex-col gap-3 flex-1">
                <div>
                  <div className="uppercase opacity-60 mb-1">{labels.soup}</div>
                  {den.polevka ? (
                    <div>
                      <div>{den.polevka.nazev}</div>
                      <div className="opacity-60">
                        {labels.allergens}: {den.polevka.alergeny || "—"} ·{" "}
                        {formatCena(den.polevka.cena)}
                      </div>
                    </div>
                  ) : (
                    <div className="opacity-40">—</div>
                  )}
                </div>

                <div>
                  <div className="uppercase opacity-60 mb-1">{labels.mains}</div>
                  <div className="flex flex-col gap-2">
                    {den.hlavni.length === 0 && (
                      <div className="opacity-40">—</div>
                    )}
                    {den.hlavni.map((jidlo) => (
                      <div key={jidlo.id}>
                        <div>{jidlo.nazev}</div>
                        <div className="opacity-60">
                          {labels.allergens}: {jidlo.alergeny || "—"} ·{" "}
                          {formatCena(jidlo.cena)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {menu.poznamka && (
        <div className="border-t border-fg font-mono text-xs p-3 bg-bg">
          <span className="uppercase opacity-60">{labels.note}: </span>
          {menu.poznamka}
        </div>
      )}
    </div>
  );
}
