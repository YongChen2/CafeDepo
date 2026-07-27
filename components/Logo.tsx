import { Link } from "@/i18n/navigation";

// Typografické logo — Archivo Black, tight tracking.
// Až dorazí finální SVG logo od klientky, stačí vyměnit obsah této komponenty
// (uložit soubor do public/images/logo/ a nahradit <span> za <Image>).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display uppercase tracking-tight leading-none ${className}`}
    >
      CAFE<span className="text-accent">·</span>DEPO
    </Link>
  );
}
