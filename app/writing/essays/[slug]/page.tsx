import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { getEssay, listEssays } from "@/lib/queries";
import { accentText } from "@/lib/identities";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const essay = await getEssay(params.slug);
  if (!essay) return { title: "Essay not found" };
  return {
    title: essay.title,
    description: essay.excerpt ?? essay.subtitle ?? essay.body.slice(0, 160),
    openGraph: {
      title: essay.title,
      description: essay.excerpt ?? essay.subtitle ?? essay.body.slice(0, 160),
      type: "article",
    },
  };
}

// Very small markdown renderer — headings, blockquote, and paragraphs.
// Keeps essays legible without shipping a full parser.
function renderBody(body: string) {
  const blocks = body.split(/\n{2,}/g);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={i} className="display-heading mt-10 text-xl tracking-tightest text-[color:var(--fg-strong)]">
          {trimmed.replace(/^### /, "")}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="display-heading mt-12 text-2xl tracking-tightest text-[color:var(--fg-strong)]">
          {trimmed.replace(/^## /, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-8 border-l-2 pl-5 text-[color:var(--fg-strong)]"
          style={{ borderColor: "var(--hairline-strong)", fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
        >
          <p className="text-xl italic leading-relaxed">
            {trimmed.replace(/^> /, "")}
          </p>
        </blockquote>
      );
    }
    return (
      <p key={i} className="mt-5 text-[17px] leading-[1.8] text-[color:var(--fg)]/90">
        {trimmed}
      </p>
    );
  });
}

export default async function EssayPage({
  params,
}: {
  params: { slug: string };
}) {
  const essay = await getEssay(params.slug);
  if (!essay) return notFound();

  const related = essay.tags?.length
    ? (await listEssays({ tag: essay.tags[0], limit: 4 })).filter((e) => e.slug !== essay.slug).slice(0, 3)
    : [];

  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing/essays">
      <article className="mx-auto max-w-2xl px-6 pt-14 pb-24">
        <p className={`text-xs uppercase tracking-[0.28em] ${accentText(writingMeta.accent)}`}>
          Essay
          {essay.date_published ? ` · ${new Date(essay.date_published).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}` : ""}
          {essay.reading_time_min ? ` · ${essay.reading_time_min} min read` : ""}
        </p>
        <h1 className="display-heading mt-4 text-4xl leading-[1.05] tracking-tightest text-[color:var(--fg-strong)] sm:text-5xl">
          {essay.title}
        </h1>
        {essay.subtitle && (
          <p className="mt-4 text-xl italic text-[color:var(--fg)]/80" style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}>
            {essay.subtitle}
          </p>
        )}

        <div className="mt-8">{renderBody(essay.body)}</div>

        {essay.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {essay.tags.map((t) => (
              <Link
                key={t}
                href={`/writing/essays?tag=${encodeURIComponent(t)}`}
                className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted transition hover:text-[color:var(--fg-strong)]"
                style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        <hr className="mt-12" style={{ borderColor: "var(--hairline)" }} />
        <Link
          href="/writing/essays"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[color:var(--fg-strong)]"
        >
          ← All essays
        </Link>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">Related essays</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/writing/essays/${r.slug}`} className="block rounded-2xl p-5 transition hover:-translate-y-0.5" style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}>
                  <p className="display-heading text-xl leading-[1.15] tracking-tightest text-[color:var(--fg-strong)]">{r.title}</p>
                  {r.excerpt && <p className="mt-2 text-sm text-[color:var(--fg)]/75">{r.excerpt}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SectionShell>
  );
}
