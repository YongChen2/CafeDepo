import { cookies } from "next/headers";
import { ADMIN_COOKIE, overAdminToken } from "@/lib/auth";
import { nactiMenu } from "@/lib/menu-store";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminEditor } from "@/components/admin/AdminEditor";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const prihlasen = await overAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!prihlasen) {
    return <AdminLogin />;
  }

  const menu = await nactiMenu();
  return <AdminEditor initialMenu={menu} />;
}
