import { useState } from 'react'
import CartoonFrame from '../CartoonFrame'
import CartoonButton from '../CartoonButton'
import { ImageWithFallback } from '../ImageWithFallback'
import nosChambresImg from '../../imports/Nos_chambres.png'
import aubergeImg from '../../imports/L_auberge.png'
import mainImg from '../../imports/Main.png'

type SubPage = 'menu' | 'auberge' | 'hotel' | 'gites' | 'booking' | 'chalet'

interface Props {
  onBack: () => void
}

const CONTACT_PHONE = '+32 (0)80 68 40 78'
const CONTACT_EMAIL = 'info@valdelacascade.be'

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: "'Luckiest Guy', cursive", fontSize: 14, color: '#7a1818',
      padding: '4px 0', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
    }}>
      ← Retour
    </button>
  )
}

function PriceRow({ label, price, dp }: { label: string; price: string; dp?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #e8d49a' }}>
      <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a' }}>{label}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ backgroundColor: '#7a1818', borderRadius: 6, padding: '2px 9px', color: '#ffd700', fontFamily: "'Luckiest Guy', cursive", fontSize: 13 }}>
          {price}
        </div>
        {dp && (
          <div style={{ backgroundColor: '#c8900a', borderRadius: 6, padding: '2px 9px', color: '#fdf5dd', fontFamily: "'Luckiest Guy', cursive", fontSize: 13 }}>
            {dp} <span style={{ fontSize: 10 }}>DP</span>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#fdf5dd', border: '1px solid #c8900a', borderRadius: 8,
      padding: '8px 12px', marginTop: 10,
      fontFamily: "'Crimson Text', serif", fontSize: 12, color: '#8b6030', lineHeight: 1.5,
    }}>
      {children}
    </div>
  )
}

function AubergePage({ onBack, onBooking }: { onBack: () => void; onBooking: () => void }) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 28, color: '#7a1818', textShadow: '1px 1px 0 #c8900a' }}>L'Auberge</div>
        <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 12, color: '#8b6030', marginTop: 2 }}>Charme rustique et authenticité</div>
      </div>
      <div style={{ height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 14, border: '2px solid #c8900a' }}>
        <ImageWithFallback src={aubergeImg} alt="L'Auberge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: '#7a1818', marginBottom: 8 }}>Tarifs par nuitée</div>
        <PriceRow label="1 personne" price="105 €" dp="160 €" />
        <PriceRow label="2 personnes" price="110 €" dp="234 €" />
      </div>

      <InfoNote>
        💡 La <strong>demi-pension</strong> inclut le petit-déjeuner buffet + menu 3 services au restaurant.<br />
        Taxe de séjour : 3,50 €/nuit.
      </InfoNote>

      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', margin: '12px 0' }}>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: '#7a1818', marginBottom: 6 }}>✦ Services inclus</div>
        <ul style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a', paddingLeft: 18, margin: 0, lineHeight: 1.9 }}>
          <li>Accès WiFi gratuit</li>
          <li>Parking à proximité</li>
          <li>Accès au jardin et à la terrasse</li>
          <li>Animaux non admis, sauf dans les gîtes spécifiés</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <CartoonButton icon="📅" onClick={onBooking}>Réserver</CartoonButton>
        <CartoonButton icon="📞" variant="secondary">
          {CONTACT_PHONE}
        </CartoonButton>
      </div>
    </div>
  )
}

