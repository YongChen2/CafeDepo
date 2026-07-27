import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 přejmenoval "middleware" na "proxy" (soubor middleware.ts už
// není konvence) — funkce next-intl createMiddleware() je ale beze změny
// kompatibilní, jen ji exportujeme z proxy.ts.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
