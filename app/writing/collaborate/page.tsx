import type { Metadata } from "next";
import { SectionShell, SectionPageHero } from "@/components/SectionShell";
import { writingMeta, writingSubnav } from "@/lib/meta";
import { SectionContactForm } from "@/components/SectionContactForm";

export const metadata: Metadata = {
  title: "Collaborate on writing",
  description: "Commissions, features, collaboration, speaking or reading.",
};

const topics = [
  "Commission a piece",
  "Feature or publish existing work",
  "Collaboration",
  "Speaking or reading",
  "Other",
] as const;

export default function WritingCollaborate() {
  return (
    <SectionShell meta={writingMeta} subnav={writingSubnav} currentHref="/writing/collaborate">
      <SectionPageHero
        meta={writingMeta}
        eyebrow="Collaborate"
        title="Working together on the words"
        body="Open to commissions, features and republications, collaborations, and reading or speaking opportunities. Tell me what you have in mind."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <SectionContactForm
          config={{
            section: "writing",
            formType: "collaborate",
            topics,
            heading: "Reach out about the writing",
            sub: "Commissions, features, collaborations, or speaking. Every note gets read.",
          }}
        />
      </div>
    </SectionShell>
  );
}
