// TODO: ověřit u klienta
// Otevírací doba dle zadání klientky (2026-07-27): PO–PÁ 08:00–18:00,
// SO 09:00–14:00, NE zavřeno. Výdej poledního menu 11:00–14:45.
export const OTEVIRACI_DOBA = [
  { den: "PO", labelKey: "mon_fri" as const, open: "08:00", close: "18:00" },
  { den: "UT", labelKey: "mon_fri" as const, open: "08:00", close: "18:00" },
  { den: "ST", labelKey: "mon_fri" as const, open: "08:00", close: "18:00" },
  { den: "CT", labelKey: "mon_fri" as const, open: "08:00", close: "18:00" },
  { den: "PA", labelKey: "mon_fri" as const, open: "08:00", close: "18:00" },
  { den: "SO", labelKey: "sat" as const, open: "09:00", close: "14:00" },
  { den: "NE", labelKey: "sun" as const, open: null, close: null },
] as const;

export const VYDEJ_OBEDU = { open: "11:00", close: "14:45" };

/** 0 = pondělí ... 6 = neděle */
export function dnesniIndex(date = new Date()): number {
  const jsDay = date.getDay(); // 0 = neděle
  return jsDay === 0 ? 6 : jsDay - 1;
}
