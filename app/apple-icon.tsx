import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07070a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 138,
            fontStyle: "italic",
            color: "#efece2",
            lineHeight: 1,
            marginRight: 4,
          }}
        >
          A
        </div>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#f5a97f",
            position: "absolute",
            left: 118,
            top: 106,
          }}
        />
      </div>
    ),
    size
  );
}
