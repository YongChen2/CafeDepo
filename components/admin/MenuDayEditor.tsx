import type { Den, Jidlo } from "@/lib/types";

const DEN_LABEL: Record<string, string> = {
  PO: "PONDĚLÍ",
  UT: "ÚTERÝ",
  ST: "STŘEDA",
  CT: "ČTVRTEK",
  PA: "PÁTEK",
};

export { DEN_LABEL };

export function MenuDayEditor({
  den,
  onZmenPolevku,
  onPridejHlavni,
  onOdeberHlavni,
  onZmenHlavni,
}: {
  den: Den;
  onZmenPolevku: (zmena: Partial<Jidlo>) => void;
  onPridejHlavni: () => void;
  onOdeberHlavni: (jidloId: string) => void;
  onZmenHlavni: (jidloId: string, zmena: Partial<Jidlo>) => void;
}) {
  return (
    <section className="ascii-frame p-4 flex flex-col gap-4">
      <h2 className="font-display uppercase text-lg tracking-tight">
        {DEN_LABEL[den.den]}{" "}
        <span className="font-mono text-xs opacity-60 tabular-nums">
          {den.datum}
        </span>
      </h2>

      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase opacity-70">Polévka</span>
        <input
          placeholder="Název polévky"
          value={den.polevka?.nazev ?? ""}
          onChange={(e) => onZmenPolevku({ nazev: e.target.value })}
          className="ascii-frame bg-bg px-3 py-3 text-base outline-none focus:border-accent"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="Alergeny (např. 1,3,7)"
            value={den.polevka?.alergeny ?? ""}
            onChange={(e) => onZmenPolevku({ alergeny: e.target.value })}
            className="ascii-frame bg-bg px-3 py-3 text-base outline-none focus:border-accent"
          />
          <input
            type="number"
            placeholder="Cena Kč"
            value={den.polevka?.cena ?? ""}
            onChange={(e) =>
              onZmenPolevku({
                cena: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className="ascii-frame bg-bg px-3 py-3 text-base outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase opacity-70">Hlavní jídla</span>
        {den.hlavni.map((jidlo) => (
          <div key={jidlo.id} className="ascii-frame p-3 flex flex-col gap-2">
            <input
              placeholder="Název jídla"
              value={jidlo.nazev}
              onChange={(e) => onZmenHlavni(jidlo.id, { nazev: e.target.value })}
              className="bg-bg px-3 py-3 text-base outline-none border-b border-fg/20 focus:border-accent"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Alergeny"
                value={jidlo.alergeny}
                onChange={(e) =>
                  onZmenHlavni(jidlo.id, { alergeny: e.target.value })
                }
                className="bg-bg px-3 py-3 text-base outline-none border-b border-fg/20 focus:border-accent"
              />
              <input
                type="number"
                placeholder="Cena Kč"
                value={jidlo.cena ?? ""}
                onChange={(e) =>
                  onZmenHlavni(jidlo.id, {
                    cena: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className="bg-bg px-3 py-3 text-base outline-none border-b border-fg/20 focus:border-accent"
              />
            </div>
            <button
              onClick={() => onOdeberHlavni(jidlo.id)}
              className="text-accent text-xs uppercase text-left"
            >
              Odebrat jídlo
            </button>
          </div>
        ))}
        <button
          onClick={onPridejHlavni}
          className="border border-fg uppercase text-sm py-4"
        >
          + Přidat hlavní jídlo
        </button>
      </div>
    </section>
  );
}
