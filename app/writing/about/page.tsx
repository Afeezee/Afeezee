import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { writerBio, writingLinks } from "@/lib/content/writing";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "About the writing",
  description: "How Afeezee writes, where the work lives, and why.",
};

export default function WritingAbout() {
  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing/about">
      <SectionPageHero
        meta={writingMeta}
        eyebrow="About"
        title="Afeezee, the writer"
        body="How he writes, where the work lives, and why."
      />

      <section className="mx-auto max-w-2xl px-6 pb-16">
        <p className="text-lg leading-[1.85] text-[color:var(--fg)]/90">
          {writerBio}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            label="AllPoetry"
            body="Where most of the 200+ poems still live while they're consolidated here."
            href={writingLinks.allPoetry}
          />
          <Card
            label="Nuggets & Notes"
            body="Substack newsletter. Poems and essays go out here first."
            href={writingLinks.substack}
          />
          <Card
            label="This archive"
            body="The permanent, citable home for the poems and essays as they migrate over."
            href="/writing"
            internal
          />
        </div>
      </section>
    </SectionShell>
  );
}

function Card({
  label,
  body,
  href,
  internal,
}: {
  label: string;
  body: string;
  href: string;
  internal?: boolean;
}) {
  return (
    <a
      href={href}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noreferrer noopener"}
      className="group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5"
      style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
    >
      <p className={`text-xs uppercase tracking-[0.24em] ${accentText(writingMeta.accent)}`}>{internal ? "here" : "external"}</p>
      <p className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)]">{label}</p>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">{body}</p>
      <p className="mt-6 text-sm text-[color:var(--fg-strong)]">Open →</p>
    </a>
  );
}
