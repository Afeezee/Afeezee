"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Poem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  featured: boolean;
  date_published: string | null;
};

export function PoemsAdmin({ initial }: { initial: Poem[] }) {
  const router = useRouter();
  const [poems, setPoems] = useState<Poem[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function createPoem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setOk(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      featured: form.featured?.checked,
      tags: String(data.tags ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch("/api/admin/poems", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Failed.");
      setOk("Poem added.");
      form.reset();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function del(id: string) {
    if (!confirm("Delete this poem?")) return;
    const res = await fetch(`/api/admin/poems/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPoems(poems.filter((p) => p.id !== id));
      router.refresh();
    }
  }

  const inputStyle = {
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
  };

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <section>
        <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
          Add a poem
        </h2>
        <form onSubmit={createPoem} className="mt-6 grid gap-3">
          <Field name="title" label="Title" required style={inputStyle} />
          <Field name="slug" label="Slug (optional — derived from title)" style={inputStyle} />
          <div className="grid gap-2">
            <label htmlFor="body" className="text-xs uppercase tracking-[0.2em] text-muted">Body</label>
            <textarea
              id="body"
              name="body"
              required
              rows={12}
              className="rounded-lg px-3 py-3 font-mono text-sm text-[color:var(--fg-strong)] outline-none"
              style={inputStyle}
            />
          </div>
          <Field name="excerpt" label="Excerpt (short line, optional)" style={inputStyle} />
          <Field name="tags" label="Tags (comma-separated)" style={inputStyle} />
          <Field name="date_written" label="Date written (YYYY-MM-DD, optional)" type="date" style={inputStyle} />
          <label className="mt-1 inline-flex items-center gap-2 text-sm text-[color:var(--fg)]/85">
            <input type="checkbox" name="featured" />
            Featured on /writing
          </label>
          <button
            type="submit"
            disabled={busy}
            className="mt-3 rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
            style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
          >
            {busy ? "Adding…" : "Add poem"}
          </button>
          {error && <p className="text-sm text-accent-jmhs dark:text-accent-jmhs-dark">{error}</p>}
          {ok && <p className="text-sm text-accent-research dark:text-accent-research-dark">{ok}</p>}
        </form>
      </section>

      <section>
        <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
          Existing ({poems.length})
        </h2>
        <ul className="mt-6 divide-y" style={{ borderColor: "var(--hairline)" }}>
          {poems.map((p) => (
            <li key={p.id} className="border-b py-4" style={{ borderColor: "var(--hairline)" }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <a href={`/writing/poems/${p.slug}`} target="_blank" rel="noreferrer noopener" className="display-heading text-lg tracking-tightest text-[color:var(--fg-strong)]">
                    {p.title}
                  </a>
                  <p className="mt-1 text-xs text-muted">
                    /writing/poems/{p.slug}
                    {p.featured && " · featured"}
                  </p>
                  {p.tags?.length > 0 && (
                    <p className="mt-1 text-xs text-muted">{p.tags.join(" · ")}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => del(p.id)}
                  className="text-xs uppercase tracking-[0.18em] text-accent-jmhs dark:text-accent-jmhs-dark"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {poems.length === 0 && (
            <li className="py-4 text-sm text-muted">No poems yet. Add the first above.</li>
          )}
        </ul>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  style,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  style: React.CSSProperties;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-xs uppercase tracking-[0.2em] text-muted">{label}</label>
      <input id={name} name={name} type={type} required={required} className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none" style={style} />
    </div>
  );
}
