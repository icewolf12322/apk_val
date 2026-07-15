import { useState, useEffect, type CSSProperties } from 'react'
import CartoonFrame from './CartoonFrame'
import CartoonButton from './CartoonButton'
import MonkeyGroomCanvas from './pixi/MonkeyGroomCanvas'

interface Props {
  onBack: () => void
}

type Tab = 'horaires' | 'activites' | 'faq' | 'livre-or'

interface Comment {
  id: string
  name: string
  date: string
  text: string
  rating: number
  approved: boolean
}

const INITIAL_COMMENTS: Comment[] = [
  { id: '1', name: 'Marie-Claire B.', date: '2024-08-15', text: "Séjour magique ! Les chambres sont magnifiques et la cuisine... un régal absolu. Le sanglier était divin. Nous reviendrons l'an prochain.", rating: 5, approved: true },
  { id: '2', name: 'Hans Mueller', date: '2024-07-28', text: "Wunderschöner Aufenthalt in dieser ruhigen Ecke der Ardennen. Das Frühstück war köstlich und das Personal sehr freundlich. Absolut empfehlenswert!", rating: 5, approved: true },
  { id: '3', name: 'Famille Dubois', date: '2024-06-10', text: "Nous avons passé 4 jours merveilleux avec nos enfants. Les gîtes sont parfaitement équipés et le cadre naturel est exceptionnel. Les enfants ont adoré la cascade !", rating: 5, approved: true },
  { id: '4', name: 'Peter Van den Berg', date: '2024-09-03', text: "Prachtige omgeving, vriendelijk personeel. Het restaurant is een echte ontdekking. De forel was subliem vers. We komen zeker terug!", rating: 5, approved: true },
]

const FAQ_DATA = [
  { q: "Quels sont les jours de fermeture ?", a: "L'établissement est fermé le mercredi et le jeudi. Pour toute demande urgente, contactez-nous au +32 (0)80 68 40 78 ou par email à info@valdelacascade.be." },
  { q: "Comment réserver une chambre ou un gîte ?", a: "Via notre formulaire in-app (Hôtel > Réserver), par téléphone au +32 (0)80 68 40 78, ou par email à info@valdelacascade.be. Nathalie et son équipe vous répondront rapidement." },
  { q: "Les animaux de compagnie sont-ils acceptés ?", a: "Les chiens sont acceptés dans les gîtes 'Chez Léon' et 'Chez Marie', qui disposent d'un accès jardin. Merci de le préciser lors de la réservation." },
  { q: "La demi-pension, c'est quoi exactement ?", a: "La demi-pension inclut le petit-déjeuner buffet + un menu 3 services au restaurant gastronomique. Le petit-déjeuner seul est à 18 € (adulte), 13 € (7–15 ans), 9 € (moins de 6 ans)." },
  { q: "Le restaurant est-il ouvert aux non-résidents ?", a: "Oui, brasserie et restaurant sont ouverts à tous. Réservation fortement recommandée, surtout le week-end et en haute saison. Capacité : 100 couverts." },
  { q: "Le chalet est-il disponible pour des événements privés ?", a: "Absolument ! Le chalet accueille jusqu'à 80 personnes pour réceptions, banquets, conférences et spectacles. Il est équipé de sonorisation, d'éclairage et de matériel de projection. Tarif sur devis : +32 (0)80 68 40 78." },
  { q: "Y a-t-il un parking sur place ?", a: "Oui, un parking est disponible à proximité de l'établissement." },
  { q: "Où se situe le Val de la Cascade ?", a: "Petit Coo 1, 4970 Stavelot, Belgique — à deux pas de la célèbre Cascade de Coo, au cœur des Ardennes liégeoises." },
]