function HotelPage({ onBack, onBooking }: { onBack: () => void; onBooking: () => void }) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 28, color: '#7a1818', textShadow: '1px 1px 0 #c8900a' }}>L'Hôtel</div>
        <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 12, color: '#8b6030', marginTop: 2 }}>18 chambres, confort & vue sur les Ardennes</div>
      </div>
      <div style={{ height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 14, border: '2px solid #c8900a' }}>
        <ImageWithFallback src={nosChambresImg} alt="Nos Chambres" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Chambre standard */}
      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 17, color: '#7a1818', marginBottom: 8 }}>Chambre Standard</div>
        <PriceRow label="1 personne" price="110 €" dp="172 €" />
        <PriceRow label="2 personnes" price="120 €" dp="244 €" />
      </div>

      {/* Chambre 2 lits */}
      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 17, color: '#7a1818', marginBottom: 8 }}>Chambre à 2 lits</div>
        <PriceRow label="1 personne" price="120 €" dp="182 €" />
        <PriceRow label="2 personnes" price="130 €" dp="254 €" />
      </div>

      {/* Chambre bain à bulles */}
      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 17, color: '#7a1818', marginBottom: 8 }}>Chambre avec bain à bulles 🛁</div>
        <PriceRow label="1 personne" price="130 €" dp="192 €" />
        <PriceRow label="2 personnes" price="150 €" dp="274 €" />
      </div>

      <InfoNote>
        💡 <strong>Demi-pension</strong> = petit-déjeuner buffet + menu 3 services. Taxe de séjour : 3,50 €/nuit.<br />
        Petit-déjeuner seul : 18 € (adulte) · 13 € (7–15 ans) · 9 € (moins de 6 ans)
      </InfoNote>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        <CartoonButton icon="📅" onClick={onBooking}>Réserver</CartoonButton>
        <CartoonButton icon="📞" variant="secondary">{CONTACT_PHONE}</CartoonButton>
      </div>
    </div>
  )
}

function GitesPage({ onBack, onBooking }: { onBack: () => void; onBooking: () => void }) {
  const gites = [
    {
      name: 'La Petite Brique',
      capacity: '2 personnes · 1 chambre',
      price: '155 €',
      extras: '',
      desc: 'Gîte intime et cosy, idéal pour un séjour en duo au cœur des Ardennes.',
    },
    {
      name: 'Chez Léon',
      capacity: '4 personnes · 2 chambres',
      price: '255 €',
      extras: '🐕 Chien admis · Accès jardin',
      desc: 'Réparti sur rez-de-chaussée et 1er étage, avec lits doubles ou simples. Accès jardin.',
    },
    {
      name: 'Chez Marie',
      capacity: '6 personnes · 3 chambres',
      price: '355 €',
      extras: '🐕 Chien admis · Accès jardin',
      desc: 'Sur 1er et 2e étages, lits doubles ou simples. Grand jardin pour profiter de la nature ardennaise.',
    },
    {
      name: 'Chez Ninine',
      capacity: '9 personnes · 4 chambres',
      price: '490 €',
      extras: '',
      desc: "Le plus grand de nos gîtes, parfait pour les familles ou groupes d'amis en quête d'une escapade en Ardenne.",
    },
  ]

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 28, color: '#7a1818', textShadow: '1px 1px 0 #c8900a' }}>Les Gîtes</div>
        <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 12, color: '#8b6030', marginTop: 2 }}>Indépendance & immersion nature</div>
      </div>

      {gites.map((g, i) => (
        <div key={i} style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 18, color: '#7a1818' }}>{g.name}</div>
            <div style={{ backgroundColor: '#7a1818', borderRadius: 8, padding: '3px 10px', color: '#ffd700', fontFamily: "'Luckiest Guy', cursive", fontSize: 14, whiteSpace: 'nowrap' }}>
              {g.price}<span style={{ fontSize: 10 }}>/nuit</span>
            </div>
          </div>
          <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 11, color: '#c8900a', marginBottom: 4 }}>
            👥 {g.capacity}{g.extras ? ' · ' + g.extras : ''}
          </div>
          <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#5c3d1a', fontStyle: 'italic', lineHeight: 1.45 }}>{g.desc}</div>
        </div>
      ))}

      <InfoNote>
        Taxe de séjour : 3,50 €/nuit. Prix par nuitée, hors petit-déjeuner.<br />
        Linge de lit inclus. Réservation directe recommandée.
      </InfoNote>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        <CartoonButton icon="📅" onClick={onBooking}>Réserver</CartoonButton>
        <CartoonButton icon="📞" variant="secondary">{CONTACT_PHONE}</CartoonButton>
      </div>
    </div>
  )
}

