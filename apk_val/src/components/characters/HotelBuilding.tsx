export default function HotelBuilding({ width = 220 }: { width?: number }) {
  const h = Math.round(width * 1.1)
  return (
    <svg viewBox="0 0 220 240" width={width} height={h}>
      {/* Sky/background */}
      <rect x="0" y="80" width="220" height="160" fill="#87CEEB" rx="8" opacity="0.3" />

      {/* Trees left */}
      <ellipse cx="22" cy="175" rx="18" ry="22" fill="#4a7a2a" />
      <ellipse cx="22" cy="162" rx="13" ry="16" fill="#5a8a35" />
      <rect x="18" y="188" width="8" height="20" fill="#6b4a2a" />

      {/* Waterfall left */}
      <path d="M 0 120 Q 12 140 8 165 Q 5 185 10 200" stroke="#87CEEB" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 5 125 Q 15 145 12 170 Q 10 185 14 202" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Waterfall pool */}
      <ellipse cx="10" cy="205" rx="15" ry="6" fill="#87CEEB" opacity="0.7" />

      {/* Hotel building – yellow/cream facade */}
      <rect x="55" y="90" width="130" height="130" rx="8" fill="#e8c840" />
      {/* Darker sides */}
      <rect x="175" y="95" width="10" height="125" rx="0" fill="#c8a820" />

      {/* Face windows = eyes */}
      <rect x="78" y="112" width="30" height="28" rx="4" fill="#1a3a6e" />
      <rect x="130" y="112" width="30" height="28" rx="4" fill="#1a3a6e" />
      {/* Eyebrow arches above windows */}
      <path d="M 75 112 Q 93 100 108 112" stroke="#7a4a1a" strokeWidth="4" fill="none" />
      <path d="M 127 112 Q 145 100 163 112" stroke="#7a4a1a" strokeWidth="4" fill="none" />
      {/* Highlight in eyes */}
      <circle cx="88" cy="118" r="5" fill="white" opacity="0.4" />
      <circle cx="140" cy="118" r="5" fill="white" opacity="0.4" />

      {/* Door = smiling mouth */}
      <path d="M 88 158 Q 120 180 152 158" fill="#7a3a1a" />
      <rect x="95" y="158" width="50" height="35" rx="25" fill="#5c2a10" />
      <rect x="98" y="158" width="20" height="35" rx="3" fill="#7a3a1a" />
      <rect x="122" y="158" width="20" height="35" rx="3" fill="#7a3a1a" />

      {/* Roof */}
      <path d="M 50 95 L 120 55 L 175 95" fill="#7a1818" />
      <path d="M 55 95 L 120 58 L 170 95" fill="#9b2525" />
      {/* Roof window */}
      <rect x="105" y="68" width="30" height="22" rx="10" fill="#1a3a6e" />
      <ellipse cx="115" cy="73" r="4" fill="white" opacity="0.3" />

      {/* Chimney */}
      <rect x="148" y="58" width="16" height="38" rx="3" fill="#5c3010" />
      {/* Smoke */}
      <ellipse cx="152" cy="52" rx="7" ry="9" fill="#ddd" opacity="0.7" />
      <ellipse cx="162" cy="45" rx="9" ry="11" fill="#eee" opacity="0.6" />
      <ellipse cx="155" cy="36" rx="6" ry="8" fill="#ddd" opacity="0.5" />

      {/* Trees right */}
      <ellipse cx="205" cy="170" rx="16" ry="20" fill="#4a7a2a" />
      <ellipse cx="205" cy="158" rx="11" ry="14" fill="#5a8a35" />
      <rect x="201" y="183" width="7" height="18" fill="#6b4a2a" />

      {/* Ground */}
      <ellipse cx="120" cy="222" rx="90" ry="12" fill="#5a8a35" />
      <rect x="30" y="218" width="180" height="12" fill="#5a8a35" />

      {/* Stars decoration */}
      <text x="48" y="82" fontSize="12" fill="#ffd700">✦</text>
      <text x="170" y="78" fontSize="10" fill="#ffd700">✦</text>
      <text x="30" y="140" fontSize="8" fill="#ffd700">✦</text>
    </svg>
  )
}
