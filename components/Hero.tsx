"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const roles = [
  "a musician.",
  "a writer.",
  "a researcher.",
  "a developer.",
  "a startup founder.",
  "a mental health advocate.",
];

const stats = [
  { value: "2", label: "concurrent PhDs" },
  { value: "6", label: "EPs & albums" },
  { value: "30+", label: "tracks released" },
  { value: "200+", label: "poems written" },
  { value: "10+", label: "products under Cereus" },
  { value: "30+", label: "students supervised" },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
            <span
              className="inline-block h-px w-8"
              style={{ background: "var(--hairline-strong)" }}
            />
            <span>Afeez Ayomide Olagunju</span>
          </div>

          <h1 className="display-heading mt-6 text-5xl leading-[0.98] tracking-tightest text-[color:var(--fg-strong)] sm:text-7xl md:text-[96px]">
            Afeezee is
            <br />
            <span className="relative inline-block h-[1.05em] align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[i]}
                  initial={{ y: "0.4em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-0.4em", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic text-[color:var(--fg-strong)]"
                >
                  {roles[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[color:var(--fg)]/85">
            Afeezee is a builder across disciplines — a musician, a writer, a
            researcher, a developer, a startup founder, and a mental health
            advocate. Based in Osun State, Nigeria, he moves between studio, page,
            lab, codebase, and boardroom, treating each as another way of making
            something that matters.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <a
              href="#identities"
              className="group inline-flex items-center gap-2 text-[color:var(--fg-strong)]"
            >
              <span>Explore the six</span>
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <span
              className="hidden h-3 w-px sm:inline-block"
              style={{ background: "var(--hairline-strong)" }}
            />
            <a href="#contact" className="transition hover:text-[color:var(--fg-strong)]">Get in touch</a>
          </div>
        </div>

        <Portrait />
      </div>

      <dl
        className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-8 sm:grid-cols-3 lg:grid-cols-6"
        style={{ borderColor: "var(--hairline)" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <dt className="display-heading text-3xl leading-none tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
              {s.value}
            </dt>
            <dd className="text-xs uppercase tracking-[0.18em] text-muted">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Portrait() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative mx-auto w-full max-w-[380px] lg:mt-6"
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-3xl"
        style={{
          boxShadow: "inset 0 0 0 1px var(--card-ring)",
          background: "var(--surface)",
        }}
      >
        <Image
          src="/img/afeez.jpg"
          alt="Afeez Ayomide Olagunju, portrait in a green agbada"
          fill
          sizes="(min-width: 1024px) 380px, 80vw"
          className="object-cover"
          priority
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted">
        <span>Osun State · Nigeria</span>
        <span>2026</span>
      </figcaption>
    </motion.figure>
  );
}
