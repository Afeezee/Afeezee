import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { getPoem, relatedPoems } from "@/lib/queries";
import { accentText } from "@/lib/identities";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const poem = await getPoem(params.slug);
  if (!poem) return { title: "Poem not found" };
  return {
    title: poem.title,
    description: poem.excerpt ?? poem.body.slice(0, 160),
    openGraph: {
      title: poem.title,
      description: poem.excerpt ?? poem.body.slice(0, 160),
      type: "article",
    },
  };
}

export default async function PoemPage({
  params,
}: {
  params: { slug: string };
}) {
  const poem = await getPoem(params.slug);
  if (!poem) return notFound();

  const related = await relatedPoems(poem, 3);

  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing/poems">
      <article className="mx-auto max-w-2xl px-6 pt-14 pb-24">
        <p className={`text-xs uppercase tracking-[0.28em] ${accentText(writingMeta.accent)}`}>
          Poem
          {poem.date_published ? ` · ${new Date(poem.date_published).getFullYear()}` : ""}
        </p>
        <h1 className="display-heading mt-4 text-4xl leading-[1.05] tracking-tightest text-[color:var(--fg-strong)] sm:text-5xl">
          {poem.title}
        </h1>

        <div
          className="mt-10 whitespace-pre-line text-lg leading-[1.9] text-[color:var(--fg)]/90"
          style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
        >
          {poem.body}
        </div>

        {poem.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {poem.tags.map((t) => (
              <Link
                key={t}
                href={`/writing/poems?tag=${encodeURIComponent(t)}`}
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
          href="/writing/poems"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[color:var(--fg-strong)]"
        >
          ← All poems
        </Link>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
            Related poems
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/writing/poems/${r.slug}`}
                  className="group block rounded-2xl p-5 transition hover:-translate-y-0.5"
                  style={{
                    background: "var(--surface)",
                    boxShadow: "inset 0 0 0 1px var(--card-ring)",
                  }}
                >
                  <p className="display-heading text-xl leading-[1.15] tracking-tightest text-[color:var(--fg-strong)]">
                    {r.title}
                  </p>
                  {r.excerpt && (
                    <p className="mt-2 text-sm text-[color:var(--fg)]/75">{r.excerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SectionShell>
  );
}
