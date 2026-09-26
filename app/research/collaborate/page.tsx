import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { researchMeta, researchSubnav } from "@/lib/meta";
import { SectionContactForm } from "@/components/SectionContactForm";

export const metadata: Metadata = {
  title: "Collaborate on research",
  description: "Collaboration, co-authorship, funding, and peer review invitations.",
};

const topics = [
  "Collaboration",
  "Co-authorship",
  "Funding or grant opportunity",
  "Speaking or peer review",
  "Other",
] as const;

export default function ResearchCollaborate() {
  return (
    <SectionShell meta={researchMeta} subnav={researchSubnav} currentHref="/research/collaborate">
      <SectionPageHero
        meta={researchMeta}
        eyebrow="Collaborate"
        title="For academic and institutional visitors"
        body="Open to collaboration, co-authorship, funded research opportunities, invited talks, and peer review. Both PhDs are active, so I plan carefully."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <SectionContactForm
          config={{
            section: "research",
            formType: "collaborate",
            topics,
            askInstitution: true,
            heading: "Get in touch about the research",
            sub: "Institutional affiliation helps me route the reply — every note gets read.",
          }}
        />
      </div>
    </SectionShell>
  );
}
