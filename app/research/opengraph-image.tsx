import { sectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/sectionOg";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Research — two concurrent PhDs across AI and academic integrity.";

export default function OG() {
  return sectionOg({
    eyebrow: "Research",
    headline: "Two PhDs, one question",
    tagline:
      "Multimodal deepfake detection (Uniosun) and writing-process provenance (OAU). Publications, ongoing work, and collaboration.",
    accent: "#a6da95",
  });
}
