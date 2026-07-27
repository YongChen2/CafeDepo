"use client";

import { archivoBlack, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="cs"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex items-center justify-center bg-bg text-fg font-mono antialiased px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
          <h1 className="font-display uppercase leading-none tracking-tight text-accent text-5xl sm:text-7xl">
            PORUCHA
          </h1>
          <p className="font-mono text-sm opacity-70">
            Web se nepodařilo zobrazit. Zkuste to prosím znovu.
          </p>
          <button
            onClick={reset}
            className="bg-fg text-bg font-display uppercase px-6 py-4 tracking-tight"
          >
            Zkusit znovu
          </button>
        </div>
      </body>
    </html>
  );
}
