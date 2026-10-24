import { sectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/sectionOg";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Research — PhD work on multimodal deepfake detection and applied AI.";

export default function OG() {
  return sectionOg({
    eyebrow: "Research",
    headline: "How the machine imitates us",
    tagline:
      "PhD research on multimodal deepfake detection. Publications, ongoing work, and collaboration.",
    accent: "#a6da95",
  });
}
