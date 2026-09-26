import { AdminShell } from "@/components/AdminShell";
import { PoemsAdmin } from "./PoemsAdmin";
import { getSql, ensureSchema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadPoems() {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  return (await sql`
    select id, slug, title, excerpt, tags, featured, date_published
    from poems
    order by date_published desc nulls last
    limit 200
  `) as unknown as any[];
}

export default async function PoemsAdminPage() {
  const initial = await loadPoems();
  return (
    <AdminShell>
      <PoemsAdmin initial={initial} />
    </AdminShell>
  );
}
