import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { publications, statusLabel, PubStatus } from "@/lib/content/research";
import { accentText } from "@/lib/identities";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Publications by Afeez Ayomide Olagunju — deepfake detection, AI fairness, academic integrity, digital financial inclusion, and adjacent applied AI.",
};

const filters: { value: PubStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "under-review", label: "Under review" },
  { value: "in-preparation", label: "In preparation" },
  { value: "submitted", label: "Submitted" },
];

export default function PublicationsPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = (searchParams?.status ?? "all") as PubStatus | "all";
  const rows =
    status === "all"
      ? publications
      : publications.filter((p) => p.status === status);

  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/publications">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="Publications"
        title="Selected publications"
        body="Full list of published, under-review, submitted, and in-preparation work. Filter by status; open a publication for the full record."
      />

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <nav className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = status === f.value;
            const href = f.value === "all" ? "/research/publications" : `/research/publications?status=${f.value}`;
            return (
              <Link
                key={f.value}
                href={href}
                className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
                  active ? "bg-[color:var(--fg-strong)] text-[color:var(--bg)]" : "text-muted"
                }`}
                style={active ? undefined : { boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
              >
                {f.label}
              </Link>
            );
          })}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ul className="divide-y" style={{ borderColor: "var(--hairline)" }}>
          {rows.map((p) => (
            <li key={p.slug} className="border-b py-6" style={{ borderColor: "var(--hairline)" }}>
              <Link href={`/research/publications/${p.slug}`} className="group grid gap-2">
                <p className={`text-xs uppercase tracking-[0.22em] ${accentText(researchMeta.accent)}`}>
                  {statusLabel[p.status]} · {p.venue}{p.year ? ` · ${p.year}` : ""}
                </p>
                <h2 className="display-heading text-2xl leading-[1.15] tracking-tightest text-[color:var(--fg-strong)] sm:text-3xl">
                  {p.title}
                </h2>
                <p className="text-sm text-[color:var(--fg)]/75">{p.coAuthors.join(", ")}</p>
                <p className="max-w-3xl text-sm text-[color:var(--fg)]/80">{p.abstract}</p>
                {p.keywords && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {p.keywords.map((k) => (
                      <span key={k} className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted" style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}>
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}
