import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import { cereusProducts, statusMeta, cuas, migrationService, preferredStack } from "@/lib/content/startup";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Cereus Technologies",
  description:
    "The full Cereus Technologies portfolio — flagship products, hackathon builds, shipped positioning bets, and the currently-active AntiBite build.",
};

export default function CereusPage() {
  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup/cereus">
      <SectionPageHero
        meta={startupMeta}
        eyebrow="Cereus Technologies"
        title="A venture studio for AI-native builds"
        body="Co-founded with Abe Enoch. 10+ shipped products across AI, health tech, EdTech, and creative tools. Ships fast, positions well, and — with AntiBite — keeps one hand on an active build at all times."
      />

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
        >
          <p className={`text-xs uppercase tracking-[0.24em] ${accentText(startupMeta.accent)}`}>
            Featured · institutional
          </p>
          <h2 className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
            {cuas.name}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--fg)]/80">{cuas.detail}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted">
            {cuas.status}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
            Products
          </h2>
          <span className="text-xs uppercase tracking-[0.22em] text-muted">
            {cereusProducts.length} builds
          </span>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cereusProducts.map((p) => (
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
                  <span className="text-xs uppercase tracking-[0.22em] text-muted">{p.category}</span>
                </div>
                <h3 className="display-heading mt-3 text-xl leading-[1.15] tracking-tightest text-[color:var(--fg-strong)]">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm italic text-[color:var(--fg)]/70">{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">{p.description}</p>
                {p.url && (
                  <p className="mt-4 text-xs text-muted">{p.url.replace(/^https?:\/\//, "")}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
        >
          <p className={`text-xs uppercase tracking-[0.24em] ${accentText(startupMeta.accent)}`}>Service</p>
          <h2 className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
            {migrationService.name}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--fg)]/80">{migrationService.summary}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">
            The stack we standardise on: {preferredStack.join(" · ")}
          </p>
        </div>
      </section>
    </SectionShell>
  );
}
