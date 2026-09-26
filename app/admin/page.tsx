import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getSql, ensureSchema } from "@/lib/db";
import { adminConfigured } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function counts() {
  const sql = getSql();
  if (!sql) return null;
  try {
    await ensureSchema();
    const [poems, essays, contacts] = await Promise.all([
      sql`select count(*)::int as c from poems` as unknown as Promise<{ c: number }[]>,
      sql`select count(*)::int as c from essays` as unknown as Promise<{ c: number }[]>,
      sql`select count(*)::int as c from contacts` as unknown as Promise<{ c: number }[]>,
    ]);
    return {
      poems: poems[0]?.c ?? 0,
      essays: essays[0]?.c ?? 0,
      contacts: contacts[0]?.c ?? 0,
    };
  } catch {
    return null;
  }
}

export default async function AdminHome() {
  const c = await counts();
  return (
    <AdminShell>
      <p className="text-xs uppercase tracking-[0.28em] text-muted">Overview</p>
      <h1 className="display-heading mt-2 text-3xl tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
        The workshop.
      </h1>
      <p className="mt-3 max-w-2xl text-[color:var(--fg)]/80">
        Add and manage poems and essays here. Content is stored in Neon and
        reads immediately on the public site (server revalidation window: 60s).
      </p>

      {!adminConfigured() && (
        <div
          className="mt-8 rounded-2xl p-6 text-sm text-[color:var(--fg)]/85"
          style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
        >
          <p className="font-medium text-[color:var(--fg-strong)]">Admin not configured.</p>
          <p className="mt-1">Set <code>ADMIN_PASSWORD</code> (min 8 chars) in your env to enable sign-in.</p>
        </div>
      )}

      {c === null ? (
        <div
          className="mt-8 rounded-2xl p-6 text-sm text-[color:var(--fg)]/85"
          style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
        >
          <p className="font-medium text-[color:var(--fg-strong)]">Neon not connected.</p>
          <p className="mt-1">Set <code>DATABASE_URL</code> to a Neon pooled connection string.</p>
        </div>
      ) : (
        <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <Stat label="Poems" value={c.poems} href="/admin/poems" />
          <Stat label="Essays" value={c.essays} href="/admin/essays" />
          <Stat label="Contact submissions" value={c.contacts} href="/admin/contacts" />
        </dl>
      )}
    </AdminShell>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const inner = (
    <div
      className="rounded-2xl p-6 transition hover:-translate-y-0.5"
      style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
    >
      <dt className="text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="display-heading mt-2 text-4xl tracking-tightest text-[color:var(--fg-strong)]">
        {value}
      </dd>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
