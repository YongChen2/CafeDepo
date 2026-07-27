"use client";

import { useEffect, useState } from "react";
import type { Den, Jidlo, TydenniMenu } from "@/lib/types";
import { prazdnyJidlo } from "@/lib/types";
import { MenuTable } from "@/components/MenuTable";
import { dnesniDatum } from "@/lib/menu-utils";
import { vychoziDemoMenu, DEMO_STORAGE_KEY } from "@/lib/demo-menu";
import { MenuDayEditor, DEN_LABEL } from "@/components/admin/MenuDayEditor";
import { DemoBanner } from "@/components/admin/DemoBanner";

// Sandbox: data žijí POUZE v sessionStorage prohlížeče. Tato komponenta
// nikdy nevolá /api/menu ani jinou síťovou cestu — je to čistě lokální
// hřiště pro vyzkoušení administrace bez rizika změny ostrého menu.
export function DemoEditor() {
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState<TydenniMenu>(() => vychoziDemoMenu());
  const [ulozeno, setUlozeno] = useState(false);

  useEffect(() => {
    // sessionStorage je dostupný až po mountu (SSR ho nemá) — čtení musí
    // proběhnout v efektu, aby první klientský render seděl s tím serverovým.
    const ulozene = sessionStorage.getItem(DEMO_STORAGE_KEY);
    if (ulozene) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMenu(JSON.parse(ulozene));
      } catch {
        // poškozená data v sessionStorage — ponech výchozí demo menu
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(menu));
  }, [menu, mounted]);

  function upravDen(index: number, zmena: Partial<Den>) {
    const dny = [...menu.dny];
    dny[index] = { ...dny[index], ...zmena };
    setMenu({ ...menu, dny });
    setUlozeno(false);
  }

  function pridejHlavni(index: number) {
    const den = menu.dny[index];
    upravDen(index, { hlavni: [...den.hlavni, prazdnyJidlo()] });
  }

  function odeberHlavni(index: number, jidloId: string) {
    const den = menu.dny[index];
    upravDen(index, { hlavni: den.hlavni.filter((j) => j.id !== jidloId) });
  }

  function upravHlavni(index: number, jidloId: string, zmena: Partial<Jidlo>) {
    const den = menu.dny[index];
    upravDen(index, {
      hlavni: den.hlavni.map((j) => (j.id === jidloId ? { ...j, ...zmena } : j)),
    });
  }

  function upravPolevku(index: number, zmena: Partial<Jidlo>) {
    const den = menu.dny[index];
    const polevka = den.polevka ?? prazdnyJidlo();
    upravDen(index, { polevka: { ...polevka, ...zmena } });
  }

  function resetujDemo() {
    const cerstve = vychoziDemoMenu();
    setMenu(cerstve);
    setUlozeno(false);
  }

  function ulozitLokalne() {
    sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(menu));
    setUlozeno(true);
  }

  if (!mounted) {
    return (
      <>
        <DemoBanner />
        <main className="min-h-screen p-3 sm:p-6 max-w-2xl mx-auto">
          <p className="font-mono text-sm opacity-60 pt-10">Načítám demo…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <DemoBanner />
      <main className="min-h-screen p-3 sm:p-6 flex flex-col gap-6 max-w-2xl mx-auto pb-24">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl uppercase tracking-tight">
              DEPO — DEMO
            </h1>
            <p className="text-xs uppercase opacity-60">
              Vyzkoušejte si administraci bez rizika
            </p>
          </div>
          <button
            onClick={resetujDemo}
            className="text-xs uppercase border border-fg px-3 py-2"
          >
            Resetovat demo
          </button>
        </header>

        <div className="font-mono text-xs opacity-70 tabular-nums">
          Platnost: {menu.platnostOd} — {menu.platnostDo}
        </div>

        {menu.dny.map((den, index) => (
          <MenuDayEditor
            key={den.den}
            den={den}
            onZmenPolevku={(zmena) => upravPolevku(index, zmena)}
            onPridejHlavni={() => pridejHlavni(index)}
            onOdeberHlavni={(jidloId) => odeberHlavni(index, jidloId)}
            onZmenHlavni={(jidloId, zmena) => upravHlavni(index, jidloId, zmena)}
          />
        ))}

        <section className="ascii-frame p-4 flex flex-col gap-2">
          <span className="text-xs uppercase opacity-70">
            Poznámka k celému týdnu
          </span>
          <textarea
            value={menu.poznamka}
            onChange={(e) => {
              setMenu({ ...menu, poznamka: e.target.value });
              setUlozeno(false);
            }}
            rows={3}
            className="ascii-frame bg-bg px-3 py-3 text-base outline-none focus:border-accent"
          />
        </section>

        <button
          onClick={ulozitLokalne}
          className="sticky bottom-3 bg-accent text-bg font-display uppercase text-xl py-5 tracking-tight"
        >
          Uložit menu (demo)
        </button>

        {ulozeno && (
          <section className="flex flex-col gap-3">
            <p className="bg-fg text-bg font-display uppercase text-sm p-3">
              Uloženo v prohlížeči (demo). Takto by to vypadalo na webu:
            </p>
            <MenuTable
              menu={menu}
              todayISO={dnesniDatum()}
              labels={{
                soup: "Polévka",
                mains: "Hlavní jídla",
                allergens: "Alergeny",
                price: "Cena",
                note: "Poznámka",
                onRequest: "na vyžádání u obsluhy",
                days: DEN_LABEL as Record<Den["den"], string>,
              }}
            />
          </section>
        )}
      </main>
    </>
  );
}
