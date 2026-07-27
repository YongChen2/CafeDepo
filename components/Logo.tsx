import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const LOGO_PATH = path.join(process.cwd(), "public/images/logo/logo.webp");

function maLogo(): boolean {
  try {
    return fs.existsSync(LOGO_PATH);
  } catch {
    return false;
  }
}

// Skutečné logo (public/images/logo/logo.webp), pokud existuje.
// Fallback: typografická verze (Archivo Black), dokud logo chybí.
export function Logo({ className = "" }: { className?: string }) {
  if (maLogo()) {
    return (
      <Link href="/" className={`block shrink-0 ${className}`}>
        <Image
          src="/images/logo/logo.webp"
          alt="CAFE DEPO"
          width={96}
          height={96}
          priority
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`font-display uppercase tracking-tight leading-none ${className}`}
    >
      CAFE<span className="text-accent">·</span>DEPO
    </Link>
  );
}
