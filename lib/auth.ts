import "server-only";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "depo_admin";
const SEDM_DNI = 60 * 60 * 24 * 7;

function tajnyKlic(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Chybí proměnná prostředí AUTH_SECRET.");
  }
  return new TextEncoder().encode(secret);
}

export async function vytvorAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SEDM_DNI}s`)
    .sign(tajnyKlic());
}

export async function overAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, tajnyKlic());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const COOKIE_MAX_AGE = SEDM_DNI;
