import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
        <h1
          className="font-display uppercase leading-none tracking-tight text-accent"
          style={{ fontSize: "clamp(4rem, 20vw, 9rem)" }}
        >
          404
        </h1>
        <p className="font-mono uppercase tracking-widest text-sm">
          Tento spoj neexistuje
        </p>
        <p className="font-mono text-sm opacity-70">
          Stránka, kterou hledáte, na této trati nejezdí.
        </p>
        <Link
          href="/"
          className="btn-invert bg-fg text-bg font-display uppercase px-6 py-4 tracking-tight"
        >
          Zpět na domů
        </Link>
      </div>
    </main>
  );
}
