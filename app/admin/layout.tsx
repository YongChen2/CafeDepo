import type { Metadata } from "next";
import { archivoBlack, jetbrainsMono } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Administrace menu — CAFE DEPO",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg text-fg font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
