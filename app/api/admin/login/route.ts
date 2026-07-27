import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, COOKIE_MAX_AGE, vytvorAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Administrace není nakonfigurována (chybí ADMIN_PASSWORD)." },
      { status: 500 },
    );
  }

  let heslo: string | undefined;
  try {
    const body = await request.json();
    heslo = body?.heslo;
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  if (!heslo || heslo !== adminPassword) {
    return NextResponse.json({ error: "Nesprávné heslo." }, { status: 401 });
  }

  const token = await vytvorAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
