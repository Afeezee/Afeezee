import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { bySlug, publications, statusLabel } from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = bySlug[params.slug];
  if (!p) return { title: "Publication not found" };
  return {
    title: p.title,
    description: p.abstract.slice(0, 160),
    openGraph: {
      title: p.title,
      description: p.abstract.slice(0, 160),
      type: "article",
    },
  };
}

export default function PublicationPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = bySlug[params.slug];
  if (!p) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title,
    author: p.coAuthors.map((a) => ({ "@type": "Person", name: a })),
    isPartOf: { "@type": "Periodical", name: p.venue },
    ...(p.doi ? { identifier: `doi:${p.doi}` } : {}),
    abstract: p.abstract,
  };

  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/publications">
      <article className="mx-auto max-w-3xl px-6 pt-14 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <p className={`text-xs uppercase tracking-[0.28em] ${accentText(researchMeta.accent)}`}>
          {statusLabel[p.status]} · {p.venue}
          {p.year ? ` · ${p.year}` : ""}
        </p>
        <h1 className="display-heading mt-4 text-3xl leading-[1.1] tracking-tightest text-[color:var(--fg-strong)] sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-6 text-sm text-[color:var(--fg)]/80">{p.coAuthors.join(", ")}</p>

        <section className="mt-10">
          <h2 className="text-xs uppercase tracking-[0.24em] text-muted">Abstract</h2>
          <p className="mt-3 text-[17px] leading-[1.85] text-[color:var(--fg)]/90">
            {p.abstract}
          </p>
          {p.abstractLong && (
            <p className="mt-4 text-[17px] leading-[1.85] text-[color:var(--fg)]/85">
              {p.abstractLong}
            </p>
          )}
        </section>

        {p.keywords && (
          <section className="mt-8">
            <h2 className="text-xs uppercase tracking-[0.24em] text-muted">Keywords</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.keywords.map((k) => (
                <span key={k} className="rounded-full px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-[color:var(--fg)]/85" style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}>
                  {k}
                </span>
              ))}
            </div>
          </section>
        )}

        {(p.doi || p.pdfUrl) && (
          <section className="mt-8 flex flex-wrap gap-3">
            {p.pdfUrl && (
              <a href={p.pdfUrl} target="_blank" rel="noreferrer noopener" className="rounded-full px-4 py-2 text-sm" style={{ background: "var(--fg-strong)", color: "var(--bg)" }}>
                Download PDF ↓
              </a>
            )}
            {p.doi && (
              <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer noopener" className="rounded-full px-4 py-2 text-sm text-[color:var(--fg-strong)]" style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}>
                doi.org/{p.doi} ↗
              </a>
            )}
          </section>
        )}

        {!p.pdfUrl && !p.doi && (
          <p className="mt-8 text-sm text-muted">
            PDF / DOI to be added once the record is finalised.
          </p>
        )}

        {p.linkedTo && p.linkedTo.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-[0.24em] text-muted">Related</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {p.linkedTo.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[color:var(--fg-strong)] underline underline-offset-4">
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <hr className="mt-12" style={{ borderColor: "var(--hairline)" }} />
        <Link href="/research/publications" className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[color:var(--fg-strong)]">
          ← All publications
        </Link>
      </article>
    </SectionShell>
  );
}
