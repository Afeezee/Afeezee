"use client";

import { motion } from "framer-motion";
import { identities, accentText, accentGlow } from "@/lib/identities";
import { Motif } from "./Motifs";

export function IdentityCards() {
  return (
    <section id="identities" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="display-heading text-3xl tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
          Six rooms.
        </h2>
        <span className="text-xs uppercase tracking-[0.28em] text-muted">
          01 → 06
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {identities.map((it, idx) => (
          <motion.li
            key={it.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noreferrer noopener" : undefined}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 backdrop-blur transition hover:-translate-y-0.5 sm:p-7"
              style={{
                background: "var(--surface)",
                boxShadow: "inset 0 0 0 1px var(--card-ring)",
              }}
            >
              {/* accent glow */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-40 ${accentGlow(
                  it.accent
                )}`}
              />

              <header>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted">
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                  <span className={accentText(it.accent)}>
                    {it.external ? "external" : "afeezee.com"}
                  </span>
                </div>

                <div className={`mt-6 ${accentText(it.accent)}`}>
                  <Motif kind={it.motif} />
                </div>

                <h3 className="display-heading mt-6 text-3xl leading-none tracking-tightest text-[color:var(--fg-strong)]">
                  {it.label}
                </h3>
                <p className="mt-2 text-sm italic text-[color:var(--fg)]/70">{it.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--fg)]/80">
                  {it.blurb}
                </p>
              </header>

              <footer
                className="mt-8 flex items-center justify-between pt-5 text-sm"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <span className="text-[color:var(--fg-strong)]">{it.cta}</span>
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full transition group-hover:translate-x-0.5"
                  style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
                >
                  →
                </span>
              </footer>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
