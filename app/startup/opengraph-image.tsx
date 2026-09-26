import { sectionOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/sectionOg";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Startup — Cereus Technologies and a growing venture portfolio.";

export default function OG() {
  return sectionOg({
    eyebrow: "Startup",
    headline: "Ship fast, ship often, ship African",
    tagline:
      "Cereus Technologies · 10+ shipped products across AI, health tech, EdTech, and creative tools.",
    accent: "#eed49f",
  });
}
