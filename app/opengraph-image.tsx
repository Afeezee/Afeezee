import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Afeezee — musician, writer, researcher, developer, founder, advocate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENTS = [
  "#f5a97f",
  "#8aadf4",
  "#c6a0f6",
  "#a6da95",
  "#eed49f",
  "#ee99a0",
];

const LABELS = [
  "MUSICIAN",
  "DEVELOPER",
  "WRITER",
  "RESEARCHER",
  "FOUNDER",
  "ADVOCATE",
];

export default function OG() {
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
                background: "#f5a97f",
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

        <div style={{ display: "flex", marginTop: 44 }}>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontStyle: "italic",
              color: "#8a8a99",
            }}
          >
            Afeezee is
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 6 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.02,
              fontStyle: "italic",
            }}
          >
            a builder across
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 6, alignItems: "flex-end", gap: 6 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.02,
              fontStyle: "italic",
            }}
          >
            disciplines
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.02,
              fontStyle: "italic",
              color: "#f5a97f",
            }}
          >
            .
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {LABELS.map((label, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 6,
                  background: ACCENTS[i],
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontFamily: "sans-serif",
                  fontSize: 16,
                  letterSpacing: 4,
                  color: "#efece2",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