const ACTIVITIES = [
  { emoji: '💦', name: 'La Cascade de Coo', desc: "La célèbre cascade de Coo est à deux pas ! Promenades au pied des chutes, accrobranche, karting et parc d'attractions du domaine de Coo." },
  { emoji: '🥾', name: 'Randonnées pédestres', desc: "Des centaines de km de sentiers GR balisés au départ de Stavelot et de Coo. Les Hautes Fagnes (réserve naturelle classée UNESCO) à moins de 30 km." },
  { emoji: '🚵', name: 'VTT & Vélo', desc: "Le RAVeL et les circuits VTT balisés des Ardennes partent à proximité. Cols, forêts centenaires, et panoramas sur la vallée de l'Amblève." },
  { emoji: '🎣', name: 'Pêche & nature', desc: "La région est réputée pour la pêche à la truite dans l'Amblève et ses affluents. Permis de pêche disponible auprès des autorités locales." },
  { emoji: '🏊', name: 'Kayak & sports d\'eau', desc: "Descentes en kayak sur l'Amblève organisées par les prestataires locaux. Idéal pour les familles dès le printemps." },
  { emoji: '🍺', name: 'Abbayes et bières belges', desc: "Trappiste de Rochefort (35 km), Val-Dieu (45 km), Orval (60 km) — les plus grandes abbayes brassicoles de Belgique sont à portée de voiture." },
  { emoji: '⛷️', name: 'Sports d\'hiver', desc: "Ski de fond, raquettes et luge à Baraque de Fraiture (25 km) dès que la neige pointe. En hiver, l'Ardenne revêt un manteau féerique." },
  { emoji: '🏰', name: 'Patrimoine & culture', desc: "Abbaye de Stavelot (musée du circuit de Spa-Francorchamps !), Spa, les grottes de Han-sur-Lesse, le château de Bouillon." },
]

