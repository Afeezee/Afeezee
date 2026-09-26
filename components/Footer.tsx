import { identities } from "@/lib/identities";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/afeez-olagunju/" },
  { label: "Instagram", href: "https://instagram.com/AfeezeeHQ" },
  { label: "TikTok", href: "https://tiktok.com/@AfeezeeHQ" },
  { label: "X", href: "https://x.com/AfeezeeHQ" },
  { label: "GitHub", href: "https://github.com/Afeezee" },
  { label: "AllPoetry", href: "https://allpoetry.com/Afeezee" },
  { label: "Substack", href: "https://afeezeenotes.substack.com" },
  { label: "Email", href: "mailto:olagunjuafeez@gmail.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="display-heading text-2xl tracking-tightest text-[color:var(--fg-strong)]">
            Afeezee.
          </p>
          <p className="mt-3 max-w-sm text-sm text-[color:var(--fg)]/75">
            Musician, writer, researcher, developer, founder, advocate — building
            out of Osun State, Nigeria.
          </p>
          <p className="mt-4 text-xs text-muted">
            <a
              href="mailto:olagunjuafeez@gmail.com"
              className="transition hover:text-[color:var(--fg-strong)]"
            >
              olagunjuafeez@gmail.com
            </a>
          </p>
        </div>

        <nav>
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Rooms</p>
          <ul className="mt-4 space-y-2 text-sm">
            {identities.map((i) => (
              <li key={i.id}>
                <a
                  className="text-[color:var(--fg-strong)] transition hover:opacity-80"
                  href={i.href}
                  target={i.external ? "_blank" : undefined}
                  rel={i.external ? "noreferrer noopener" : undefined}
                >
                  {i.label}
                  <span className="ml-2 text-muted">
                    {i.external
                      ? i.href.replace(/^https?:\/\//, "")
                      : `afeezee.com${i.href}`}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  className="text-[color:var(--fg-strong)] transition hover:opacity-80"
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {year} Afeez Ayomide Olagunju. All work his own.</p>
          <p className="italic">Made with care, in the small hours.</p>
        </div>
      </div>
    </footer>
  );
}
