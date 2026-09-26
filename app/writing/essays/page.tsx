import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { listEssays, essayTags } from "@/lib/queries";
import { accentText } from "@/lib/identities";
import { writingLinks } from "@/lib/content/writing";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Essays by Afeezee — on technology, society, politics, innovation, research, and business.",
};

export const revalidate = 60;

const PAGE_SIZE = 20;

export default async function EssaysPage({
  searchParams,
}: {
  searchParams?: { q?: string; tag?: string; page?: string };
}) {
  const q = searchParams?.q ?? "";
  const tag = searchParams?.tag ?? "";
  const page = Math.max(parseInt(searchParams?.page ?? "1", 10) || 1, 1);
  const offset = (page - 1) * PAGE_SIZE;

  const [essays, tags] = await Promise.all([
    listEssays({ q, tag, limit: PAGE_SIZE, offset }),
    essayTags(),
  ]);

  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing/essays">
      <SectionPageHero
        meta={writingMeta}
        eyebrow="Essays"
        title="The essays"
        body="Long-form thinking on tech, society, politics, innovation, research, and business. Filter by theme, search by phrase."
      />

      <section className="mx-auto max-w-6xl px-6 pb-6">
        <form action="/writing/essays" className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search essays…"
            className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none"
            style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
          />
          <select
            name="tag"
            defaultValue={tag}
            className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none"
            style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
          >
            <option value="">All themes</option>
            {tags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button type="submit" className="rounded-full px-5 py-3 text-sm font-medium" style={{ background: "var(--fg-strong)", color: "var(--bg)" }}>
            Filter
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {essays.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--surface)",
              boxShadow: "inset 0 0 0 1px var(--card-ring)",
            }}
          >
            <p className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
              {q || tag ? "Nothing matched." : "Essays are moving here from Substack."}
            </p>
            <p className="mt-3 text-sm text-[color:var(--fg)]/75">
              {q || tag ? (
                <Link href="/writing/essays" className="underline underline-offset-4">Reset filters</Link>
              ) : (
                <>Read them first at{" "}
                  <a href={writingLinks.substack} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">
                    Nuggets & Notes
                  </a>.
                </>
              )}
            </p>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--hairline)" }}>
            {essays.map((e) => (
              <li key={e.slug} className="border-b py-6" style={{ borderColor: "var(--hairline)" }}>
                <Link href={`/writing/essays/${e.slug}`} className="group grid gap-2">
                  <p className={`text-xs uppercase tracking-[0.22em] ${accentText(writingMeta.accent)}`}>
                    {e.date_published ? new Date(e.date_published).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }) : "Essay"}
                    {e.reading_time_min ? ` · ${e.reading_time_min} min read` : ""}
                  </p>
                  <h3 className="display-heading text-2xl leading-[1.15] tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
                    {e.title}
                  </h3>
                  {e.subtitle && (
                    <p className="text-[color:var(--fg)]/80">{e.subtitle}</p>
                  )}
                  {e.excerpt && (
                    <p className="max-w-3xl text-sm text-[color:var(--fg)]/70">{e.excerpt}</p>
                  )}
                  {e.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted" style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SectionShell>
  );
}
