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
        <h1 className="font-display uppercase leading-none tracking-[-0.03em] text-accent text-5xl sm:text-7xl">
          PORUCHA
        </h1>
        <p className="font-mono uppercase tracking-widest text-sm">
          Něco se pokazilo na trati
        </p>
        <p className="font-mono text-sm text-muted leading-[1.6]">
          Stránku se nepodařilo zobrazit. Zkuste to prosím znovu.
        </p>
        <button
          onClick={reset}
          className="btn-invert bg-fg text-bg font-semibold uppercase px-6 py-4 rounded-[2px]"
        >
          Zkusit znovu
        </button>
      </div>
    </main>
  );
}
