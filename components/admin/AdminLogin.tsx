"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm ascii-frame p-6 flex flex-col gap-5"
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
          <p className="text-accent text-sm border border-accent p-2">
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
    </main>
  );
}
