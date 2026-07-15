import type { ReactNode, CSSProperties } from 'react'

interface Props {
  onClick?: () => void
  children: ReactNode
  icon?: ReactNode
  style?: CSSProperties
  variant?: 'primary' | 'secondary' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export default function CartoonButton({
  onClick,
  children,
  icon,
  style,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: Props) {
  const bg = variant === 'gold' ? '#c8900a' : variant === 'secondary' ? '#4d1010' : '#7a1818'
  const borderColor = variant === 'gold' ? '#ffd700' : '#c8900a'
  const textColor = '#fdf5dd'
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 17

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: size === 'sm' ? '8px 16px' : size === 'lg' ? '14px 24px' : '11px 20px',
        backgroundColor: bg,
        border: `3px solid ${borderColor}`,
        borderRadius: 40,
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: textColor,
        fontFamily: "'Luckiest Guy', cursive",
        fontSize,
        letterSpacing: '0.06em',
        textAlign: 'left',
        boxShadow: `0 4px 0 ${variant === 'gold' ? '#b87800' : '#4d1010'}, inset 0 1px 0 rgba(255,255,255,0.15)`,
        transition: 'transform 0.1s, box-shadow 0.1s',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      onMouseDown={e => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(3px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = `0 1px 0 ${variant === 'gold' ? '#b87800' : '#4d1010'}, inset 0 1px 0 rgba(255,255,255,0.15)`
        }
      }}
      onMouseUp={e => {
        ;(e.currentTarget as HTMLElement).style.transform = ''
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 0 ${variant === 'gold' ? '#b87800' : '#4d1010'}, inset 0 1px 0 rgba(255,255,255,0.15)`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.transform = ''
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 0 ${variant === 'gold' ? '#b87800' : '#4d1010'}, inset 0 1px 0 rgba(255,255,255,0.15)`
      }}
    >
      {icon && (
        <span style={{ fontSize: size === 'sm' ? 18 : 22, lineHeight: 1 }}>{icon}</span>
      )}
      <span style={{ flex: 1, textAlign: icon ? 'left' : 'center' }}>{children}</span>
    </button>
  )
}
