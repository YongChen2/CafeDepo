import type { Den, TydenniMenu } from "./types";

export function dnesniDatum(): string {
  return new Date().toISOString().slice(0, 10);
}

export function jeAktualniTyden(menu: TydenniMenu, dnes = dnesniDatum()): boolean {
  return dnes >= menu.platnostOd && dnes <= menu.platnostDo;
}

export function jeMenuProsle(menu: TydenniMenu, dnes = dnesniDatum()): boolean {
  return dnes > menu.platnostDo;
}

export function najdiDnesniDen(menu: TydenniMenu, dnes = dnesniDatum()): Den | null {
  return menu.dny.find((d) => d.datum === dnes) ?? null;
}

export function formatCena(cena: number | null): string {
  return cena === null ? "—" : `${cena} Kč`;
}

export function formatDatumCz(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}. ${m}. ${y}`;
}
