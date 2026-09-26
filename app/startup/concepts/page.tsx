import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import { concepts } from "@/lib/content/startup";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Concepts",
  description: "What's next — early-stage concepts and building-toward-demo bets.",
};

export default function ConceptsPage() {
  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup/concepts">
      <SectionPageHero
        meta={startupMeta}
        eyebrow="Concepts"
        title="What's next"
        body="Not shipped yet. Not pretending to be. Concepts and building-toward-demo bets, framed as ideas rather than announcements."
      />

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <ul className="space-y-4">
          {concepts.map((c) => (
            <li
              id={c.name.toLowerCase().replace(/\s+/g, "-")}
              key={c.name}
              className="scroll-mt-32 rounded-2xl p-6 sm:p-8"
              style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
            >
              <p className={`text-xs uppercase tracking-[0.22em] ${accentText(startupMeta.accent)}`}>
                {c.stage}
              </p>
              <h2 className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
                {c.name}
              </h2>
              <p className="mt-2 text-lg italic text-[color:var(--fg)]/75" style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}>
                {c.tagline}
              </p>
              <p className="mt-4 text-[color:var(--fg)]/85 leading-relaxed">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}
