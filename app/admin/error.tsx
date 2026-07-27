"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-6">
        <h1 className="font-display uppercase leading-none tracking-tight text-accent text-4xl">
          PORUCHA
        </h1>
        <p className="font-mono text-sm opacity-70">
          Administraci se nepodařilo zobrazit. Zkuste to prosím znovu.
        </p>
        <button
          onClick={reset}
          className="btn-invert bg-fg text-bg font-display uppercase px-6 py-4 tracking-tight w-full"
        >
          Zkusit znovu
        </button>
      </div>
    </main>
  );
}
