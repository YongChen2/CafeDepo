"use client";

import { useEffect } from "react";

export default function ErrorPage({
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
    <main className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
        <h1 className="font-display uppercase leading-none tracking-tight text-accent text-5xl sm:text-7xl">
          PORUCHA
        </h1>
        <p className="font-mono uppercase tracking-widest text-sm">
          Něco se pokazilo na trati
        </p>
        <p className="font-mono text-sm opacity-70">
          Stránku se nepodařilo zobrazit. Zkuste to prosím znovu.
        </p>
        <button
          onClick={reset}
          className="bg-fg text-bg font-display uppercase px-6 py-4 tracking-tight"
        >
          Zkusit znovu
        </button>
      </div>
    </main>
  );
}
