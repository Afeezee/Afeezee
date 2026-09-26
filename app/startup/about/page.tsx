import type { Metadata } from "next";
import Image from "next/image";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import { founderBio, preferredStack } from "@/lib/content/startup";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "About the founder",
  description: "Fuller founder story — technical background, two concurrent PhDs, prior university teaching, and the stack he keeps reaching for.",
};

export default function StartupAbout() {
  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup/about">
      <SectionPageHero
        meta={startupMeta}
        eyebrow="About"
        title="Afeezee, the founder"
        body="Two concurrent PhDs, prior university teaching, and a decade of shipping. This is the founder story — how the researcher and the builder feed each other."
      />

      <section className="mx-auto grid max-w-5xl gap-8 px-6 pb-12 md:grid-cols-[220px_1fr] md:items-start">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-3xl md:mx-0"
             style={{ boxShadow: "inset 0 0 0 1px var(--card-ring)", background: "var(--surface)" }}>
          <Image
            src="/img/afeez.jpg"
            alt="Afeez Ayomide Olagunju"
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>
        <p className="text-lg leading-[1.85] text-[color:var(--fg)]/90">{founderBio}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className={`text-xs uppercase tracking-[0.24em] ${accentText(startupMeta.accent)}`}>Preferred stack</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
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
        <p className="mt-6 text-sm text-muted">
          Same stack Cereus offers via its Base44-to-Next.js migration service.
        </p>
      </section>
    </SectionShell>
  );
}
