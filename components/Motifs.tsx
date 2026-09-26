import React from "react";

const stroke = "currentColor";

export function WaveMotif() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="motif-wave h-8 w-16"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {[4, 12, 20, 28, 36, 44, 52, 60].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${16 - (i % 2 === 0 ? 6 : 3)} L${x} ${16 + (i % 2 === 0 ? 6 : 3)}`}
        />
      ))}
    </svg>
  );
}

export function CodeMotif() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="motif-code h-8 w-16"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6 L14 6" opacity="0.7" />
      <path d="M18 16 L10 16 L14 12" />
      <path d="M10 16 L14 20" />
      <path d="M22 20 L34 12" />
      <path d="M38 12 L42 16 L38 20" />
      <rect
        x="46"
        y="14"
        width="6"
        height="10"
        className="cursor"
        fill={stroke}
        stroke="none"
      />
    </svg>
  );
}

export function InkMotif() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="motif-ink h-8 w-16"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 22 L34 6 L40 10 L14 26 Z" />
      <path d="M32 8 L38 12" />
      <path d="M8 22 L6 28 L12 26" />
      <circle cx="50" cy="22" r="2" className="drop" fill={stroke} stroke="none" />
      <circle cx="56" cy="26" r="1.2" className="drop" fill={stroke} stroke="none" />
    </svg>
  );
}

export function PaperMotif() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="motif-paper h-8 w-16"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="14" y="4" width="26" height="24" rx="1" />
      <path className="line" d="M18 10 L36 10" />
      <path className="line" d="M18 14 L36 14" />
      <path className="line" d="M18 18 L32 18" />
      <path className="line" d="M18 22 L28 22" />
      <path d="M42 8 L52 8 L52 26 L42 26" opacity="0.5" />
    </svg>
  );
}

export function RocketMotif() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="motif-rocket h-8 w-16"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 26 L24 26" opacity="0.6" />
      <path d="M12 22 L28 6 L42 8 L44 22 L28 30 Z" />
      <circle cx="34" cy="14" r="2.5" />
      <path className="plume" d="M18 22 L14 30" opacity="0.7" />
      <path className="plume" d="M22 24 L20 30" opacity="0.5" />
      <path d="M50 6 L54 10" opacity="0.5" />
      <path d="M52 4 L58 4" opacity="0.5" />
    </svg>
  );
}

export function HeartMotif() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="motif-heart h-8 w-16"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 26 C18 18, 14 12, 20 8 C25 5, 30 8, 32 12 C34 8, 39 5, 44 8 C50 12, 46 18, 32 26 Z" />
      <path d="M10 16 L18 16" opacity="0.4" />
      <path d="M46 16 L54 16" opacity="0.4" />
    </svg>
  );
}

export function Motif({ kind }: { kind: string }) {
  switch (kind) {
    case "wave":
      return <WaveMotif />;
    case "code":
      return <CodeMotif />;
    case "ink":
      return <InkMotif />;
    case "paper":
      return <PaperMotif />;
    case "rocket":
      return <RocketMotif />;
    case "heart":
      return <HeartMotif />;
    default:
      return null;
  }
}
