import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { listPoems, poemTags } from "@/lib/queries";
import { accentText } from "@/lib/identities";
import { writingLinks } from "@/lib/content/writing";

export const metadata: Metadata = {
  title: "Poems",
  description: "Poems by Afeezee — 200+ pieces being consolidated from AllPoetry into a single archive.",
};

export const revalidate = 60;

const PAGE_SIZE = 24;

export default async function PoemsPage({
  searchParams,
}: {
  searchParams?: { q?: string; tag?: string; page?: string };
}) {
  const q = searchParams?.q ?? "";
  const tag = searchParams?.tag ?? "";
  const page = Math.max(parseInt(searchParams?.page ?? "1", 10) || 1, 1);
  const offset = (page - 1) * PAGE_SIZE;

  const [poems, tags] = await Promise.all([
    listPoems({ q, tag, limit: PAGE_SIZE, offset }),
    poemTags(),
  ]);

  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing/poems">
      <SectionPageHero
        meta={writingMeta}
        eyebrow="Poems"
        title="The poems"
        body="The permanent archive. Search by word, filter by theme. New poems arrive as they migrate over from AllPoetry and Substack."
      />

      <section className="mx-auto max-w-6xl px-6 pb-6">
        <form action="/writing/poems" className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search poems…"
            className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none transition"
            style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
          />
          <select
            name="tag"
            defaultValue={tag}
            className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none transition"
            style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
          >
            <option value="">All themes</option>
            {tags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-full px-5 py-3 text-sm font-medium"
            style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
          >
            Filter
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {poems.length === 0 ? (
          <EmptyState q={q} tag={tag} />
        ) : (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {poems.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/writing/poems/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5"
                    style={{
                      background: "var(--surface)",
                      boxShadow: "inset 0 0 0 1px var(--card-ring)",
                    }}
                  >
                    <p className={`text-xs uppercase tracking-[0.22em] ${accentText(writingMeta.accent)}`}>
                      {p.date_published ? new Date(p.date_published).getFullYear() : "Poem"}
                    </p>
                    <h3 className="display-heading mt-2 text-2xl leading-[1.1] tracking-tightest text-[color:var(--fg-strong)]">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">
                        {p.excerpt}
                      </p>
                    )}
                    {p.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted"
                            style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <Pagination page={page} hasNext={poems.length === PAGE_SIZE} q={q} tag={tag} />
          </>
        )}
      </section>
    </SectionShell>
  );
}

function EmptyState({ q, tag }: { q: string; tag: string }) {
  const filtered = q || tag;
  return (
    <div
      className="rounded-2xl p-8 text-center"
      style={{
        background: "var(--surface)",
        boxShadow: "inset 0 0 0 1px var(--card-ring)",
      }}
    >
      {filtered ? (
        <>
          <p className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
            Nothing found here — yet.
          </p>
          <p className="mt-3 text-sm text-[color:var(--fg)]/75">
            Try a broader search or a different theme.
          </p>
          <Link
            href="/writing/poems"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--fg-strong)]"
          >
            Reset filters →
          </Link>
        </>
      ) : (
        <>
          <p className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
            The archive is being consolidated.
          </p>
          <p className="mt-3 text-sm text-[color:var(--fg)]/75">
            Existing poems still live at{" "}
            <a href={writingLinks.allPoetry} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">
              allpoetry.com/Afeezee
            </a>
            . Newest work goes out first via{" "}
            <a href={writingLinks.substack} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">
              Nuggets & Notes
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}

function Pagination({
  page,
  hasNext,
  q,
  tag,
}: {
  page: number;
  hasNext: boolean;
  q: string;
  tag: string;
}) {
  const params = (p: number) => {
    const u = new URLSearchParams();
    if (q) u.set("q", q);
    if (tag) u.set("tag", tag);
    if (p > 1) u.set("page", String(p));
    return u.toString() ? `?${u.toString()}` : "";
  };
  if (page === 1 && !hasNext) return null;
  return (
    <nav className="mt-10 flex items-center justify-between text-sm">
      <div>
        {page > 1 && (
          <Link href={`/writing/poems${params(page - 1)}`} className="text-[color:var(--fg-strong)]">
            ← Previous
          </Link>
        )}
      </div>
      <span className="text-muted">Page {page}</span>
      <div>
        {hasNext && (
          <Link href={`/writing/poems${params(page + 1)}`} className="text-[color:var(--fg-strong)]">
            Next →
          </Link>
        )}
      </div>
    </nav>
  );
}
