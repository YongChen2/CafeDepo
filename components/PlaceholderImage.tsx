import { createRng, hashSeed, parseAspectRatio, rngInt } from "@/lib/placeholder-hash";

export type PlaceholderKind =
  | "interier"
  | "jidlo"
  | "kava"
  | "dort"
  | "exterier"
  | "logo";

const KIND_TAG: Record<PlaceholderKind, string> = {
  interier: "INT",
  jidlo: "JID",
  kava: "KAV",
  dort: "DOR",
  exterier: "EXT",
  logo: "LOG",
};

function sanitizeId(seed: string): string {
  return seed.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function Halftone({
  id,
  w,
  h,
  rng,
}: {
  id: string;
  w: number;
  h: number;
  rng: () => number;
}) {
  const spacing = 9 + rngInt(rng, 0, 13); // hustota rastru odvozená ze seedu
  const radius = 0.6 + rngInt(rng, 0, 6) / 5;
  return (
    <>
      <defs>
        <pattern
          id={id}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r={radius}
            fill="#050505"
            fillOpacity={0.35}
          />
        </pattern>
      </defs>
      <rect x={0} y={0} width={w} height={h} fill="#eae8e3" />
      <rect x={0} y={0} width={w} height={h} fill={`url(#${id})`} />
    </>
  );
}

function Composition({
  kind,
  w,
  h,
  rng,
}: {
  kind: PlaceholderKind;
  w: number;
  h: number;
  rng: () => number;
}) {
  const stroke = "#050505";

  if (kind === "kava") {
    const cx = w / 2;
    const cy = h / 2;
    const count = rngInt(rng, 4, 6);
    const base = Math.min(w, h) * 0.1;
    return (
      <g fill="none" stroke={stroke} strokeWidth={1.25} opacity={0.75}>
        {Array.from({ length: count }).map((_, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={base * (i + 1) * (0.92 + rngInt(rng, 0, 8) / 100)}
          />
        ))}
      </g>
    );
  }

  if (kind === "interier") {
    const vx = w * (0.38 + rng() * 0.24);
    const vy = h * (0.22 + rng() * 0.14);
    const lines = [];
    for (let i = 0; i <= 5; i++) {
      const x = (i / 5) * w;
      lines.push(
        <line key={`v${i}`} x1={x} y1={h} x2={vx} y2={vy} />,
      );
    }
    for (let j = 1; j <= 4; j++) {
      const y = vy + (h - vy) * Math.pow(j / 5, 1.4);
      lines.push(<line key={`h${j}`} x1={0} y1={y} x2={w} y2={y} />);
    }
    return (
      <g stroke={stroke} strokeWidth={1} opacity={0.55}>
        {lines}
      </g>
    );
  }

  if (kind === "jidlo" || kind === "dort") {
    const tableY = h * (0.66 + rngInt(rng, 0, 6) / 100);
    const plateR = Math.min(w, h) * (0.2 + rngInt(rng, 0, 5) / 100);
    const cx = w * (0.46 + rngInt(rng, 0, 8) / 100);
    const cy = tableY - plateR * 0.9;
    return (
      <g stroke={stroke} fill="none">
        <line
          x1={0}
          y1={tableY}
          x2={w}
          y2={tableY}
          strokeWidth={1.25}
          opacity={0.5}
        />
        <circle cx={cx} cy={cy} r={plateR} strokeWidth={1.5} opacity={0.8} />
        <circle
          cx={cx}
          cy={cy}
          r={plateR * 0.62}
          strokeWidth={1}
          opacity={0.5}
        />
      </g>
    );
  }

  if (kind === "exterier") {
    const count = rngInt(rng, 5, 8);
    return (
      <g stroke={stroke} opacity={0.5}>
        {Array.from({ length: count }).map((_, i) => {
          const y = ((i + 0.5) / count) * h * (0.85 + rngInt(rng, 0, 10) / 100);
          return (
            <line
              key={i}
              x1={0}
              y1={y}
              x2={w}
              y2={y}
              strokeWidth={i % 2 === 0 ? 1.5 : 1}
            />
          );
        })}
      </g>
    );
  }

  // logo — minimalistický středový znak
  const size = Math.min(w, h) * 0.32;
  const cx = w / 2;
  const cy = h / 2;
  return (
    <g stroke={stroke} fill="none" strokeWidth={1.25} opacity={0.75}>
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        transform={`rotate(45 ${cx} ${cy})`}
      />
      <line x1={cx - size} y1={cy} x2={cx + size} y2={cy} />
      <line x1={cx} y1={cy - size} x2={cx} y2={cy + size} />
    </g>
  );
}

function CornerCross({ x, y }: { x: number; y: number }) {
  const s = 6;
  return (
    <g stroke="#050505" strokeWidth={1}>
      <line x1={x - s} y1={y} x2={x + s} y2={y} />
      <line x1={x} y1={y - s} x2={x} y2={y + s} />
    </g>
  );
}

export function PlaceholderImage({
  kind = "interier",
  seed,
  aspect = "aspect-[4/3]",
  label,
  className = "",
}: {
  kind?: PlaceholderKind;
  seed: string;
  aspect?: string;
  label?: string;
  className?: string;
}) {
  const ratio = parseAspectRatio(aspect);
  const w = 400;
  const h = Math.round(w / ratio);
  const rng = createRng(seed);
  const hash = hashSeed(seed);
  const patternId = `ht-${sanitizeId(seed)}`;
  const nominalW = 1600;
  const nominalH = Math.round(nominalW / ratio);
  const tag = `${KIND_TAG[kind]}-${String(hash % 100).padStart(2, "0")}`;

  return (
    <div
      role="img"
      aria-label={label ?? `Připravovaná fotografie — ${kind}`}
      className={`relative @container overflow-hidden ascii-frame cursor-crosshair ${aspect} ${className}`}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <Halftone id={patternId} w={w} h={h} rng={rng} />
        <Composition kind={kind} w={w} h={h} rng={rng} />
        <CornerCross x={10} y={10} />
        <CornerCross x={w - 10} y={10} />
        <CornerCross x={10} y={h - 10} />
        <CornerCross x={w - 10} y={h - 10} />
        <text
          x={16}
          y={h - 14}
          fontFamily="var(--font-mono), monospace"
          fontSize={h * 0.045}
          fill="#050505"
          opacity={0.55}
        >
          {`${tag} /// ${nominalW}x${nominalH}`}
        </text>
        {label && (
          <text
            x={16}
            y={20}
            fontFamily="var(--font-mono), monospace"
            fontSize={h * 0.04}
            fill="#050505"
            opacity={0.5}
          >
            {label.length > 34 ? `${label.slice(0, 33)}…` : label}
          </text>
        )}
      </svg>

      {/* Povinný diagonální pás — nesmí být skrytý ani na malých náhledech. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: "rotate(-8deg)" }}
      >
        <div className="w-[150%] bg-fg text-bg flex flex-col items-center justify-center gap-0.5 py-1">
          <span
            className="font-mono uppercase tracking-wide text-center leading-tight px-2"
            style={{ fontSize: "clamp(0.5rem, 4.2cqw, 1.05rem)" }}
          >
            PLACEHOLDER /// MÍSTO PRO REÁLNOU FOTOGRAFII
          </span>
          <span
            className="font-mono uppercase tracking-wide text-center leading-tight opacity-80 px-2"
            style={{ fontSize: "clamp(0.4rem, 2.4cqw, 0.7rem)" }}
          >
            NÁHLED — GRAFIKA NENÍ FOTOGRAFIÍ PODNIKU
          </span>
        </div>
      </div>
    </div>
  );
}
