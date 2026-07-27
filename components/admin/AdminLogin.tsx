"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminLogin() {
  const router = useRouter();
  const [heslo, setHeslo] = useState("");
  const [chyba, setChyba] = useState<string | null>(null);
  const [nacita, setNacita] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChyba(null);
    setNacita(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heslo }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setChyba(data.error ?? "Přihlášení se nezdařilo.");
        setNacita(false);
        return;
      }
      router.refresh();
    } catch {
      setChyba("Přihlášení se nezdařilo. Zkontrolujte připojení.");
      setNacita(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="ascii-frame p-6 flex flex-col gap-5"
        >
          <div>
            <h1 className="font-display text-3xl uppercase tracking-tight">
              DEPO
            </h1>
            <p className="text-xs uppercase opacity-60 mt-1">
              Administrace poledního menu
            </p>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase opacity-70">Heslo</span>
            <input
              type="password"
              autoFocus
              value={heslo}
              onChange={(e) => setHeslo(e.target.value)}
              className="ascii-frame bg-bg text-fg text-lg px-4 py-4 outline-none focus:border-accent"
              style={{ fontSize: "1.125rem" }}
            />
          </label>

          {chyba && (
            <p className="text-fg text-sm border border-accent p-2" role="alert">
              {chyba}
            </p>
          )}

          <button
            type="submit"
            disabled={nacita || heslo.length === 0}
            className="bg-fg text-bg font-display uppercase text-lg py-4 tracking-tight disabled:opacity-40"
          >
            {nacita ? "Přihlašuji…" : "Přihlásit se"}
          </button>
        </form>

        <div className="border-t border-fg" />

        <div className="flex flex-col gap-4 font-mono">
          <h2 className="text-sm uppercase tracking-widest text-center">
            [ DEMO REŽIM ]
          </h2>
          <p className="text-xs opacity-70 text-center">
            Vyzkoušejte si administraci bez rizika. Změny se neukládají.
          </p>
          <div className="ascii-frame p-4 text-xs flex flex-col gap-1">
            <span>
              UŽIVATEL: <span className="font-bold">CafeStop</span>
            </span>
            <span>
              HESLO: <span className="font-bold">CafeStop123</span>
            </span>
          </div>
          <Link
            href="/admin/demo"
            className="border border-fg text-center uppercase text-sm py-4 tracking-tight hover:bg-fg hover:text-bg"
          >
            Otevřít demo
          </Link>
        </div>
      </div>
    </main>
  );
}
