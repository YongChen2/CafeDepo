import { Archivo_Black, JetBrains_Mono } from "next/font/google";

export const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});
