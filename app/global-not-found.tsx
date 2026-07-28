import type { Metadata } from "next";
import Link from "next/link";
import { archivoBlack, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stránka nenalezena — CAFE DEPO",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="cs"
      className={`${archivoBlack.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex items-center justify-center bg-bg text-fg font-sans antialiased px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
          <h1
            className="font-display uppercase leading-none tracking-[-0.03em] text-accent"
            style={{ fontSize: "clamp(4rem, 20vw, 9rem)" }}
          >
            404
          </h1>
          <p className="font-mono uppercase tracking-widest text-sm">
            Tento spoj neexistuje
          </p>
          <p className="font-mono text-sm text-muted leading-[1.6]">
            Stránka, kterou hledáte, na této trati nejezdí.
          </p>
          <Link
            href="/"
            className="btn-invert bg-fg text-bg font-semibold uppercase px-6 py-4 rounded-[2px]"
          >
            Zpět na domů
          </Link>
        </div>
      </body>
    </html>
  );
}