function HorairesTab() {
  const hours = [
    { service: 'Brasserie', jours: 'Ven, Sam, Dim, Lun, Mar', heures: 'Service continu', closed: false },
    { service: 'Restaurant gastronomique', jours: 'Ven, Sam, Dim, Lun, Mar', heures: 'Midi & soir', closed: false },
    { service: 'Fermeture hebdomadaire', jours: '⚠️ Mercredi & Jeudi', heures: 'Fermé', closed: true },
    { service: 'Check-in hôtel', jours: '', heures: 'dès 14h00', closed: false },
    { service: 'Check-out hôtel', jours: '', heures: 'avant 11h00', closed: false },
  ]

  const seasons = [
    { label: 'Haute saison', months: 'Juil–Août & fêtes', note: 'Réservation indispensable', color: '#7a1818' },
    { label: 'Basse saison', months: 'Sep–Juin', note: 'Fermé mer. & jeu.', color: '#c8900a' },
  ]

  return (
    <div>
      <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 18, color: '#7a1818', marginBottom: 10 }}>Horaires d'ouverture</div>
      {hours.map((h, i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 10px',
          backgroundColor: (h as any).closed ? '#fce8e8' : i % 2 === 0 ? '#fdf5dd' : '#f5e4b4',
          borderRadius: 8, marginBottom: 4,
          border: `1px solid ${(h as any).closed ? '#e08080' : '#e8d49a'}`,
        }}>
          <div>
            <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 12, color: (h as any).closed ? '#9b2525' : '#7a1818' }}>{h.service}</div>
            {h.jours && <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 12, color: '#8b6030' }}>{h.jours}</div>}
          </div>
          <div style={{
            backgroundColor: (h as any).closed ? '#9b2525' : '#c8900a',
            borderRadius: 6, padding: '2px 8px', color: '#fdf5dd',
            fontFamily: "'Luckiest Guy', cursive", fontSize: 13,
          }}>
            {h.heures}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 16, color: '#7a1818', marginBottom: 8 }}>Saisons</div>
        {seasons.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.color, marginTop: 5, flexShrink: 0 }} />
            <div>
              <span style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 12, color: s.color }}>{s.label} </span>
              <span style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#5c3d1a' }}>({s.months}) — {s.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contact block */}
      <div style={{ marginTop: 16, backgroundColor: '#7a1818', border: '2px solid #c8900a', borderRadius: 12, padding: '12px 14px' }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 15, color: '#ffd700', marginBottom: 8 }}>Contact et accès</div>
        {[
          { icon: '📍', text: 'Petit Coo 1, 4970 Stavelot, Belgique' },
          { icon: '📞', text: '+32 (0)80 68 40 78' },
          { icon: '✉️', text: 'info@valdelacascade.be' },
          { icon: '📘', text: 'facebook.com/valdelacascade' },
          { icon: '📸', text: '@val_de_la_cascade' },
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#fdf5dd', lineHeight: 1.4 }}>{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivitesTab() {
  return (
    <div>
      <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 18, color: '#7a1818', marginBottom: 12 }}>Découvrir les Ardennes</div>
      {ACTIVITIES.map((a, i) => (
        <div key={i} style={{
          backgroundColor: '#fdf5dd', border: '2px solid #e8d49a',
          borderRadius: 12, padding: '10px 12px', marginBottom: 8,
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 28 }}>{a.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: '#7a1818', marginBottom: 2 }}>{a.name}</div>
            <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#5c3d1a', fontStyle: 'italic', lineHeight: 1.4 }}>{a.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FAQTab() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 18, color: '#7a1818', marginBottom: 12 }}>Questions Fréquentes</div>
      {FAQ_DATA.map((item, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', textAlign: 'left', background: open === i ? '#7a1818' : '#fdf5dd',
              border: '2px solid #c8900a', borderRadius: 10, padding: '10px 12px',
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: open === i ? '#ffd700' : '#7a1818', lineHeight: 1.3, paddingRight: 8 }}>
              {item.q}
            </span>
            <span style={{ color: open === i ? '#ffd700' : '#c8900a', fontSize: 16, flexShrink: 0 }}>{open === i ? '▲' : '▼'}</span>
          </button>
          {open === i && (
            <div style={{
              backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderTop: 'none',
              borderRadius: '0 0 10px 10px', padding: '10px 12px',
              fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a',
              fontStyle: 'italic', lineHeight: 1.55,
            }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function LivreOrTab() {
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem('valcascade-comments')
      return saved ? [...INITIAL_COMMENTS, ...JSON.parse(saved)] : INITIAL_COMMENTS
    } catch {
      return INITIAL_COMMENTS
    }
  })
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)

  function handleSubmit() {
    if (!name.trim() || !text.trim()) return
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      date: new Date().toISOString().slice(0, 10),
      text: text.trim(),
      rating,
      approved: false,
    }
    const saved = comments.filter(c => !INITIAL_COMMENTS.find(ic => ic.id === c.id))
    const newSaved = [...saved, newComment]
    localStorage.setItem('valcascade-comments', JSON.stringify(newSaved))
    setComments(prev => [...prev, newComment])
    setName('')
    setText('')
    setRating(5)
    setSubmitted(true)
    setShowForm(false)
  }

  const approved = comments.filter(c => c.approved)

  const inputStyle = {
    width: '100%', padding: '8px 10px',
    border: '2px solid #c8900a', borderRadius: 8,
    backgroundColor: '#fdf5dd', fontFamily: "'Crimson Text', serif",
    fontSize: 14, color: '#4a2a0a', outline: 'none',
  }

  return (
    <div>
      <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 18, color: '#7a1818', marginBottom: 4 }}>Livre d'Or ✨</div>
      <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#8b6030', fontStyle: 'italic', marginBottom: 12 }}>
        Les témoignages de nos hôtes, publiés après modération.
      </div>

      {submitted && (
        <div style={{ backgroundColor: '#e8f4e8', border: '2px solid #5a8a2a', borderRadius: 10, padding: 12, marginBottom: 12,
          fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#2a5a1a', textAlign: 'center' }}>
          ✅ Merci ! Votre commentaire sera publié après modération.
        </div>
      )}

      {approved.map(c => (
        <div key={c.id} style={{
          backgroundColor: '#fdf5dd', border: '2px solid #e8d49a',
          borderRadius: 12, padding: '12px', marginBottom: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 13, color: '#7a1818' }}>{c.name}</div>
            <div>
              {'⭐'.repeat(c.rating)}
            </div>
          </div>
          <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a', fontStyle: 'italic', lineHeight: 1.5 }}>
            "{c.text}"
          </div>
          <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 11, color: '#b8a080', marginTop: 4, textAlign: 'right' }}>
            {new Date(c.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      ))}

      {showForm ? (
        <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #c8900a', borderRadius: 12, padding: 14, marginTop: 8 }}>
          <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 16, color: '#7a1818', marginBottom: 10 }}>Laisser un commentaire</div>
          <label style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 11, color: '#7a1818', display: 'block', marginBottom: 4 }}>Votre prénom / nom</label>
          <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Marie Dupont" />
          <label style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 11, color: '#7a1818', display: 'block', marginTop: 10, marginBottom: 4 }}>Note</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4, 5].map(r => (
              <button key={r} onClick={() => setRating(r)} style={{
                fontSize: 22, background: 'none', border: 'none', cursor: 'pointer',
                opacity: r <= rating ? 1 : 0.3, transition: 'opacity 0.1s',
              }}>⭐</button>
            ))}
          </div>
          <label style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 11, color: '#7a1818', display: 'block', marginTop: 10, marginBottom: 4 }}>Votre commentaire</label>
          <textarea
            style={{ ...inputStyle, height: 90, resize: 'none' } as CSSProperties}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Partagez votre expérience au Val de la Cascade..."
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <CartoonButton onClick={handleSubmit} disabled={!name || !text}>Envoyer ✉️</CartoonButton>
            <button onClick={() => setShowForm(false)} style={{
              flex: '0 0 auto', padding: '10px 16px', border: '2px solid #c8900a',
              borderRadius: 30, backgroundColor: 'transparent', color: '#7a1818',
              fontFamily: "'Luckiest Guy', cursive", fontSize: 14, cursor: 'pointer',
            }}>Annuler</button>
          </div>
        </div>
      ) : (
        <CartoonButton icon="✍️" onClick={() => setShowForm(true)}>Écrire dans le Livre d'Or</CartoonButton>
      )}
    </div>
  )
}

