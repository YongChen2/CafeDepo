export type Jidlo = {
  id: string;
  nazev: string;
  alergeny: string;
  cena: number | null;
};

export type DenZkratka = "PO" | "UT" | "ST" | "CT" | "PA";

export type Den = {
  den: DenZkratka;
  datum: string; // ISO 8601, např. "2026-07-27"
  polevka: Jidlo | null;
  hlavni: Jidlo[];
};

export type TydenniMenu = {
  platnostOd: string; // ISO 8601
  platnostDo: string; // ISO 8601
  poznamka: string;
  dny: Den[];
  aktualizovano: string; // ISO 8601 datetime
};

export const DNY_TYDNE: DenZkratka[] = ["PO", "UT", "ST", "CT", "PA"];

export function prazdnyJidlo(): Jidlo {
  return {
    id: crypto.randomUUID(),
    nazev: "",
    alergeny: "",
    cena: null,
  };
}

export function prazdneMenu(platnostOd: string): TydenniMenu {
  const start = new Date(platnostOd + "T00:00:00");
  const dny: Den[] = DNY_TYDNE.map((den, i) => {
    const datum = new Date(start);
    datum.setDate(start.getDate() + i);
    return {
      den,
      datum: datum.toISOString().slice(0, 10),
      polevka: null,
      hlavni: [],
    };
  });
  const konec = new Date(start);
  konec.setDate(start.getDate() + 4);
  return {
    platnostOd,
    platnostDo: konec.toISOString().slice(0, 10),
    poznamka: "",
    dny,
    aktualizovano: new Date().toISOString(),
  };
}
