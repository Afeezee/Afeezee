import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import { productBySlug, cereusProducts, statusMeta } from "@/lib/content/startup";
import { accentText } from "@/lib/identities";

export function generateStaticParams() {
  return cereusProducts.map((p) => ({ product: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { product: string };
}): Metadata {
  const p = productBySlug[params.product];
  if (!p) return { title: "Product not found" };
  return {
    title: p.name,
    description: p.description,
    openGraph: {
      title: `${p.name} · Cereus Technologies`,
      description: p.description,
      type: "website",
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const p = productBySlug[params.product];
  if (!p) return notFound();

  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup/cereus">
      <article className="mx-auto max-w-4xl px-6 pt-14 pb-24">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em]">
          <span className={accentText(startupMeta.accent)}>
            {statusMeta[p.status].label}
          </span>
          <span className="text-muted">{p.category}</span>
        </div>

        <h1 className="display-heading mt-4 text-4xl leading-[1.05] tracking-tightest text-[color:var(--fg-strong)] sm:text-6xl">
          {p.name}
        </h1>
        <p className="mt-3 text-xl italic text-[color:var(--fg)]/80" style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}>
          {p.tagline}
        </p>

        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
          >
            Open {p.url.replace(/^https?:\/\//, "")}
            <span aria-hidden>↗</span>
          </a>
        )}

        <section className="mt-10">
          <h2 className="text-xs uppercase tracking-[0.24em] text-muted">Overview</h2>
          <p className="mt-3 text-[17px] leading-[1.85] text-[color:var(--fg)]/90">
            {p.longDescription ?? p.description}
          </p>
        </section>

        {p.techStack && p.techStack.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs uppercase tracking-[0.24em] text-muted">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.techStack.map((t) => (
                <li key={t}>
                  <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em] text-[color:var(--fg)]/85" style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}>
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section
          className="mt-8 rounded-2xl p-5 text-sm text-muted"
          style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
        >
          Screenshot / product imagery lands here once supplied.
        </section>

        {p.linkedTo && p.linkedTo.length > 0 && (
          <section className="mt-8">
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
        <Link href="/startup/cereus" className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[color:var(--fg-strong)]">
          ← All Cereus products
        </Link>
      </article>
    </SectionShell>
  );
}
