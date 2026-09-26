"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export type Contact = {
  id: string;
  section: string;
  form_type: string;
  name: string;
  email: string;
  topic: string;
  institution: string | null;
  message: string;
  ip: string | null;
  created_at: string;
};

const SECTION_TABS = [
  { value: "all", label: "All" },
  { value: "hub", label: "Hub" },
  { value: "writing", label: "Writing" },
  { value: "research", label: "Research" },
  { value: "startup", label: "Startup" },
] as const;

export function ContactsAdmin({
  contacts,
  counts,
  section,
}: {
  contacts: Contact[];
  counts: { total: number; bySection: Record<string, number> } | null;
  section: string;
}) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<Contact[]>(contacts);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((c) =>
      [c.name, c.email, c.topic, c.institution, c.message]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(needle))
    );
  }, [rows, q]);

  async function del(id: string) {
    if (!confirm("Delete this submission?")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRows((r) => r.filter((c) => c.id !== id));
      if (openId === id) setOpenId(null);
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Contacts</p>
          <h1 className="display-heading mt-2 text-3xl tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
            Inbox.
          </h1>
          {counts && (
            <p className="mt-2 text-sm text-[color:var(--fg)]/70">
              {counts.total} submission{counts.total === 1 ? "" : "s"} across all sections.
            </p>
          )}
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, topic, message…"
          className="w-full rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none sm:w-80"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
          }}
        />
      </div>

      <nav className="mt-6 flex flex-wrap gap-2">
        {SECTION_TABS.map((t) => {
          const active = section === t.value;
          const c = counts ? counts.bySection[t.value] : undefined;
          const total = t.value === "all" ? counts?.total : c;
          return (
            <Link
              key={t.value}
              href={t.value === "all" ? "/admin/contacts" : `/admin/contacts?section=${t.value}`}
              className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
                active
                  ? "bg-[color:var(--fg-strong)] text-[color:var(--bg)]"
                  : "text-muted"
              }`}
              style={active ? undefined : { boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
            >
              {t.label}
              {typeof total === "number" && (
                <span className={`ml-2 ${active ? "opacity-70" : "opacity-60"}`}>{total}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <ul className="mt-8 divide-y" style={{ borderColor: "var(--hairline)" }}>
        {filtered.map((c) => {
          const isOpen = openId === c.id;
          const dt = new Date(c.created_at);
          return (
            <li
              key={c.id}
              className="border-b py-5"
              style={{ borderColor: "var(--hairline)" }}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : c.id)}
                className="flex w-full flex-col items-start gap-2 text-left"
              >
                <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted">
                    {c.section}
                    {c.form_type && c.form_type !== "general" ? ` · ${c.form_type}` : ""}
                  </span>
                  <span className="text-xs text-muted">
                    {dt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                </div>
                <div className="flex w-full flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="display-heading text-xl tracking-tightest text-[color:var(--fg-strong)]">
                      {c.name}
                    </p>
                    <p className="text-sm text-[color:var(--fg)]/70">
                      {c.email}
                      {c.institution ? ` · ${c.institution}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--fg)]/70">
                      {c.topic}
                    </span>
                    <span aria-hidden className="text-muted">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </div>
                {!isOpen && (
                  <p className="line-clamp-2 max-w-3xl text-sm text-[color:var(--fg)]/75">
                    {c.message}
                  </p>
                )}
              </button>

              {isOpen && (
                <div className="mt-5 grid gap-5">
                  <div
                    className="whitespace-pre-line rounded-2xl p-5 text-[15px] leading-relaxed text-[color:var(--fg)]/90"
                    style={{
                      background: "var(--surface)",
                      boxShadow: "inset 0 0 0 1px var(--card-ring)",
                    }}
                  >
                    {c.message}
                  </div>

                  <dl className="grid gap-3 text-sm text-[color:var(--fg)]/80 sm:grid-cols-2">
                    <Row label="Name" value={c.name} />
                    <Row label="Email" value={c.email} />
                    {c.institution && <Row label="Institution" value={c.institution} />}
                    <Row label="Topic" value={c.topic} />
                    <Row label="Section" value={c.section} />
                    <Row label="Form" value={c.form_type} />
                    {c.ip && <Row label="IP" value={c.ip} />}
                    <Row
                      label="Received"
                      value={dt.toLocaleString("en-GB", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    />
                  </dl>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${encodeURIComponent(c.email)}?subject=${encodeURIComponent(
                        `Re: ${c.topic} · afeezee.com/${c.section}`
                      )}&body=${encodeURIComponent(
                        `Hi ${c.name.split(" ")[0]},\n\n\n\n— Afeezee\n\nOn ${dt.toLocaleString()}, you wrote:\n> ${c.message
                          .split("\n")
                          .join("\n> ")}`
                      )}`}
                      className="rounded-full px-4 py-2 text-sm font-medium"
                      style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
                    >
                      Reply by email →
                    </a>
                    <button
                      type="button"
                      onClick={() => del(c.id)}
                      className="rounded-full px-4 py-2 text-sm text-accent-jmhs dark:text-accent-jmhs-dark"
                      style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="py-10 text-center text-sm text-muted">
            {q ? "Nothing matches that search." : "No submissions yet in this view."}
          </li>
        )}
      </ul>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <dt className="text-xs uppercase tracking-[0.22em] text-muted">{label}</dt>
      <dd className="text-[color:var(--fg-strong)]">{value}</dd>
    </div>
  );
}
