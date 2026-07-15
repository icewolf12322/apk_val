import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
  innerPadding?: number
}

function CornerFlower({ flip }: { flip: boolean }) {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" style={{ display: 'block' }}>
      <g transform={flip ? 'scale(-1,1) translate(-64,0)' : ''}>
        {/* Main flower */}
        <ellipse cx="12" cy="12" rx="9" ry="6" fill="#c8900a" transform="rotate(-45 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="6" fill="#c8900a" transform="rotate(45 12 12)" />
        <circle cx="12" cy="12" r="5" fill="#ffd700" />
        <circle cx="12" cy="12" r="2.5" fill="#7a1818" />
        {/* Vine going right */}
        <path d="M 20 12 Q 35 8 52 10" stroke="#7a1818" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Vine going down */}
        <path d="M 12 20 Q 8 35 10 52" stroke="#7a1818" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Small flowers on vine */}
        <circle cx="36" cy="9" r="4" fill="#c8900a" />
        <circle cx="36" cy="9" r="2" fill="#ffd700" />
        <circle cx="50" cy="11" r="3" fill="#7a1818" />
        <circle cx="9" cy="36" r="4" fill="#c8900a" />
        <circle cx="9" cy="36" r="2" fill="#ffd700" />
        <circle cx="11" cy="50" r="3" fill="#7a1818" />
        {/* Leaves */}
        <ellipse cx="28" cy="11" rx="5" ry="2.5" fill="#5a8a2a" transform="rotate(-10 28 11)" />
        <ellipse cx="11" cy="28" rx="2.5" ry="5" fill="#5a8a2a" transform="rotate(-10 11 28)" />
      </g>
    </svg>
  )
}

function CornerSet({ top, left }: { top: boolean; left: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: top ? 0 : 'auto',
      bottom: !top ? 0 : 'auto',
      left: left ? 0 : 'auto',
      right: !left ? 0 : 'auto',
      transform: `scale(${left ? 1 : -1}, ${top ? 1 : -1})`,
      transformOrigin: 'center center',
      lineHeight: 0,
    }}>
      <CornerFlower flip={false} />
    </div>
  )
}

export default function CartoonFrame({ children, style, className, innerPadding = 20 }: Props) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        backgroundColor: '#f5e4b4',
        border: '3px solid #4d1010',
        boxShadow: '0 0 0 2px #c8900a, 0 0 0 5px #4d1010, 0 0 0 7px #c8900a',
        ...style,
      }}
    >
      <CornerSet top left />
      <CornerSet top={true} left={false} />
      <CornerSet top={false} left={true} />
      <CornerSet top={false} left={false} />
      <div style={{ position: 'relative', zIndex: 1, padding: innerPadding }}>
        {children}
      </div>
    </div>
  )
}
