// Deterministický hash + PRNG čistě z celočíselné aritmetiky — žádný
// Math.random ani Date, takže server a klient vždy vyprodukují identický
// výstup (nutné, aby SVG placeholder nezpůsobil hydration mismatch).

export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function createRng(seed: string) {
  let state = hashSeed(seed) || 1;
  return function next(): number {
    state = Math.imul(state ^ (state >>> 15), 2246822519) >>> 0;
    state = Math.imul(state ^ (state >>> 13), 3266489917) >>> 0;
    state = (state ^ (state >>> 16)) >>> 0;
    return state / 4294967296;
  };
}

export function rngInt(rng: () => number, min: number, max: number): number {
  return Math.floor(min + rng() * (max - min + 1));
}

/** Rozparsuje Tailwind aspect třídu ("aspect-[4/3]", "aspect-square", ...) na poměr W/H. */
export function parseAspectRatio(aspectClass: string): number {
  if (aspectClass.includes("square")) return 1;
  const match = aspectClass.match(/\[(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\]/);
  if (match) {
    const w = parseFloat(match[1]);
    const h = parseFloat(match[2]);
    if (w > 0 && h > 0) return w / h;
  }
  return 4 / 3;
}
