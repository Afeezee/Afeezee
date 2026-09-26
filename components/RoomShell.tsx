import Link from "next/link";
import { ReactNode } from "react";
import { Identity, accentText, accentGlow } from "@/lib/identities";
import { Motif } from "./Motifs";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export type RoomHighlight = {
  title: string;
  meta?: string;
  body: string;
  href?: string;
  hrefLabel?: string;
};

export type RoomSection = {
  eyebrow: string;
  title: string;
  body?: string;
  items?: RoomHighlight[];
};

export function RoomShell({
  identity,
  intro,
  sections,
  aside,
}: {
  identity: Identity;
  intro: string;
  sections: RoomSection[];
  aside?: ReactNode;
}) {
  return (
    <main>
      <Nav />

      <section className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-36">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted transition hover:text-[color:var(--fg-strong)]"
        >
          <span aria-hidden>←</span>
          <span>Back to the hub</span>
        </Link>

        <div className="mt-10 flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-3 ${accentText(identity.accent)}`}>
              <Motif kind={identity.motif} />
              <span className="text-xs uppercase tracking-[0.28em]">
                {identity.label}
              </span>
            </div>
            <h1 className="display-heading mt-6 text-5xl leading-[1.02] tracking-tightest text-[color:var(--fg-strong)] sm:text-7xl">
              {identity.role.replace(/\.$/, "")}
              <span className={accentText(identity.accent)}>.</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-[color:var(--fg)]/80">
              {intro}
            </p>
          </div>

          <div
            aria-hidden
            className={`hidden h-40 w-40 rounded-full blur-3xl md:block ${accentGlow(
              identity.accent
            )}`}
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-24">
        {sections.map((section, idx) => (
          <section key={idx}>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
              <span
                className="inline-block h-px w-8"
                style={{ background: "var(--hairline-strong)" }}
              />
              <span>{section.eyebrow}</span>
            </div>
            <h2 className="display-heading mt-4 text-3xl tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
              {section.title}
            </h2>
            {section.body && (
              <p className="mt-4 max-w-2xl text-[color:var(--fg)]/80">
                {section.body}
              </p>
            )}
            {section.items && section.items.length > 0 && (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {section.items.map((it, i) => (
                  <li
                    key={i}
                    className="group relative overflow-hidden rounded-2xl p-6 transition"
                    style={{
                      background: "var(--surface)",
                      boxShadow: "inset 0 0 0 1px var(--card-ring)",
                    }}
                  >
                    {it.meta && (
                      <p
                        className={`text-xs uppercase tracking-[0.24em] ${accentText(
                          identity.accent
                        )}`}
                      >
                        {it.meta}
                      </p>
                    )}
                    <h3 className="display-heading mt-2 text-2xl tracking-tightest text-[color:var(--fg-strong)]">
                      {it.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg)]/80">
                      {it.body}
                    </p>
                    {it.href && (
                      <a
                        href={it.href}
                        target={it.href.startsWith("http") ? "_blank" : undefined}
                        rel={it.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className="mt-5 inline-flex items-center gap-2 text-sm text-[color:var(--fg-strong)] transition hover:opacity-80"
                      >
                        {it.hrefLabel ?? "Read more"}
                        <span aria-hidden>→</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {aside}

        <section
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "var(--surface)",
            boxShadow: "inset 0 0 0 1px var(--card-ring)",
          }}
        >
          <h2 className="display-heading text-3xl tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
            Get in touch about{" "}
            <span className={accentText(identity.accent)}>{identity.label.toLowerCase()}</span>{" "}
            work.
          </h2>
          <p className="mt-4 max-w-xl text-[color:var(--fg)]/80">
            Commissions, features, collaborations — the front-page contact form
            routes here.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition"
            style={{
              background: "var(--fg-strong)",
              color: "var(--bg)",
            }}
          >
            Write to me
            <span aria-hidden>→</span>
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  );
}
