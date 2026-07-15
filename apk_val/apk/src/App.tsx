import { useState } from 'react'
import MainMenu from './components/MainMenu'
import HotelSection from './components/hotel/HotelSection'
import RestaurantSection from './components/restaurant/RestaurantSection'
import HistoireSection from './components/HistoireSection'
import InfosSection from './components/InfosSection'
import ArcadeGame from './components/ArcadeGame'

export type Screen = 'main' | 'hotel' | 'restaurant' | 'histoire' | 'infos' | 'arcade'

export default function App() {
  const [screen, setScreen] = useState<Screen>('main')
  const navigate = (s: Screen) => setScreen(s)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#3d2008', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480, minHeight: '100vh', position: 'relative' }}>
        {screen === 'main' && <MainMenu onNavigate={navigate} />}
        {screen === 'hotel' && <HotelSection onBack={() => navigate('main')} />}
        {screen === 'restaurant' && (
          <RestaurantSection onBack={() => navigate('main')} onArcade={() => navigate('arcade')} />
        )}
        {screen === 'histoire' && <HistoireSection onBack={() => navigate('main')} />}
        {screen === 'infos' && <InfosSection onBack={() => navigate('main')} />}
        {screen === 'arcade' && <ArcadeGame onBack={() => navigate('main')} />}
      </div>
    </div>
  )
}
