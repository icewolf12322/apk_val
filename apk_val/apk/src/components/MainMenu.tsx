import type { Screen } from '../App'
import { useTranslation } from 'react-i18next'
import CartoonFrame from './CartoonFrame'
import CartoonButton from './CartoonButton'
import BottomNav from './BottomNav'
import WolfGroomCanvas from './pixi/WolfGroomCanvas'
import bgImage from "../imports/back_main_wallpaper.png"
import deskImage from "../imports/desk_main.png"

interface Props {
  onNavigate: (s: Screen) => void
}

const HERO_H = 272

export default function MainMenu({ onNavigate }: Props) {
  const { t } = useTranslation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5e4b4' }}>
      <CartoonFrame innerPadding={0} style={{ flex: 1, margin: 0, borderRadius: 0, display: 'flex', flexDirection: 'column' }}>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: HERO_H,
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          {/* Background image — fills the hero, sign already baked in */}
          <img
            src={bgImage}
            alt="Val de la Cascade — réception"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />

          {/* Wolf sprite */}
          <div style={{
            position: 'absolute',
            left: '50%',
            bottom: -2,
            width: 234,
            height: 359,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            <WolfGroomCanvas
              width={234}
              height={359}
              animation="iso_idle_down"
              animationSpeed={10 / 60}
            />
          </div>

          {/* Reception desk in front of the groom */}
          <img
            src={deskImage}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 13,
              width: 304,
              maxWidth: 'none',
              height: 'auto',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </div>

        {/* ── Navigation buttons (shifted down a little) ──────────────── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '22px 20px 14px',
          gap: 10,
        }}>
          <CartoonButton icon="🛏️" size="lg" onClick={() => onNavigate('hotel')}>
            {t('mainMenu.hotelButton')}
          </CartoonButton>
          <CartoonButton icon="🍽️" size="lg" onClick={() => onNavigate('restaurant')}>
            {t('mainMenu.restaurantButton')}
          </CartoonButton>
          <CartoonButton icon="📖" size="lg" onClick={() => onNavigate('histoire')}>
            {t('mainMenu.historyButton')}
          </CartoonButton>
          <CartoonButton icon="ℹ️" size="lg" onClick={() => onNavigate('infos')}>
            {t('mainMenu.infosButton')}
          </CartoonButton>

          <div style={{
            marginTop: 6,
            fontFamily: "'Crimson Text', serif",
            fontStyle: 'italic',
            fontSize: 13,
            color: '#8b6030',
            textAlign: 'center',
          }}>
            {t('mainMenu.quote')}
          </div>
        </div>
      </CartoonFrame>

      <BottomNav current="main" onNavigate={onNavigate} />
    </div>
  )
}
