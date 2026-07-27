"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Den, Jidlo, TydenniMenu } from "@/lib/types";
import { prazdnyJidlo } from "@/lib/types";
import { MenuTable } from "@/components/MenuTable";
import { dnesniDatum } from "@/lib/menu-utils";
import { MenuDayEditor, DEN_LABEL } from "@/components/admin/MenuDayEditor";

function pondeliTydne(offsetTydnu: number): string {
  const dnes = new Date();
  const den = dnes.getDay(); // 0 = neděle
  const diffNaPondeli = den === 0 ? -6 : 1 - den;
  const pondeli = new Date(dnes);
  pondeli.setDate(dnes.getDate() + diffNaPondeli + offsetTydnu * 7);
  return pondeli.toISOString().slice(0, 10);
}

function prepocitejDny(dny: Den[], noveOd: string): { dny: Den[]; do: string } {
  const start = new Date(noveOd + "T00:00:00");
  const noveDny = dny.map((den, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return { ...den, datum: d.toISOString().slice(0, 10) };
  });
  const konec = new Date(start);
  konec.setDate(start.getDate() + 4);
  return { dny: noveDny, do: konec.toISOString().slice(0, 10) };
}

export function AdminEditor({ initialMenu }: { initialMenu: TydenniMenu }) {
  const router = useRouter();
  const [menu, setMenu] = useState<TydenniMenu>(initialMenu);
  const [ukladam, setUkladam] = useState(false);
  const [chyba, setChyba] = useState<string | null>(null);
  const [ulozeno, setUlozeno] = useState(false);
  const [kopiruji, setKopiruji] = useState(false);

  function nastavTyden(offset: number) {
    const noveOd = pondeliTydne(offset);
    const { dny, do: noveDo } = prepocitejDny(menu.dny, noveOd);
    setMenu({ ...menu, platnostOd: noveOd, platnostDo: noveDo, dny });
    setUlozeno(false);
  }

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

  async function kopirujMinulyTyden() {
    setKopiruji(true);
    setChyba(null);
    try {
      const res = await fetch("/api/menu", { cache: "no-store" });
      const predchozi: TydenniMenu = await res.json();
      const dny = menu.dny.map((den, i) => ({
        ...den,
        polevka: predchozi.dny[i]?.polevka ?? null,
        hlavni: predchozi.dny[i]?.hlavni ?? [],
      }));
      setMenu({ ...menu, dny, poznamka: predchozi.poznamka || menu.poznamka });
      setUlozeno(false);
    } catch {
      setChyba("Nepodařilo se načíst minulé menu.");
    } finally {
      setKopiruji(false);
    }
  }

  async function ulozit() {
    setUkladam(true);
    setChyba(null);
    setUlozeno(false);
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setChyba(data.error ?? "Uložení se nezdařilo.");
        return;
      }
      const data = await res.json();
      setMenu(data.menu);
      setUlozeno(true);
    } catch {
      setChyba("Uložení se nezdařilo. Zkontrolujte připojení.");
    } finally {
      setUkladam(false);
    }
  }

  async function odhlasit() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <main className="min-h-screen p-3 sm:p-6 flex flex-col gap-6 max-w-2xl mx-auto pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-tight">DEPO</h1>
          <p className="text-xs uppercase opacity-60">Administrace menu</p>
        </div>
        <button
          onClick={odhlasit}
          className="text-xs uppercase border border-fg px-3 py-2"
        >
          Odhlásit
        </button>
      </header>

      <section className="ascii-frame p-4 flex flex-col gap-3">
        <h2 className="font-display uppercase text-sm">Týden</h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => nastavTyden(0)}
            className="bg-fg text-bg font-display uppercase py-4 text-base"
          >
            Tento týden
          </button>
          <button
            onClick={() => nastavTyden(1)}
            className="bg-fg text-bg font-display uppercase py-4 text-base"
          >
            Příští týden
          </button>
        </div>
        <div className="font-mono text-xs opacity-70 tabular-nums">
          Platnost: {menu.platnostOd} — {menu.platnostDo}
        </div>
        <button
          onClick={kopirujMinulyTyden}
          disabled={kopiruji}
          className="border border-fg uppercase text-sm py-4 disabled:opacity-40"
        >
          {kopiruji ? "Kopíruji…" : "Zkopírovat minulý týden"}
        </button>
      </section>

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
          placeholder="Např. Gramáž a alergeny na vyžádání u obsluhy."
          className="ascii-frame bg-bg px-3 py-3 text-base outline-none focus:border-accent"
        />
      </section>

      {chyba && (
        <p className="text-fg text-sm border border-accent p-3" role="alert">
          {chyba}
        </p>
      )}

      <button
        onClick={ulozit}
        disabled={ukladam}
        className="sticky bottom-3 bg-accent text-bg font-display uppercase text-xl py-5 tracking-tight disabled:opacity-50"
      >
        {ukladam ? "Ukládám…" : "Uložit menu"}
      </button>

      {ulozeno && (
        <section className="flex flex-col gap-3">
          <p className="bg-fg text-bg font-display uppercase text-sm p-3">
            Uloženo. Takto to bude vypadat na webu:
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
  );
}
