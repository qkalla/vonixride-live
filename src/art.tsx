export function HeroScene() {
  return (
    <svg viewBox="0 0 520 460" fill="none" role="img" aria-label="Vonix ride through the city">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14141c" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0066FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#0066FF" />
          <stop offset="1" stopColor="#60a5ff" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0066FF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0066FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="520" height="460" rx="28" fill="url(#sky)" stroke="rgba(255,255,255,0.08)" />
      <circle cx="430" cy="80" r="150" fill="url(#glow)" />

      {/* stars */}
      {[
        [60, 60], [110, 40], [180, 70], [250, 45], [320, 90], [60, 120],
        [490, 150], [140, 150], [380, 55], [460, 200], [40, 190],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1.1} fill="#ffffff" opacity={i % 3 === 0 ? 0.7 : 0.35} />
      ))}

      {/* skyline */}
      <g fill="#17171f">
        <rect x="20" y="250" width="46" height="140" rx="4" />
        <rect x="74" y="210" width="38" height="180" rx="4" />
        <rect x="120" y="270" width="52" height="120" rx="4" />
        <rect x="330" y="230" width="44" height="160" rx="4" />
        <rect x="382" y="190" width="40" height="200" rx="4" />
        <rect x="430" y="260" width="56" height="130" rx="4" />
      </g>
      {/* windows */}
      <g fill="#2a2a38">
        {[86, 102, 118, 134, 150].map((y) => (
          <g key={y}>
            <rect x="82" y={y} width="6" height="8" rx="1" />
            <rect x="94" y={y} width="6" height="8" rx="1" />
            <rect x="106" y={y} width="6" height="8" rx="1" />
          </g>
        ))}
        {[222, 240, 258, 276, 294].map((y) => (
          <g key={y}>
            <rect x="390" y={y} width="6" height="8" rx="1" />
            <rect x="402" y={y} width="6" height="8" rx="1" />
            <rect x="414" y={y} width="6" height="8" rx="1" />
          </g>
        ))}
      </g>
      {/* landmarks */}
      <path d="M196 390 L232 250 L268 390 Z" fill="#1d1d27" />
      <rect x="228" y="236" width="8" height="18" fill="#1d1d27" />

      {/* ground */}
      <rect x="0" y="390" width="520" height="70" fill="#101016" />
      <line x1="0" y1="390" x2="520" y2="390" stroke="rgba(255,255,255,0.1)" />

      {/* route path */}
      <path
        d="M40 372 C 120 340, 160 400, 240 368 S 400 320, 480 350"
        stroke="url(#routeGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="10 14"
      />

      {/* origin pin */}
      <g transform="translate(40 372)">
        <circle r="16" fill="#0066FF" opacity="0.2" />
        <circle r="9" fill="#0066FF" stroke="#fff" strokeWidth="2.5" />
      </g>

      {/* car */}
      <g transform="translate(238 330)">
        <ellipse cx="30" cy="46" rx="42" ry="7" fill="#000" opacity="0.4" />
        <path
          d="M6 40 C6 30 14 24 26 22 L40 10 C44 6 52 6 56 10 L68 22 C80 24 88 30 88 40 L88 44 C88 47 85 48 82 48 L12 48 C9 48 6 47 6 44 Z"
          fill="#0066FF"
        />
        <path d="M40 12 L50 22 L34 22 Z" fill="#bcd6ff" opacity="0.9" />
        <rect x="14" y="34" width="16" height="9" rx="2" fill="#0a0a0a" opacity="0.5" />
        <rect x="60" y="34" width="16" height="9" rx="2" fill="#0a0a0a" opacity="0.5" />
        <circle cx="26" cy="48" r="9" fill="#0d0d12" stroke="#3a3a46" strokeWidth="3" />
        <circle cx="74" cy="48" r="9" fill="#0d0d12" stroke="#3a3a46" strokeWidth="3" />
      </g>

      {/* destination pin */}
      <g transform="translate(480 350)">
        <circle r="16" fill="#22c55e" opacity="0.18" />
        <path
          d="M0 -14 C7 -14 12 -9 12 -3 C12 4 0 14 0 14 C0 14 -12 4 -12 -3 C-12 -9 -7 -14 0 -14 Z"
          fill="#22c55e"
          stroke="#fff"
          strokeWidth="2"
        />
        <circle cy="-3" r="3.5" fill="#fff" />
      </g>

      {/* moving dot on route */}
      <circle r="5" fill="#fff">
        <animateMotion dur="6s" repeatCount="indefinite" path="M40 372 C 120 340, 160 400, 240 368 S 400 320, 480 350" />
      </circle>
    </svg>
  );
}

