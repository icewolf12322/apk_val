export default function WolfGroom({ width = 100, animate = false }: { width?: number; animate?: boolean }) {
  const h = Math.round(width * 1.6)
  return (
    <svg
      viewBox="0 0 100 160"
      width={width}
      height={h}
      style={animate ? { animation: 'float 3s ease-in-out infinite' } : undefined}
    >
      {/* Legs */}
      <rect x="34" y="128" width="13" height="26" rx="6" fill="#4d1010" />
      <rect x="53" y="128" width="13" height="26" rx="6" fill="#4d1010" />
      <ellipse cx="40" cy="153" rx="9" ry="5" fill="#333" />
      <ellipse cx="59" cy="153" rx="9" ry="5" fill="#333" />

      {/* Body – uniform */}
      <rect x="22" y="80" width="56" height="55" rx="12" fill="#7a1818" />
      {/* Gold belt */}
      <rect x="22" y="120" width="56" height="10" rx="3" fill="#c8900a" />
      {/* Buttons */}
      <circle cx="50" cy="95" r="3" fill="#ffd700" />
      <circle cx="50" cy="108" r="3" fill="#ffd700" />
      {/* Collar / white shirt */}
      <path d="M 40 82 L 50 92 L 60 82" fill="white" />

      {/* Arms */}
      <rect x="5" y="82" width="18" height="38" rx="9" fill="#7a1818" />
      <rect x="77" y="82" width="18" height="38" rx="9" fill="#7a1818" />
      {/* Paws */}
      <ellipse cx="14" cy="122" rx="9" ry="7" fill="#aaa" />
      <ellipse cx="86" cy="118" rx="9" ry="7" fill="#aaa" transform="rotate(-15 86 118)" />
      {/* Key in right paw */}
      <circle cx="92" cy="112" r="5" fill="#ffd700" stroke="#c8900a" strokeWidth="1.5" />
      <rect x="91" y="116" width="3" height="10" fill="#ffd700" />
      <rect x="91" y="122" width="5" height="2" fill="#ffd700" />
      <rect x="91" y="125" width="5" height="2" fill="#ffd700" />

      {/* Head */}
      <ellipse cx="50" cy="50" rx="26" ry="28" fill="#b8b8b8" />
      {/* Cheeks / snout */}
      <ellipse cx="50" cy="63" rx="16" ry="12" fill="#d0d0d0" />
      {/* Nose */}
      <ellipse cx="50" cy="57" rx="6" ry="4.5" fill="#333" />
      <ellipse cx="48" cy="56" rx="2" ry="1.5" fill="#555" />
      {/* Mouth smile */}
      <path d="M 44 64 Q 50 70 56 64" stroke="#555" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="40" cy="44" r="6" fill="white" />
      <circle cx="60" cy="44" r="6" fill="white" />
      <circle cx="41" cy="45" r="3.5" fill="#333" />
      <circle cx="61" cy="45" r="3.5" fill="#333" />
      <circle cx="42" cy="44" r="1.2" fill="white" />
      <circle cx="62" cy="44" r="1.2" fill="white" />
      {/* Eyebrows */}
      <path d="M 34 37 Q 40 33 46 37" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 54 37 Q 60 33 66 37" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Ears */}
      <polygon points="26,30 30,5 44,28" fill="#b8b8b8" />
      <polygon points="56,28 70,5 74,30" fill="#b8b8b8" />
      <polygon points="29,28 32,10 42,26" fill="#e8a0a0" />
      <polygon points="58,26 68,10 71,28" fill="#e8a0a0" />

      {/* Bellhop cap */}
      <ellipse cx="50" cy="26" rx="24" ry="7" fill="#7a1818" />
      <rect x="32" y="12" width="36" height="15" rx="5" fill="#7a1818" />
      {/* Gold cap band */}
      <rect x="29" y="22" width="42" height="5" rx="2" fill="#c8900a" />
      {/* Cap button */}
      <circle cx="50" cy="13" r="3" fill="#ffd700" />
    </svg>
  )
}
