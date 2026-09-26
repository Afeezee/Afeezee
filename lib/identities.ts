export type Identity = {
  id:
    | "musician"
    | "developer"
    | "writer"
    | "researcher"
    | "founder"
    | "advocate";
  slug: string;
  label: string;
  role: string;
  blurb: string;
  href: string;
  external?: boolean;
  cta: string;
  accent: string;
  motif:
    | "wave"
    | "code"
    | "ink"
    | "paper"
    | "rocket"
    | "heart";
};

export const identities: Identity[] = [
  {
    id: "musician",
    slug: "music",
    label: "Musician",
    role: "Afeezee, on record.",
    blurb:
      "Recording and performing as Afeezee. Explore releases, sound, and story.",
    href: "https://music.afeezee.com",
    external: true,
    cta: "Enter the music",
    accent: "music",
    motif: "wave",
  },
  {
    id: "developer",
    slug: "dev",
    label: "Developer",
    role: "Software · AI · web & mobile.",
    blurb:
      "Building software and AI-powered products across web and mobile.",
    href: "https://dev.afeezee.com",
    external: true,
    cta: "See the work",
    accent: "dev",
    motif: "code",
  },
  {
    id: "writer",
    slug: "writing",
    label: "Writer",
    role: "200+ poems & essays.",
    blurb: "200+ poems and essays. Read the archive.",
    href: "/writing",
    cta: "Read the archive",
    accent: "writing",
    motif: "ink",
  },
  {
    id: "researcher",
    slug: "research",
    label: "Researcher",
    role: "Two PhDs. Applied AI.",
    blurb:
      "Doctoral and collaborative research spanning AI, deepfakes, and beyond.",
    href: "/research",
    cta: "See publications",
    accent: "research",
    motif: "paper",
  },
  {
    id: "founder",
    slug: "startup",
    label: "Startup Founder",
    role: "Cereus Technologies & portfolio.",
    blurb:
      "Founder of Cereus Technologies and a growing venture portfolio.",
    href: "/startup",
    cta: "See what's building",
    accent: "startup",
    motif: "rocket",
  },
  {
    id: "advocate",
    slug: "jmhs",
    label: "Mental Health Advocate",
    role: "Jude Mental Health Society.",
    blurb:
      "Founder of Jude Mental Health Society (JMHS), advocating for mental health and suicide prevention through the power of words.",
    href: "https://judementalhealthsociety.org",
    external: true,
    cta: "Visit JMHS",
    accent: "jmhs",
    motif: "heart",
  },
];

export const byId = Object.fromEntries(identities.map((i) => [i.id, i]));
export const bySlug = Object.fromEntries(identities.map((i) => [i.slug, i]));

/**
 * Accent classes — Tailwind can't consume dynamic classnames from string
 * interpolation, so we return literal class strings for each accent that map
 * to the palette in tailwind.config.ts. Both light and dark variants are here.
 */

export const accentText = (a: string) => {
  switch (a) {
    case "music":
      return "text-accent-music dark:text-accent-music-dark";
    case "dev":
      return "text-accent-dev dark:text-accent-dev-dark";
    case "writing":
      return "text-accent-writing dark:text-accent-writing-dark";
    case "research":
      return "text-accent-research dark:text-accent-research-dark";
    case "startup":
      return "text-accent-startup dark:text-accent-startup-dark";
    case "jmhs":
      return "text-accent-jmhs dark:text-accent-jmhs-dark";
    default:
      return "text-[color:var(--fg-strong)]";
  }
};

export const accentGlow = (a: string) => {
  switch (a) {
    case "music":
      return "bg-accent-music/15 dark:bg-accent-music-dark/15";
    case "dev":
      return "bg-accent-dev/15 dark:bg-accent-dev-dark/15";
    case "writing":
      return "bg-accent-writing/15 dark:bg-accent-writing-dark/15";
    case "research":
      return "bg-accent-research/15 dark:bg-accent-research-dark/15";
    case "startup":
      return "bg-accent-startup/15 dark:bg-accent-startup-dark/15";
    case "jmhs":
      return "bg-accent-jmhs/15 dark:bg-accent-jmhs-dark/15";
    default:
      return "bg-transparent";
  }
};