export function PhoneMockup() {
  return (
    <svg viewBox="0 0 300 560" fill="none" role="img" aria-label="Vonix Business app preview">
      <defs>
        <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b1b22" />
          <stop offset="1" stopColor="#0d0d12" />
        </linearGradient>
      </defs>
      <rect x="20" y="10" width="260" height="540" rx="38" fill="url(#phoneBody)" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <rect x="105" y="26" width="90" height="22" rx="11" fill="#0a0a0a" />
      <rect x="34" y="60" width="232" height="480" rx="22" fill="#0a0a0a" />

      {/* header */}
      <rect x="52" y="78" width="120" height="14" rx="7" fill="#ffffff" opacity="0.9" />
      <rect x="52" y="100" width="80" height="10" rx="5" fill="#6b6b74" />
      <rect x="216" y="76" width="34" height="34" rx="17" fill="#0066FF" opacity="0.18" />

      {/* availability toggle */}
      <rect x="52" y="132" width="196" height="58" rx="14" fill="#141419" stroke="rgba(255,255,255,0.07)" />
      <circle cx="82" cy="161" r="15" fill="#0066FF" />
      <rect x="106" y="146" width="90" height="12" rx="6" fill="#ffffff" opacity="0.85" />
      <rect x="106" y="164" width="60" height="9" rx="4.5" fill="#6b6b74" />

      {/* stat cards */}
      <rect x="52" y="204" width="92" height="64" rx="12" fill="#141419" stroke="rgba(255,255,255,0.07)" />
      <rect x="66" y="222" width="50" height="16" rx="5" fill="#0066FF" opacity="0.85" />
      <rect x="66" y="246" width="34" height="8" rx="4" fill="#6b6b74" />
      <rect x="156" y="204" width="92" height="64" rx="12" fill="#141419" stroke="rgba(255,255,255,0.07)" />
      <rect x="170" y="222" width="50" height="16" rx="5" fill="#22c55e" opacity="0.85" />
      <rect x="170" y="246" width="34" height="8" rx="4" fill="#6b6b74" />

      {/* order card */}
      <rect x="52" y="282" width="196" height="96" rx="14" fill="#141419" stroke="rgba(255,255,255,0.07)" />
      <circle cx="76" cy="312" r="16" fill="#0066FF" opacity="0.2" />
      <rect x="102" y="298" width="90" height="11" rx="5.5" fill="#ffffff" opacity="0.85" />
      <rect x="102" y="318" width="130" height="9" rx="4.5" fill="#6b6b74" />
      <rect x="102" y="336" width="110" height="9" rx="4.5" fill="#6b6b74" />
      <rect x="66" y="356" width="80" height="12" rx="6" fill="#0066FF" />

      {/* bottom nav */}
      <rect x="34" y="470" width="232" height="70" rx="0" fill="#0d0d12" />
      <line x1="34" y1="470" x2="266" y2="470" stroke="rgba(255,255,255,0.07)" />
      {[70, 126, 182, 238].map((x, i) => (
        <g key={x}>
          <rect x={x - 10} y="486" width="20" height="20" rx="6" fill={i === 1 ? "#0066FF" : "#3a3a46"} opacity={i === 1 ? 1 : 0.7} />
        </g>
      ))}
    </svg>
  );
}

const serviceIcons: Record<string, React.ReactNode> = {
  ride: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ea0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <circle cx="7.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
      <path d="M9.3 17h5.4" />
    </svg>
  ),
  food: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ea0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3v7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V3" />
      <path d="M6 3v18" />
      <path d="M20 3c-2.5 0-4 3-4 7s1.5 7 4 7v4" />
    </svg>
  ),
  grocery: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ea0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8h12l1.2 12.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  pharmacy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ea0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 13h18" />
      <path d="M9 8V5h6v3" />
    </svg>
  ),
  cargo: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ea0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h12v9H2z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  ),
  moped: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ea0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="16" r="3.2" />
      <circle cx="18" cy="16" r="3.2" />
      <path d="M6 16l4-6h4l2 4h2" />
      <path d="M10 10l2-3h3" />
    </svg>
  ),
};

export function ServiceIcon({ name }: { name: keyof typeof serviceIcons }) {
  return <>{serviceIcons[name]}</>;
}
