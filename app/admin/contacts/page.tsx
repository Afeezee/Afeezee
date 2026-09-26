import { AdminShell } from "@/components/AdminShell";
import { ContactsAdmin, type Contact } from "./ContactsAdmin";
import { getSql, ensureSchema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECTIONS = ["all", "hub", "writing", "research", "startup"] as const;

async function loadContacts(section: string): Promise<Contact[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  if (section && section !== "all") {
    return (await sql`
      select id, section, form_type, name, email, topic, institution, message, ip, created_at
      from contacts
      where section = ${section}
      order by created_at desc
      limit 500
    `) as unknown as Contact[];
  }
  return (await sql`
    select id, section, form_type, name, email, topic, institution, message, ip, created_at
    from contacts
    order by created_at desc
    limit 500
  `) as unknown as Contact[];
}

async function loadCounts() {
  const sql = getSql();
  if (!sql) return null;
  await ensureSchema();
  const rows = (await sql`
    select section, count(*)::int as c
    from contacts
    group by section
  `) as unknown as { section: string; c: number }[];
  const bySection: Record<string, number> = {};
  let total = 0;
  for (const r of rows) {
    bySection[r.section] = r.c;
    total += r.c;
  }
  return { total, bySection };
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams?: { section?: string };
}) {
  const section = SECTIONS.includes((searchParams?.section ?? "all") as any)
    ? (searchParams?.section ?? "all")
    : "all";
  const [contacts, counts] = await Promise.all([
    loadContacts(section),
    loadCounts(),
  ]);
  return (
    <AdminShell>
      <ContactsAdmin
        contacts={contacts}
        counts={counts}
        section={section}
      />
    </AdminShell>
  );
}
