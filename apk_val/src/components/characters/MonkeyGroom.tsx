export default function MonkeyGroom({ width = 100, animate = false }: { width?: number; animate?: boolean }) {
  const h = Math.round(width * 1.55)
  return (
    <svg
      viewBox="0 0 100 155"
      width={width}
      height={h}
      style={animate ? { animation: 'wiggle 2s ease-in-out infinite' } : undefined}
    >
      {/* Legs */}
      <rect x="34" y="120" width="13" height="28" rx="6" fill="#4d1010" />
      <rect x="53" y="120" width="13" height="28" rx="6" fill="#4d1010" />
      <ellipse cx="40" cy="147" rx="9" ry="5" fill="#333" />
      <ellipse cx="59" cy="147" rx="9" ry="5" fill="#333" />

      {/* Body */}
      <rect x="24" y="76" width="52" height="50" rx="12" fill="#8b4a1a" />
      <rect x="24" y="114" width="52" height="10" rx="3" fill="#c8900a" />
      <circle cx="50" cy="90" r="3" fill="#ffd700" />
      <circle cx="50" cy="103" r="3" fill="#ffd700" />
      <path d="M 40 78 L 50 89 L 60 78" fill="#f5e4b4" />

      {/* Left arm - pointing up */}
      <rect x="5" y="78" width="20" height="36" rx="10" fill="#8b4a1a" />
      <ellipse cx="15" cy="116" rx="10" ry="7" fill="#c87840" />
      {/* Right arm pointing outward/up */}
      <rect x="75" y="60" width="18" height="36" rx="9" fill="#8b4a1a" transform="rotate(-35 84 78)" />
      <ellipse cx="90" cy="55" rx="9" ry="7" fill="#c87840" transform="rotate(-35 90 55)" />
      {/* Finger pointing */}
      <rect x="90" y="42" width="7" height="18" rx="3.5" fill="#c87840" transform="rotate(-10 94 51)" />

      {/* Head */}
      <ellipse cx="50" cy="46" rx="27" ry="26" fill="#8b4a1a" />
      {/* Big round ears */}
      <circle cx="24" cy="44" r="12" fill="#8b4a1a" />
      <circle cx="76" cy="44" r="12" fill="#8b4a1a" />
      <circle cx="24" cy="44" r="7" fill="#c87840" />
      <circle cx="76" cy="44" r="7" fill="#c87840" />
      {/* Face / snout */}
      <ellipse cx="50" cy="56" rx="17" ry="13" fill="#c87840" />
      {/* Nose */}
      <ellipse cx="50" cy="50" rx="5" ry="4" fill="#6b3010" />
      <ellipse cx="48.5" cy="49" rx="1.5" ry="1.2" fill="#8b4a1a" />
      {/* Big grin */}
      <path d="M 40 60 Q 50 70 60 60" stroke="#4d1010" strokeWidth="2" fill="#e8a0a0" />
      <path d="M 40 60 Q 50 70 60 60" stroke="#4d1010" strokeWidth="1.5" fill="none" />
      {/* Teeth */}
      <rect x="44" y="60" width="5" height="5" rx="1" fill="white" />
      <rect x="51" y="60" width="5" height="5" rx="1" fill="white" />
      {/* Eyes - happy squint */}
      <path d="M 36 40 Q 41 35 46 40" stroke="#4d1010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 54 40 Q 59 35 64 40" stroke="#4d1010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="41" cy="40" r="3" fill="#4d1010" />
      <circle cx="59" cy="40" r="3" fill="#4d1010" />
      <circle cx="42" cy="39" r="1" fill="white" />
      <circle cx="60" cy="39" r="1" fill="white" />

      {/* Bellhop cap */}
      <ellipse cx="50" cy="24" rx="23" ry="7" fill="#7a1818" />
      <rect x="33" y="10" width="34" height="15" rx="5" fill="#7a1818" />
      <rect x="30" y="20" width="40" height="5" rx="2" fill="#c8900a" />
      <circle cx="50" cy="11" r="3" fill="#ffd700" />

      {/* Stars around to show excitement */}
      <text x="6" y="35" fontSize="10" fill="#ffd700">✦</text>
      <text x="82" y="20" fontSize="8" fill="#ffd700">✦</text>
      <text x="15" y="18" fontSize="6" fill="#c8900a">✦</text>
    </svg>
  )
}