export default function InfosSection({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('horaires')
  const [showMonkeyHint, setShowMonkeyHint] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowMonkeyHint(false), 5000)
    return () => clearTimeout(t)
  }, [tab])

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'horaires', label: 'Horaires', emoji: '🕐' },
    { id: 'activites', label: 'Activités', emoji: '🥾' },
    { id: 'faq', label: 'FAQ', emoji: '❓' },
    { id: 'livre-or', label: 'Livre d\'Or', emoji: '📖' },
  ]

  function switchTab(t: Tab) {
    setTab(t)
    setShowMonkeyHint(t === 'livre-or')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5e4b4' }}>
      <CartoonFrame innerPadding={16} style={{ flex: 1, margin: 0, borderRadius: 0, overflowY: 'auto' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Luckiest Guy', cursive", fontSize: 14, color: '#7a1818',
          padding: '4px 0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          ← Retour
        </button>

        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 28, color: '#7a1818', textShadow: '1px 1px 0 #c8900a' }}>
            Infos Utiles
          </div>
        </div>

        {/* Monkey groom character with bubble pointing to Livre d'Or */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 14, position: 'relative' }}>
          <div style={{ flexShrink: 0 }}>
            <MonkeyGroomCanvas width={80} height={125} />
          </div>
          {(showMonkeyHint || tab === 'livre-or') && (
            <div style={{
              backgroundColor: '#fdf5dd',
              border: '2px solid #c8900a',
              borderRadius: 12,
              padding: '8px 12px',
              fontFamily: "'Crimson Text', serif",
              fontSize: 13,
              color: '#4a2a0a',
              fontStyle: 'italic',
              position: 'relative',
              animation: 'bounce-in 0.4s ease-out',
              marginBottom: 10,
            }}>
              <div style={{
                position: 'absolute', left: -10, bottom: 12,
                width: 0, height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '10px solid #c8900a',
              }} />
              <div style={{
                position: 'absolute', left: -7, bottom: 13.5,
                width: 0, height: 0,
                borderTop: '6.5px solid transparent',
                borderBottom: '6.5px solid transparent',
                borderRight: '8px solid #fdf5dd',
              }} />
              <strong>Psst !</strong> Vous avez aimé votre séjour ?<br />
              👉 Laissez-nous un mot dans le <span style={{ color: '#c8900a', fontWeight: 'bold' }}>Livre d'Or !</span> 📖
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5, marginBottom: 16 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              style={{
                padding: '6px 4px',
                border: `2px solid ${tab === t.id ? '#7a1818' : '#c8900a'}`,
                borderRadius: 10,
                backgroundColor: tab === t.id ? '#7a1818' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.15s',
                boxShadow: t.id === 'livre-or' && tab !== 'livre-or' ? '0 0 8px #ffd700' : 'none',
              }}
            >
              <span style={{ fontSize: 18 }}>{t.emoji}</span>
              <span style={{
                fontFamily: "'Luckiest Guy', cursive",
                fontSize: 9,
                color: tab === t.id ? '#ffd700' : '#7a1818',
                lineHeight: 1.2,
                textAlign: 'center',
              }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {tab === 'horaires' && <HorairesTab />}
        {tab === 'activites' && <ActivitesTab />}
        {tab === 'faq' && <FAQTab />}
        {tab === 'livre-or' && <LivreOrTab />}
      </CartoonFrame>
    </div>
  )
}
