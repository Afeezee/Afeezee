import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { ongoingIdeas } from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Ongoing",
  description: "Early-stage research ideas not yet formalised into papers.",
};

export default function OngoingPage() {
  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/ongoing">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="Ongoing"
        title="What I'm exploring next"
        body="Ideas that don't yet have a paper attached — early notes, dataset sketches, and problems I keep circling back to. Framed honestly: proposals, not results."
      />

      <section className="mx-auto max-w-4xl space-y-6 px-6 pb-24">
        {ongoingIdeas.map((idea) => (
          <article
            key={idea.title}
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
          >
            <p className={`text-xs uppercase tracking-[0.22em] ${accentText(researchMeta.accent)}`}>
              {idea.stage}
            </p>
            <h2 className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
              {idea.title}
            </h2>
            <p className="mt-4 text-[color:var(--fg)]/85 leading-relaxed">{idea.body}</p>
          </article>
        ))}
      </section>
    </SectionShell>
  );
}
