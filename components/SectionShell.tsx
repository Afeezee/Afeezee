import Link from "next/link";
import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Motif } from "./Motifs";
import { accentText, accentGlow } from "@/lib/identities";

export type SubnavItem = { label: string; href: string };

export type SectionMeta = {
  identityId: "writer" | "researcher" | "founder";
  label: string;
  accent: string;
  motif: "wave" | "code" | "ink" | "paper" | "rocket" | "heart";
  root: string;
};

export function SectionShell({
  meta,
  subnav,
  currentHref,
  children,
}: {
  meta: SectionMeta;
  subnav: SubnavItem[];
  currentHref?: string;
  children: ReactNode;
}) {
  return (
    <main>
      <Nav />

      <div className="mx-auto max-w-6xl px-6 pt-24 sm:pt-28">
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b py-4"
          style={{ borderColor: "var(--hairline)" }}
        >
          <Link
            href={meta.root}
            className={`inline-flex items-center gap-3 ${accentText(meta.accent)}`}
          >
            <Motif kind={meta.motif} />
            <span className="text-xs uppercase tracking-[0.28em]">{meta.label}</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.22em] text-muted">
            {subnav.map((item) => {
              const isCurrent = currentHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isCurrent
                      ? "text-[color:var(--fg-strong)]"
                      : "transition hover:text-[color:var(--fg-strong)]"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="relative">
        <span
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-6 -z-10 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl opacity-50 ${accentGlow(
            meta.accent
          )}`}
        />
        {children}
      </div>

      <Footer />
    </main>
  );
}

export function SectionPageHero({
  eyebrow,
  title,
  body,
  meta,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  meta: SectionMeta;
}) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-12 pb-10 sm:pt-16">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
        <span
          className="inline-block h-px w-8"
          style={{ background: "var(--hairline-strong)" }}
        />
        <span>{eyebrow}</span>
      </div>
      <h1 className="display-heading mt-6 text-4xl leading-[1.02] tracking-tightest text-[color:var(--fg-strong)] sm:text-6xl">
        {title}
        <span className={accentText(meta.accent)}>.</span>
      </h1>
      {body && (
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--fg)]/85">
          {body}
        </p>
      )}
    </header>
  );
}
