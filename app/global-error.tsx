"use client";

import { archivoBlack, inter, jetbrainsMono } from "@/lib/fonts";
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
      className={`${archivoBlack.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex items-center justify-center bg-bg text-fg font-sans antialiased px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
          <h1 className="font-display uppercase leading-none tracking-[-0.03em] text-accent text-5xl sm:text-7xl">
            PORUCHA
          </h1>
          <p className="font-mono text-sm text-muted leading-[1.6]">
            Web se nepodařilo zobrazit. Zkuste to prosím znovu.
          </p>
          <button
            onClick={reset}
            className="btn-invert bg-fg text-bg font-semibold uppercase px-6 py-4 rounded-[2px]"
          >
            Zkusit znovu
          </button>
        </div>
      </body>
    </html>
  );
}
