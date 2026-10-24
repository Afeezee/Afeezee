import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { phdProgramme } from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "PhD",
  description:
    "Doctoral research on multimodal deep learning for real-time deepfake detection across video, audio, and image.",
};

export default function PhDPage() {
  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/phd">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="PhD"
        title="Multimodal deepfake detection"
        body="Doctoral research on how the machine imitates us — and how to catch it doing so in real time, across video, audio, and image at once."
      />

      <div className="mx-auto max-w-4xl space-y-16 px-6 pb-24">
        <Programme p={phdProgramme} />
      </div>
    </SectionShell>
  );
}

type Programme = {
  degree: string;
  focus: string;
  thesis: string;
  methodology: string;
  stage: string;
  linked?: readonly { label: string; href: string }[];
};

function Programme({ p }: { p: Programme }) {
  return (
    <section className="scroll-mt-32">
      <p className={`text-xs uppercase tracking-[0.24em] ${accentText(researchMeta.accent)}`}>
        {p.degree}
      </p>
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
