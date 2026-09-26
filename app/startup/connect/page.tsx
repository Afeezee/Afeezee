import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { startupMeta, startupSubnav } from "@/lib/meta";
import { SectionContactForm } from "@/components/SectionContactForm";

export const metadata: Metadata = {
  title: "Connect",
  description: "For investors, co-founders, and commissions.",
};

const topics = [
  "Investment",
  "Co-founding or collaboration",
  "Commission a build",
  "Partnership",
  "Other",
] as const;

export default function StartupConnect() {
  return (
    <SectionShell meta={startupMeta} subnav={startupSubnav} currentHref="/startup/connect">
      <SectionPageHero
        meta={startupMeta}
        eyebrow="Connect"
        title="Investors, co-founders, commissions"
        body="Three audiences, one form. Pick your lane and I'll route the reply."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <SectionContactForm
          config={{
            section: "startup",
            formType: "connect",
            topics,
            heading: "Talk about the work",
            sub: "Serious builders, capital, and commissioners welcome. Reply within a week, usually sooner.",
          }}
        />
      </div>
    </SectionShell>
  );
}
