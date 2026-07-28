/**
 * Čisté dekorativní SVG pozadí, deterministické (žádný Math.random),
 * barva vždy #1A1A1A na velmi nízké opacity — nesmí ovlivnit kontrast
 * obsahu nad ním. Bez parallaxy, bez pohybu při scrollu.
 */
export type BackgroundPatternKind = "halftone" | "rays";

function Halftone() {
  // Rastr teček, hustota (velikost bodů) roste odshora dolů.
  const rows = 14;
  const cols = 22;
  const w = 440;
  const h = 280;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1);
    const radius = 0.5 + t * 1.6;
    for (let c = 0; c < cols; c++) {
      const x = (c + (r % 2 === 0 ? 0 : 0.5)) * (w / cols);
      const y = r * (h / rows);
      dots.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={radius} />);
    }
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#1a1a1a">{dots}</g>
    </svg>
  );
}

function Rays() {
  // Perspektivní linky sbíhající se k bodu na horizontu.
  const w = 440;
  const h = 280;
  const vx = w / 2;
  const vy = h * 0.32;
  const count = 16;
  const lines = [];
  for (let i = 0; i <= count; i++) {
    const x = (i / count) * w * 1.4 - w * 0.2;
    lines.push(<line key={i} x1={x} y1={h} x2={vx} y2={vy} />);
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#1a1a1a" strokeWidth={1}>
        {lines}
      </g>
    </svg>
  );
}

export function BackgroundPattern({ kind }: { kind: BackgroundPatternKind }) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${
        kind === "halftone"
          ? "opacity-[0.01] sm:opacity-[0.02]"
          : "opacity-[0.0125] sm:opacity-[0.025]"
      }`}
      aria-hidden="true"
    >
      {kind === "halftone" ? <Halftone /> : <Rays />}
    </div>
  );
}
