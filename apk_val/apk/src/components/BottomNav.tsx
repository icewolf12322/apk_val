import type { Screen } from '../App'
import { useTranslation } from 'react-i18next'

interface Props {
  current: Screen
  onNavigate: (s: Screen) => void
}

const ITEMS: { screen: Screen; icon: string; labelKey: string }[] = [
  { screen: 'main', icon: '🏠', labelKey: 'bottomNav.home' },
  { screen: 'hotel', icon: '🛏️', labelKey: 'bottomNav.hotel' },
  { screen: 'restaurant', icon: '🍽️', labelKey: 'bottomNav.restaurant' },
  { screen: 'infos', icon: 'ℹ️', labelKey: 'bottomNav.infos' },
]

export default function BottomNav({ current, onNavigate }: Props) {
  const { t } = useTranslation()

  return (
    <div style={{
      display: 'flex',
      borderTop: '3px solid #7a1818',
      backgroundColor: '#f5e4b4',
      boxShadow: '0 -3px 0 #c8900a',
    }}>
      {ITEMS.map(item => (
        <button
          key={item.screen}
          onClick={() => onNavigate(item.screen)}
          style={{
            flex: 1,
            padding: '10px 0 8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            opacity: current === item.screen ? 1 : 0.5,
            transition: 'opacity 0.15s',
          }}
        >
          <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
          <span style={{
            fontSize: 10,
            fontFamily: "'Luckiest Guy', cursive",
            color: '#7a1818',
            letterSpacing: '0.03em',
          }}>{t(item.labelKey)}</span>
          {current === item.screen && (
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#c8900a', marginTop: 2 }} />
          )}
        </button>
      ))}
    </div>
  )
}
