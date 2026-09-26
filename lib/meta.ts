import { SectionMeta } from "@/components/SectionShell";

export const writingMeta: SectionMeta = {
  identityId: "writer",
  label: "Writing",
  accent: "writing",
  motif: "ink",
  root: "/writing",
};

export const researchMeta: SectionMeta = {
  identityId: "researcher",
  label: "Research",
  accent: "research",
  motif: "paper",
  root: "/research",
};

export const startupMeta: SectionMeta = {
  identityId: "founder",
  label: "Startup",
  accent: "startup",
  motif: "rocket",
  root: "/startup",
};

export const writingSubnav = [
  { label: "Overview", href: "/writing" },
  { label: "Poems", href: "/writing/poems" },
  { label: "Essays", href: "/writing/essays" },
  { label: "About", href: "/writing/about" },
  { label: "Collaborate", href: "/writing/collaborate" },
];

export const researchSubnav = [
  { label: "Overview", href: "/research" },
  { label: "Publications", href: "/research/publications" },
  { label: "PhD", href: "/research/phd" },
  { label: "Ongoing", href: "/research/ongoing" },
  { label: "CV", href: "/research/cv" },
  { label: "Collaborate", href: "/research/collaborate" },
];

export const startupSubnav = [
  { label: "Overview", href: "/startup" },
  { label: "Cereus", href: "/startup/cereus" },
  { label: "Ventures", href: "/startup/ventures" },
  { label: "Concepts", href: "/startup/concepts" },
  { label: "About", href: "/startup/about" },
  { label: "Connect", href: "/startup/connect" },
];
