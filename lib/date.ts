export const PRAGUE_TZ = "Europe/Prague";

const WEEKDAY_INDEX: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

/** Dnešní datum v Europe/Prague, formát YYYY-MM-DD. */
export function dnesniDatumPraha(date = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: PRAGUE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Dnešní den v týdnu v Europe/Prague. 0 = pondělí ... 6 = neděle. */
export function dnesniIndexPraha(date = new Date()): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: PRAGUE_TZ,
    weekday: "short",
  }).format(date);
  return WEEKDAY_INDEX[weekday] ?? 0;
}
