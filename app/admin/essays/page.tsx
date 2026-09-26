import { AdminShell } from "@/components/AdminShell";
import { EssaysAdmin } from "./EssaysAdmin";
import { getSql, ensureSchema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadEssays() {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  return (await sql`
    select id, slug, title, subtitle, excerpt, tags, featured, reading_time_min, date_published
    from essays
    order by date_published desc nulls last
    limit 200
  `) as unknown as any[];
}

export default async function EssaysAdminPage() {
  const initial = await loadEssays();
  return (
    <AdminShell>
      <EssaysAdmin initial={initial} />
    </AdminShell>
  );
}
