import { sectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/sectionOg";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Writing — 200+ poems and essays by Afeezee.";

export default function OG() {
  return sectionOg({
    eyebrow: "Writing",
    headline: "200+ poems, a growing body of essays",
    tagline:
      "Poems and essays on desire, faith, memory, and the making of a self.",
    accent: "#c6a0f6",
  });
}
