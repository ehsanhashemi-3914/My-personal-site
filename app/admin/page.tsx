import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isAdminEnabled } from "@/lib/admin/guard";
import { readWorks } from "@/lib/admin/works-store";
import { AdminEditor } from "@/components/admin/AdminEditor";

/** Never index the editor, even by accident. */
export const metadata: Metadata = {
  title: "Work editor",
  robots: { index: false, follow: false },
};

// Always read the file fresh; caching would show stale samples after a save.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminEnabled) notFound();
  const works = await readWorks();
  return <AdminEditor initialWorks={works} />;
}
