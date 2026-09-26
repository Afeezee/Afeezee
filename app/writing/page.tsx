import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { writingLinks } from "@/lib/content/writing";
import { listPoems, listEssays } from "@/lib/queries";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Poems and essays by Afeezee — 200+ poems and a growing body of essays on tech, society, politics, innovation, research, and business.",
};

export const revalidate = 60;

export default async function WritingHome() {
  const [featuredPoems, featuredEssays, recentPoems, recentEssays] =
    await Promise.all([
      listPoems({ featured: true, limit: 3 }),
      listEssays({ featured: true, limit: 3 }),
      listPoems({ limit: 4 }),
      listEssays({ limit: 3 }),
    ]);

  const showFeatured = featuredPoems.length > 0 || featuredEssays.length > 0;

  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing">
      <SectionPageHero
        meta={writingMeta}
        eyebrow="Writing"
        title="Writing to make sense of things"
        body="Over 200 poems and a growing body of essays covering technology, society, politics, innovation, research, and business. New work goes out first through the newsletter; permanent versions live here."
      />

      <div className="mx-auto grid max-w-6xl gap-4 px-6 pb-4 sm:grid-cols-3">
        <TileLink href="/writing/poems" label="Poems" meta="Browse the archive" />
        <TileLink href="/writing/essays" label="Essays" meta="Long-form thinking" />
        <TileLink href={writingLinks.substack} external label="Nuggets & Notes" meta="Substack newsletter" />
      </div>

      {showFeatured && (
        <Featured
          poems={featuredPoems}
          essays={featuredEssays}
        />
      )}

      {!showFeatured && (
        <EmptyArchiveNotice />
      )}

      <RecentGrid recentPoems={recentPoems} recentEssays={recentEssays} />

      <div className="mx-auto max-w-6xl px-6 pt-4 pb-24">
        <p className="text-sm text-muted">
          Want new work in your inbox first? Subscribe to{" "}
          <a
            href={writingLinks.substack}
            target="_blank"
            rel="noreferrer noopener"
            className={`underline underline-offset-4 ${accentText(writingMeta.accent)}`}
          >
            Nuggets & Notes
          </a>
          .
        </p>
      </div>
    </SectionShell>
  );
}

function TileLink({
  href,
  label,
  meta,
  external,
}: {
  href: string;
  label: string;
  meta: string;
  external?: boolean;
}) {
  const Cmp: any = external ? "a" : Link;
  return (
    <Cmp
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="group flex items-center justify-between rounded-2xl p-5 transition hover:-translate-y-0.5"
      style={{
        background: "var(--surface)",
        boxShadow: "inset 0 0 0 1px var(--card-ring)",
      }}
    >
      <div>
        <p className="display-heading text-xl tracking-tightest text-[color:var(--fg-strong)]">
          {label}
        </p>
        <p className="text-xs uppercase tracking-[0.22em] text-muted">{meta}</p>
      </div>
      <span aria-hidden className="text-lg text-muted transition group-hover:translate-x-0.5">
        →
      </span>
    </Cmp>
  );
}

function Featured({
  poems,
  essays,
}: {
  poems: any[];
  essays: any[];
}) {
  const rows = [
    ...poems.map((p) => ({ ...p, kind: "poem" as const })),
    ...essays.map((e) => ({ ...e, kind: "essay" as const })),
  ];
  if (rows.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
        <span className="inline-block h-px w-8" style={{ background: "var(--hairline-strong)" }} />
        <span>Featured</span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <li key={`${r.kind}-${r.slug}`}>
            <Link
              href={`/writing/${r.kind === "poem" ? "poems" : "essays"}/${r.slug}`}
              className="group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5"
              style={{
                background: "var(--surface)",
                boxShadow: "inset 0 0 0 1px var(--card-ring)",
              }}
            >
              <p className={`text-xs uppercase tracking-[0.24em] ${accentText(writingMeta.accent)}`}>
                {r.kind === "poem" ? "Poem" : "Essay"}
              </p>
              <h3 className="display-heading mt-3 text-2xl leading-[1.1] tracking-tightest text-[color:var(--fg-strong)]">
                {r.title}
              </h3>
              {r.excerpt && (
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">
                  {r.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RecentGrid({
  recentPoems,
  recentEssays,
}: {
  recentPoems: any[];
  recentEssays: any[];
}) {
  if (recentPoems.length === 0 && recentEssays.length === 0) return null;
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2">
      {recentPoems.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
              Recent poems
            </h2>
            <Link href="/writing/poems" className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-[color:var(--fg-strong)]">
              All poems →
            </Link>
          </div>
          <ul className="divide-y" style={{ borderColor: "var(--hairline)" }}>
            {recentPoems.map((p) => (
              <li key={p.slug} className="py-3" style={{ borderColor: "var(--hairline)" }}>
                <Link href={`/writing/poems/${p.slug}`} className="group flex items-center justify-between gap-3">
                  <span className="display-heading text-lg tracking-tightest text-[color:var(--fg-strong)]">
                    {p.title}
                  </span>
                  <span aria-hidden className="text-muted transition group-hover:translate-x-0.5">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recentEssays.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
              Recent essays
            </h2>
            <Link href="/writing/essays" className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-[color:var(--fg-strong)]">
              All essays →
            </Link>
          </div>
          <ul className="divide-y" style={{ borderColor: "var(--hairline)" }}>
            {recentEssays.map((e) => (
              <li key={e.slug} className="py-3" style={{ borderColor: "var(--hairline)" }}>
                <Link href={`/writing/essays/${e.slug}`} className="group flex items-center justify-between gap-3">
                  <span className="display-heading text-lg tracking-tightest text-[color:var(--fg-strong)]">
                    {e.title}
                  </span>
                  <span aria-hidden className="text-muted transition group-hover:translate-x-0.5">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function EmptyArchiveNotice() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: "var(--surface)",
          boxShadow: "inset 0 0 0 1px var(--card-ring)",
        }}
      >
        <p className={`text-xs uppercase tracking-[0.24em] ${accentText(writingMeta.accent)}`}>
          Archive · consolidating
        </p>
        <h2 className="display-heading mt-3 text-2xl leading-[1.1] tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
          The archive is moving here from AllPoetry and Substack.
        </h2>
        <p className="mt-3 max-w-2xl text-[color:var(--fg)]/80">
          Existing work still lives at{" "}
          <a
            href={writingLinks.allPoetry}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4"
          >
            allpoetry.com/Afeezee
          </a>
          . New poems and essays go out first through{" "}
          <a
            href={writingLinks.substack}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4"
          >
            Nuggets & Notes
          </a>
          , then land on this site. As pieces are migrated in, they'll show up
          under Poems and Essays.
        </p>
      </div>
    </section>
  );
}
