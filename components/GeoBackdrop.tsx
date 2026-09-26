export function GeoBackdrop() {
  return (
    <>
      <div className="geo-backdrop" aria-hidden />
      <svg
        className="geo-accents"
        aria-hidden
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.4" cy="1.4" r="1.4" fill="var(--pattern-strong)" />
          </pattern>
        </defs>

        {/* Dot lattice — top-left cluster */}
        <rect x="60" y="80" width="420" height="260" fill="url(#dots)" opacity="0.9" />
        {/* Dot lattice — bottom-right cluster */}
        <rect x="960" y="560" width="420" height="260" fill="url(#dots)" opacity="0.9" />

        {/* Large hexagon, top-right */}
        <g
          transform="translate(1220 150) scale(1.35)"
          fill="none"
          stroke="var(--pattern-strong)"
          strokeWidth="1.4"
        >
          <polygon points="0,-70 60.6,-35 60.6,35 0,70 -60.6,35 -60.6,-35" />
          <polygon points="0,-46 39.8,-23 39.8,23 0,46 -39.8,23 -39.8,-23" opacity="0.7" />
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" opacity="0.5" />
        </g>

        {/* Triangle, bottom-left */}
        <g
          transform="translate(240 720)"
          fill="none"
          stroke="var(--pattern-strong)"
          strokeWidth="1.4"
        >
          <polygon points="0,-80 69.3,40 -69.3,40" />
          <polygon points="0,-52 45,26 -45,26" opacity="0.7" />
          <polygon points="0,-26 22.5,13 -22.5,13" opacity="0.5" />
        </g>

        {/* Concentric circles, mid-right */}
        <g
          transform="translate(1290 480)"
          fill="none"
          stroke="var(--pattern-strong)"
          strokeWidth="1.4"
        >
          <circle r="95" opacity="0.9" />
          <circle r="70" opacity="0.75" />
          <circle r="45" opacity="0.55" />
          <circle r="22" opacity="0.4" />
        </g>

        {/* Small square lattice, top-centre */}
        <g stroke="var(--pattern-strong)" strokeWidth="1.4" fill="none" opacity="0.85">
          <rect x="640" y="60" width="32" height="32" />
          <rect x="680" y="60" width="32" height="32" opacity="0.75" />
          <rect x="720" y="60" width="32" height="32" opacity="0.55" />
          <rect x="640" y="100" width="32" height="32" opacity="0.75" />
          <rect x="680" y="100" width="32" height="32" opacity="0.55" />
          <rect x="720" y="100" width="32" height="32" opacity="0.4" />
        </g>

        {/* Cross-plus, mid-left */}
        <g stroke="var(--pattern-strong)" strokeWidth="1.4">
          <line x1="105" y1="460" x2="145" y2="460" />
          <line x1="125" y1="440" x2="125" y2="480" />
        </g>
        <g stroke="var(--pattern-strong)" strokeWidth="1.2" opacity="0.75">
          <line x1="170" y1="520" x2="200" y2="520" />
          <line x1="185" y1="505" x2="185" y2="535" />
        </g>
        <g stroke="var(--pattern-strong)" strokeWidth="1" opacity="0.55">
          <line x1="220" y1="570" x2="242" y2="570" />
          <line x1="231" y1="559" x2="231" y2="581" />
        </g>

        {/* Diagonal line rhythm, centre-top */}
        <g stroke="var(--pattern-strong)" strokeWidth="1.4" opacity="0.85">
          <line x1="820" y1="130" x2="920" y2="230" />
          <line x1="850" y1="130" x2="950" y2="230" />
          <line x1="880" y1="130" x2="980" y2="230" />
        </g>

        {/* Small diamond, bottom-centre */}
        <g
          transform="translate(720 780)"
          fill="none"
          stroke="var(--pattern-strong)"
          strokeWidth="1.4"
        >
          <polygon points="0,-32 32,0 0,32 -32,0" />
          <polygon points="0,-18 18,0 0,18 -18,0" opacity="0.65" />
        </g>
      </svg>
    </>
  );
}
