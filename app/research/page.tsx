import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import {
  researchBio,
  researchInterests,
  currentlyLine,
  publications,
  statusLabel,
  phdProgrammes,
} from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Two concurrent PhDs — multimodal deepfake detection (Uniosun) and writing-process provenance & academic integrity (OAU) — plus a portfolio of applied AI research.",
};

export default function ResearchHome() {
  const recent = publications.slice(0, 4);

  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="Research"
        title="Two PhDs, one question"
        body={researchBio}
      />

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
        >
          <p className={`text-xs uppercase tracking-[0.24em] ${accentText(researchMeta.accent)}`}>
            Currently
          </p>
          <p className="mt-3 text-[color:var(--fg)]/85">{currentlyLine}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
            Research interests
          </h2>
          <Link href="/research/publications" className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-[color:var(--fg-strong)]">
            All publications →
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {researchInterests.map((k) => (
            <li key={k}>
              <span
                className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--fg)]/85"
                style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
              >
                {k}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
          <span className="inline-block h-px w-8" style={{ background: "var(--hairline-strong)" }} />
          <span>Doctoral programmes</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <PhDCard programme="uniosun" />
          <PhDCard programme="oau" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
            Recent outputs
          </h2>
          <Link href="/research/publications" className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-[color:var(--fg-strong)]">
            See all →
          </Link>
        </div>
        <ul className="divide-y" style={{ borderColor: "var(--hairline)" }}>
          {recent.map((p) => (
            <li key={p.slug} className="border-b py-5" style={{ borderColor: "var(--hairline)" }}>
              <Link href={`/research/publications/${p.slug}`} className="group grid gap-1">
                <p className={`text-xs uppercase tracking-[0.22em] ${accentText(researchMeta.accent)}`}>
                  {statusLabel[p.status]} · {p.venue}
                </p>
                <p className="display-heading text-xl leading-[1.2] tracking-tightest text-[color:var(--fg-strong)]">
                  {p.title}
                </p>
                <p className="text-sm text-[color:var(--fg)]/70">{p.coAuthors.join(", ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}

function PhDCard({ programme }: { programme: "uniosun" | "oau" }) {
  const p = phdProgrammes[programme];
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
    >
      <p className={`text-xs uppercase tracking-[0.22em] ${accentText(researchMeta.accent)}`}>
        {p.degree}
      </p>
      <p className="display-heading mt-2 text-xl tracking-tightest text-[color:var(--fg-strong)]">
        {p.institution}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[color:var(--fg)]/80">
        <span className="font-medium text-[color:var(--fg-strong)]">Focus.</span> {p.focus}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">
        <span className="font-medium text-[color:var(--fg-strong)]">Stage.</span> {p.stage}
      </p>
      <Link href="/research/phd" className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--fg-strong)]">
        Both programmes in detail →
      </Link>
    </div>
  );
}
