import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import { ventures } from "@/lib/content/startup";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Ventures",
  description: "Other ventures Afeezee is involved with beyond Cereus Technologies.",
};

export default function VenturesPage() {
  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup/ventures">
      <SectionPageHero
        meta={startupMeta}
        eyebrow="Ventures"
        title="Where else the work shows up"
        body="Beyond Cereus. Role tags stay honest — co-founder, advisor, or contributor — so the level of involvement is never overstated."
      />

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <ul className="space-y-4">
          {ventures.map((v) => (
            <li
              key={v.name}
              className="rounded-2xl p-6"
              style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={`text-xs uppercase tracking-[0.22em] ${accentText(startupMeta.accent)}`}>
                  {v.role}
                </p>
              </div>
              <h2 className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)]">
                {v.name}
              </h2>
              <p className="mt-3 text-[color:var(--fg)]/85">{v.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}
