import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { nactiMenu, ulozMenu } from "@/lib/menu-store";
import { ADMIN_COOKIE, overAdminToken } from "@/lib/auth";
import type { TydenniMenu } from "@/lib/types";

export const revalidate = 60;

export async function GET() {
  const menu = await nactiMenu();
  return NextResponse.json(menu);
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const prihlasen = await overAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!prihlasen) {
    return NextResponse.json({ error: "Nepřihlášeno." }, { status: 403 });
  }

  let menu: TydenniMenu;
  try {
    menu = await request.json();
  } catch {
    return NextResponse.json({ error: "Neplatná data." }, { status: 400 });
  }

  if (!menu || !Array.isArray(menu.dny) || menu.dny.length !== 5) {
    return NextResponse.json({ error: "Neplatný formát menu." }, { status: 400 });
  }

  menu.aktualizovano = new Date().toISOString();
  await ulozMenu(menu);

  return NextResponse.json({ ok: true, menu });
}
