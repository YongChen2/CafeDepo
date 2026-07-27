import type { Metadata } from "next";
import { DemoEditor } from "@/components/admin/DemoEditor";

export const metadata: Metadata = {
  title: "Demo administrace — CAFE DEPO",
  robots: { index: false, follow: false },
};

export default function AdminDemoPage() {
  return <DemoEditor />;
}
