import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { phdProgrammes } from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "PhD",
  description:
    "Both doctoral programmes — Uniosun (Computer Science, multimodal deepfake detection) and OAU (Software Engineering, writing-process provenance & academic integrity).",
};

export default function PhDPage() {
  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/phd">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="PhD"
        title="Two doctoral programmes"
        body="One on how the machine imitates us; one on how the machine writes with us. Both anchored in applied AI, both currently active."
      />

      <div className="mx-auto max-w-4xl space-y-16 px-6 pb-24">
        <Programme id="uniosun" p={phdProgrammes.uniosun} />
        <Programme id="oau" p={phdProgrammes.oau} />
      </div>
    </SectionShell>
  );
}

type Programme = {
  institution: string;
  degree: string;
  focus: string;
  thesis: string;
  methodology: string;
  stage: string;
  linked?: readonly { label: string; href: string }[];
};

function Programme({ id, p }: { id: string; p: Programme }) {
  return (
    <section id={id} className="scroll-mt-32">
      <p className={`text-xs uppercase tracking-[0.24em] ${accentText(researchMeta.accent)}`}>
        {p.degree}
      </p>
      <h2 className="display-heading mt-3 text-3xl leading-[1.1] tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
        {p.institution}
      </h2>

      <dl className="mt-8 grid gap-6 sm:grid-cols-[160px_1fr]">
        <Row label="Focus" body={p.focus} />
        <Row label="Thesis" body={p.thesis} />
        <Row label="Methodology" body={p.methodology} />
        <Row label="Stage" body={p.stage} />
      </dl>

      {p.linked && p.linked.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {p.linked.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-[color:var(--fg-strong)]"
              style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
            >
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function Row({ label, body }: { label: string; body: string }) {
  return (
    <>
      <dt className="text-xs uppercase tracking-[0.24em] text-muted">{label}</dt>
      <dd className="text-[color:var(--fg)]/85 leading-relaxed">{body}</dd>
    </>
  );
}