function ChaletPage({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 28, color: '#7a1818', textShadow: '1px 1px 0 #c8900a' }}>Le Chalet</div>
        <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 12, color: '#8b6030', marginTop: 2 }}>Événements & réceptions jusqu'à 80 personnes</div>
      </div>

      <div style={{ backgroundColor: '#7a1818', border: '2px solid #c8900a', borderRadius: 12, padding: '14px', marginBottom: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 4 }}>🏠</div>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 22, color: '#ffd700' }}>Jusqu'à 80 personnes</div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#fdf5dd', fontStyle: 'italic', marginTop: 4 }}>
          Réceptions · Banquets · Conférences · Spectacles
        </div>
      </div>

      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: '#7a1818', marginBottom: 8 }}>Équipements inclus</div>
        {['🔊 Sonorisation professionnelle', '💡 Éclairage scénique', '📽️ Matériel de projection', '🌿 Terrasse extérieure aménageable', '🍖 Possibilité barbecue & food truck', '🎠 Plaine de jeux extérieure', '🅿️ Parking à proximité'].map((item, i) => (
          <div key={i} style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a', padding: '4px 0', borderBottom: i < 6 ? '1px solid #e8d49a' : 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            {item}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: '#7a1818', marginBottom: 6 }}>Service bar et restaurant</div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a', fontStyle: 'italic', lineHeight: 1.5 }}>
          Nos équipes assurent le service de restauration sur place : cocktail dînatoire, buffet ou repas assis, selon vos souhaits.
        </div>
      </div>
 
      <InfoNote>
        Tarif sur devis selon la nature et la durée de l'événement.<br />
        Contactez Nathalie pour établir votre projet personnalisé.
      </InfoNote>
 
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        <CartoonButton icon="📞">Demande de devis : {CONTACT_PHONE}</CartoonButton>
        <CartoonButton icon="✉️" variant="secondary">{CONTACT_EMAIL}</CartoonButton>
      </div>
    </div>
  )
}

function BookingPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dates, setDates] = useState('')
  const [persons, setPersons] = useState('2')
  const [type, setType] = useState('hotel')
  const [sent, setSent] = useState(false)

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '2px solid #c8900a', borderRadius: 8,
    backgroundColor: '#fdf5dd', fontFamily: "'Crimson Text', serif", fontSize: 15, color: '#4a2a0a', outline: 'none',
  }
  const labelStyle = {
    display: 'block', fontFamily: "'Luckiest Guy', cursive", fontSize: 12, color: '#7a1818', marginBottom: 4, marginTop: 10,
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>✉️</div>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 24, color: '#7a1818', marginBottom: 8 }}>Demande envoyée !</div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 15, color: '#5c3d1a', marginBottom: 6 }}>
          Nathalie et son équipe vous confirmeront votre réservation dans les plus brefs délais.
        </div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#8b6030', marginBottom: 20 }}>
          📞 {CONTACT_PHONE} · ✉️ {CONTACT_EMAIL}
        </div>
        <CartoonButton onClick={onBack}>Retour à l'accueil</CartoonButton>
      </div>
    )
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 26, color: '#7a1818', textAlign: 'center', marginBottom: 14 }}>
        Réservation
      </div>

      <label style={labelStyle}>Type d'hébergement</label>
      <select style={inputStyle} value={type} onChange={e => setType(e.target.value)}>
        <option value="auberge">Auberge</option>
        <option value="hotel-std">Hôtel — Chambre Standard</option>
        <option value="hotel-2lits">Hôtel — Chambre 2 lits</option>
        <option value="hotel-bulles">Hôtel — Chambre bain à bulles</option>
        <option value="gite-brique">Gîte La Petite Brique (2p)</option>
        <option value="gite-leon">Gîte Chez Léon (4p)</option>
        <option value="gite-marie">Gîte Chez Marie (6p)</option>
        <option value="gite-ninine">Gîte Chez Ninine (9p)</option>
        <option value="chalet">Chalet événementiel</option>
      </select>

      <label style={labelStyle}>Nom complet</label>
      <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Marie Dupont" />

      <label style={labelStyle}>Email</label>
      <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="marie@exemple.be" type="email" />

      <label style={labelStyle}>Dates souhaitées</label>
      <input style={inputStyle} value={dates} onChange={e => setDates(e.target.value)} placeholder="ex : du 15 au 18 août 2025" />

      <label style={labelStyle}>Nombre de personnes</label>
      <select style={inputStyle} value={persons} onChange={e => setPersons(e.target.value)}>
        {['1','2','3','4','5','6','7','8','9'].map(n => (
          <option key={n} value={n}>{n} personne{+n > 1 ? 's' : ''}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
        <CartoonButton icon="✉️" onClick={() => setSent(true)} disabled={!name || !email}>
          Envoyer la demande
        </CartoonButton>
      </div>
      <div style={{
        marginTop: 10, padding: 10, backgroundColor: '#fdf5dd',
        border: '1px solid #c8900a', borderRadius: 8,
        fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#8b6030', textAlign: 'center',
      }}>
        📞 {CONTACT_PHONE}<br />
        ✉️ {CONTACT_EMAIL}
      </div>
    </div>
  )
}

export default function HotelSection({ onBack }: Props) {
  const [subPage, setSubPage] = useState<SubPage>('menu')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5e4b4' }}>
      <CartoonFrame innerPadding={16} style={{ flex: 1, margin: 0, borderRadius: 0, overflowY: 'auto' }}>
        {subPage === 'menu' && (
          <div>
            <BackButton onClick={onBack} />
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ height: 140, borderRadius: 12, overflow: 'hidden', marginBottom: 10, border: '2px solid #c8900a' }}>
                <ImageWithFallback src={mainImg} alt="Val de la Cascade" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 30, color: '#7a1818', textShadow: '2px 2px 0 #c8900a' }}>
                L'Hôtel
              </div>
              <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 12, color: '#8b6030', marginTop: 2 }}>
                Petit Coo 1, 4970 Stavelot
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <CartoonButton icon="🏡" onClick={() => setSubPage('auberge')}>L'Auberge</CartoonButton>
              <CartoonButton icon="🏨" onClick={() => setSubPage('hotel')}>L'Hôtel — 18 chambres</CartoonButton>
              <CartoonButton icon="🌲" onClick={() => setSubPage('gites')}>Les Gîtes</CartoonButton>
              <CartoonButton icon="🏠" onClick={() => setSubPage('chalet')}>Le Chalet événementiel</CartoonButton>
              <CartoonButton icon="📅" onClick={() => setSubPage('booking')} variant="gold">Réserver</CartoonButton>
            </div>
            <div style={{ marginTop: 14, padding: 10, backgroundColor: '#fdf5dd', border: '1px solid #c8900a', borderRadius: 8,
              fontFamily: "'Crimson Text', serif", fontSize: 12, color: '#8b6030', textAlign: 'center' }}>
              Fermé le mercredi & jeudi<br />
              📞 {CONTACT_PHONE}
            </div>          </div>
        )}
        {subPage === 'auberge' && <AubergePage onBack={() => setSubPage('menu')} onBooking={() => setSubPage('booking')} />}
        {subPage === 'hotel' && <HotelPage onBack={() => setSubPage('menu')} onBooking={() => setSubPage('booking')} />}
        {subPage === 'gites' && <GitesPage onBack={() => setSubPage('menu')} onBooking={() => setSubPage('booking')} />}
        {subPage === 'chalet' && <ChaletPage onBack={() => setSubPage('menu')} />}
        {subPage === 'booking' && <BookingPage onBack={() => setSubPage('menu')} />}
      </CartoonFrame>
    </div>
  )
}
