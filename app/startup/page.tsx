import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import {
  founderBio,
  currentlyBuilding,
  featuredProducts,
  startupStats,
  statusMeta,
  preferredStack,
} from "@/lib/content/startup";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Startup",
  description:
    "Founder and technical lead of Cereus Technologies — 10+ shipped products across AI, health tech, EdTech, and creative tools, plus a growing portfolio of ventures.",
};

export default function StartupHome() {
  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup">
      <SectionPageHero
        meta={startupMeta}
        eyebrow="Startup"
        title="Ship fast, ship often, ship African"
        body={founderBio}
      />

      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
          <span className="inline-block h-px w-8" style={{ background: "var(--hairline-strong)" }} />
          <span>Currently building</span>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {currentlyBuilding.map((c) => (
            <li key={c.name}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5"
                style={{
                  background: "var(--surface)",
                  boxShadow: "inset 0 0 0 1px var(--card-ring)",
                }}
              >
                <p className={`text-xs uppercase tracking-[0.22em] ${accentText(startupMeta.accent)}`}>
                  Live focus
                </p>
                <p className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)]">
                  {c.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">
                  {c.description}
                </p>
                <p className="mt-6 text-sm text-[color:var(--fg-strong)]">Read more →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <dl className="grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4" style={{ borderColor: "var(--hairline)" }}>
          {startupStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="display-heading text-3xl leading-none tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
                {s.value}
              </dt>
              <dd className="text-xs uppercase tracking-[0.18em] text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
            Featured Cereus products
          </h2>
          <Link href="/startup/cereus" className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-[color:var(--fg-strong)]">
            Full portfolio →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/startup/cereus/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5"
                style={{
                  background: "var(--surface)",
                  boxShadow: "inset 0 0 0 1px var(--card-ring)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs uppercase tracking-[0.22em] ${accentText(startupMeta.accent)}`}>
                    {statusMeta[p.status].label}
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-muted">
                    {p.category}
                  </span>
                </div>
                <h3 className="display-heading mt-3 text-2xl leading-[1.1] tracking-tightest text-[color:var(--fg-strong)]">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm italic text-[color:var(--fg)]/70">{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">
                  {p.description}
                </p>
                {p.url && (
                  <p className="mt-4 text-xs text-muted">
                    {p.url.replace(/^https?:\/\//, "")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
          The stack I keep reaching for
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {preferredStack.map((s) => (
            <li key={s}>
              <span
                className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--fg)]/85"
                style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
              >
                {s}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-6">
        <Link
          href="/startup/connect"
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
          style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
        >
          Investors, co-founders, commissions
          <span aria-hidden>→</span>
        </Link>
      </section>
    </SectionShell>
  );
}
