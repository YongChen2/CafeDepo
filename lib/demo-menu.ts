import type { Den, DenZkratka, TydenniMenu } from "./types";

const VZOR_DNE: Record<DenZkratka, { polevka: string; hlavni: [string, string, string]; alergeny: string[] }> = {
  PO: {
    polevka: "Slepičí vývar s nudlemi",
    hlavni: [
      "Svíčková na smetaně, houskový knedlík",
      "Kuřecí prsa na grilu, dušená zelenina",
      "Zapékané těstoviny se zeleninou a sýrem",
    ],
    alergeny: ["1,3,7,9", "1,7", "1,7"],
  },
  UT: {
    polevka: "Zeleninová polévka s kroupami",
    hlavni: [
      "Kuřecí řízek, bramborová kaše",
      "Špagety all'arrabbiata",
      "Hovězí guláš, houskový knedlík",
    ],
    alergeny: ["1,3,7", "1", "1,3"],
  },
  ST: {
    polevka: "Čočková polévka s uzeninou",
    hlavni: [
      "Vepřová pečeně, dušené zelí, houskový knedlík",
      "Grilované halloumi, quinoa salát",
      "Kuřecí stroganoff, dušená rýže",
    ],
    alergeny: ["1,9", "7", "7,9"],
  },
  CT: {
    polevka: "Bramboračka",
    hlavni: [
      "Smažený sýr, brambor, tatarská omáčka",
      "Pečený losos, bramborové pyré, špenát",
      "Vepřový guláš, houskový knedlík",
    ],
    alergeny: ["1,3,7,10", "4,7", "1,3"],
  },
  PA: {
    polevka: "Rajčatová polévka s bazalkou",
    hlavni: [
      "Řízek z květáku, bramborový salát",
      "Kuřecí curry, jasmínová rýže",
      "Hovězí burger, hranolky",
    ],
    alergeny: ["1,3,7", "9", "1,3,7"],
  },
};

const CENY = [149, 169, 199];

function pondeliTohotoTydne(): Date {
  const dnes = new Date();
  const den = dnes.getDay();
  const diff = den === 0 ? -6 : 1 - den;
  const pondeli = new Date(dnes);
  pondeli.setDate(dnes.getDate() + diff);
  pondeli.setHours(0, 0, 0, 0);
  return pondeli;
}

export function vychoziDemoMenu(): TydenniMenu {
  const pondeli = pondeliTohotoTydne();
  const poradi: DenZkratka[] = ["PO", "UT", "ST", "CT", "PA"];

  const dny: Den[] = poradi.map((den, i) => {
    const datum = new Date(pondeli);
    datum.setDate(pondeli.getDate() + i);
    const vzor = VZOR_DNE[den];

    return {
      den,
      datum: datum.toISOString().slice(0, 10),
      polevka: {
        id: `demo-${den}-polevka`,
        nazev: vzor.polevka,
        alergeny: "9",
        cena: 39,
      },
      hlavni: vzor.hlavni.map((nazev, j) => ({
        id: `demo-${den}-${j}`,
        nazev,
        alergeny: vzor.alergeny[j],
        cena: CENY[j],
      })),
    };
  });

  const konec = new Date(pondeli);
  konec.setDate(pondeli.getDate() + 4);

  return {
    platnostOd: pondeli.toISOString().slice(0, 10),
    platnostDo: konec.toISOString().slice(0, 10),
    poznamka: "Demo menu — gramáž a alergeny na vyžádání u obsluhy.",
    dny,
    aktualizovano: new Date().toISOString(),
  };
}

export const DEMO_STORAGE_KEY = "demo-menu";
