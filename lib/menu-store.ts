import "server-only";
import { head, put } from "@vercel/blob";
import type { TydenniMenu } from "./types";

const BLOB_KEY = "menu/aktualni.json";

async function nactiSeed(): Promise<TydenniMenu> {
  const seed = await import("../data/menu-seed.json");
  return seed.default as TydenniMenu;
}

/**
 * Načte aktuální týdenní menu z Vercel Blob. Pokud Blob není nakonfigurovaný,
 * je nedostupný nebo obsahuje prázdná/neplatná data, spadne na lokální
 * data/menu-seed.json — web nesmí nikdy spadnout kvůli chybějícímu menu.
 */
export async function nactiMenu(): Promise<TydenniMenu> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return nactiSeed();
  }

  try {
    const info = await head(BLOB_KEY);
    const res = await fetch(info.url, { next: { revalidate: 60 } });
    if (!res.ok) return nactiSeed();

    const data = (await res.json()) as TydenniMenu;
    if (!data || !Array.isArray(data.dny) || data.dny.length === 0) {
      return nactiSeed();
    }
    return data;
  } catch {
    return nactiSeed();
  }
}

export async function ulozMenu(menu: TydenniMenu): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(menu, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
