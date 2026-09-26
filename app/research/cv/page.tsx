import type { Metadata } from "next";
import Image from "next/image";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { teaching } from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Academic CV for Afeez Ayomide Olagunju — full-stack engineer, researcher, doctoral candidate at Uniosun (CS) and OAU (SE).",
};

const CV_PDF = "/cv/afeez-olagunju-cv.pdf";
const CV_DOCX = "/cv/afeez-olagunju-cv.docx";

export default function CVPage() {
  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/cv">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="CV"
        title="Curriculum vitae"
        body="Institutional affiliations, teaching, doctoral programmes, and the record of shipped work — as a downloadable PDF."
      />

      <section className="mx-auto max-w-4xl px-6 pb-8">
        <div
          className="grid gap-6 rounded-2xl p-6 sm:grid-cols-[128px_1fr_auto] sm:items-center sm:p-8"
          style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
        >
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl ring-1 ring-[color:var(--hairline-strong)]">
            <Image
              src="/img/afeez.jpg"
              alt="Afeez Ayomide Olagunju"
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className={`text-xs uppercase tracking-[0.24em] ${accentText(researchMeta.accent)}`}>
              Afeez Ayomide Olagunju
            </p>
            <p className="mt-2 display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
              CV · Full-Stack Engineer & Researcher
            </p>
            <p className="mt-2 text-sm text-[color:var(--fg)]/75">
              Osun State, Nigeria · Two active doctoral programmes · 20+ courses taught · 30+ students supervised
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href={CV_PDF}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
              style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
            >
              Download PDF ↓
            </a>
            <a
              href={CV_DOCX}
              className="text-xs uppercase tracking-[0.18em] text-muted transition hover:text-[color:var(--fg-strong)]"
            >
              or .docx
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
          Education
        </h2>
        <ul className="mt-6 space-y-4 text-[color:var(--fg)]/85">
          <li>
            <p className="font-medium text-[color:var(--fg-strong)]">PhD, Computer Science</p>
            <p className="text-sm">Osun State University (Uniosun) · in progress</p>
          </li>
          <li>
            <p className="font-medium text-[color:var(--fg-strong)]">PhD, Software Engineering</p>
            <p className="text-sm">Obafemi Awolowo University (OAU) · in progress</p>
          </li>
          <li className="pt-2 text-sm text-muted">
            Prior degrees & certifications — see the downloadable CV above.
          </li>
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
          Teaching & academic roles
        </h2>
        <p className="mt-4 text-[color:var(--fg)]/85 leading-relaxed">{teaching.summary}</p>
        <ul className="mt-6 space-y-4">
          {teaching.roles.map((r) => (
            <li key={r.title}>
              <p className="font-medium text-[color:var(--fg-strong)]">{r.title}</p>
              <p className="text-sm text-[color:var(--fg)]/75">{r.org} · {r.window}</p>
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}
