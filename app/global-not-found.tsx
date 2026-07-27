import type { Metadata } from "next";
import Link from "next/link";
import { archivoBlack, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stránka nenalezena — CAFE DEPO",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="cs"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex items-center justify-center bg-bg text-fg font-mono antialiased px-4">
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
      </body>
    </html>
  );
}
