import { ImageResponse } from "next/og";

export type SectionOgOptions = {
  eyebrow: string;
  headline: string;
  tagline: string;
  accent: string;
};

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function sectionOg({ eyebrow, headline, tagline, accent }: SectionOgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07070a",
          color: "#efece2",
          fontFamily: "Georgia, serif",
          display: "flex",
          flexDirection: "column",
          padding: "68px 72px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#0b0b10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
              fontSize: 30,
              position: "relative",
            }}
          >
            <span style={{ display: "flex" }}>A</span>
            <div
              style={{
                position: "absolute",
                right: 8,
                bottom: 12,
                width: 5,
                height: 5,
                borderRadius: 3,
                background: accent,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 20,
              letterSpacing: 6,
              color: "#8a8a99",
              textTransform: "uppercase",
            }}
          >
            afeezee.com
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 64 }}>
          <div style={{ display: "flex", width: 60, height: 3, background: accent, borderRadius: 2 }} />
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 22,
              letterSpacing: 8,
              color: accent,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 20, alignItems: "flex-end", gap: 6, maxWidth: 1050 }}>
          <div
            style={{
              display: "flex",
              fontSize: 100,
              lineHeight: 1.02,
              fontStyle: "italic",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 100,
              lineHeight: 1.02,
              fontStyle: "italic",
              color: accent,
            }}
          >
            .
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.4,
            marginTop: "auto",
            color: "#d9d4c2",
            maxWidth: 960,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
