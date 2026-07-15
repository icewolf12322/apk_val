import CartoonFrame from './CartoonFrame'
import CartoonButton from './CartoonButton'

interface Props {
  onBack: () => void
}

function TimelineEvent({ year, title, desc, emoji, last }: {
  year: string; title: string; desc: string; emoji: string; last?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: last ? 0 : 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          backgroundColor: '#7a1818', border: '2px solid #c8900a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>
          {emoji}
        </div>
        {!last && <div style={{ width: 2, flex: 1, backgroundColor: '#c8900a', minHeight: 20 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: 4 }}>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 13, color: '#c8900a', letterSpacing: '0.05em' }}>{year}</div>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 15, color: '#7a1818', marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a', lineHeight: 1.55, fontStyle: 'italic' }}>{desc}</div>
      </div>
    </div>
  )
}

function OwnerCard({ name, role, desc, emoji }: { name: string; role: string; desc: string; emoji: string }) {
  return (
    <div style={{
      backgroundColor: '#fdf5dd', border: '2px solid #c8900a',
      borderRadius: 14, padding: '14px', marginBottom: 12,
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 58, height: 58, borderRadius: '50%',
        backgroundColor: '#7a1818', border: '2px solid #c8900a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 30, flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div>
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 17, color: '#7a1818' }}>{name}</div>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 11, color: '#c8900a', marginBottom: 4 }}>{role}</div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#5c3d1a', fontStyle: 'italic', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  )
}

export default function HistoireSection({ onBack }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5e4b4' }}>
      <CartoonFrame innerPadding={16} style={{ flex: 1, margin: 0, borderRadius: 0, overflowY: 'auto' }}>

        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Luckiest Guy', cursive", fontSize: 14, color: '#7a1818',
          padding: '4px 0', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          ← Retour
        </button>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 30, color: '#7a1818', textShadow: '2px 2px 0 #c8900a' }}>
            Notre Histoire
          </div>
          <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 13, color: '#8b6030', marginTop: 4 }}>
            ✦ Depuis 1959, près de la Cascade de Coo ✦
          </div>
        </div>

        {/* Header card */}
        <div style={{
          backgroundColor: '#7a1818', border: '2px solid #c8900a',
          borderRadius: 14, padding: '14px 16px', marginBottom: 20,
        }}>
          <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 15, color: '#ffd700', marginBottom: 6 }}>
            65 ans d'hospitalité ardennaise
          </div>
          <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#fdf5dd', lineHeight: 1.65, fontStyle: 'italic' }}>
            Fondé en 1959 par la famille Constant et niché au cœur de Petit Coo, à deux pas de la célèbre cascade, le Val de la Cascade s'est construit sur une philosophie simple mais exigeante : offrir une cuisine qui célèbre les producteurs artisans locaux, une hospitalité sincère, et une table qui évolue au rythme des saisons.
          </div>
          <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 11, color: '#c8900a', marginTop: 8, textAlign: 'right' }}>
            — Famille Constant
          </div>
        </div>

        {/* Timeline */}
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 20, color: '#7a1818', marginBottom: 14, borderBottom: '2px solid #c8900a', paddingBottom: 6 }}>
          Chronologie
        </div>

        <TimelineEvent
          year="1959"
          emoji="🏗️"
          title="La naissance du Val"
          desc="La famille Constant ouvre les portes du Val de la Cascade à Petit Coo, Stavelot. L'établissement s'installe au cœur de ce cadre exceptionnel, bercé par le murmure de la cascade voisine. Colette, la fondatrice, donne le ton : une maison chaleureuse, une table généreuse."
        />
        <TimelineEvent
          year="Années 70–80"
          emoji="🍽️"
          title="La réputation s'étend"
          desc="L'établissement gagne en notoriété dans toute l'Ardenne. La cuisine du terroir — gibier, truites, bières d'abbaye — attire une clientèle fidèle. La brasserie et le restaurant gastronomique se distinguent peu à peu comme deux offres complémentaires."
        />
        <TimelineEvent
          year="Années 90"
          emoji="👨‍🍳"
          title="Philippe prend les rênes"
          desc="À seulement 22 ans, Philippe Constant reprend l'affaire familiale avec son épouse Nathalie. Un pari audacieux dans un secteur qualifié de 'très difficile', relevé avec passion et rigueur. Ensemble, ils impriment leur vision : une cuisine de saison, des producteurs artisans à l'honneur."
        />
        <TimelineEvent
          year="2000–2010"
          emoji="🏨"
          title="Développement de l'hébergement"
          desc="Extension et modernisation des 18 chambres de l'hôtel et de l'auberge. Création des gîtes pour accueillir les familles et les groupes souhaitant s'imprégner des Ardennes sur plusieurs jours. Le chalet événementiel vient compléter l'offre pour les réceptions et séminaires."
        />
        <TimelineEvent
          year="2025"
          emoji="🎂"
          title="65 ans — et plus que jamais !"
          desc="Le Val de la Cascade célèbre ses 65 ans d'existence. Six décennies de passion, d'accueil et de savoir-faire transmis de génération en génération. Philippe et Nathalie, épaulés par leur équipe, regardent l'avenir avec la même ardeur qu'au premier jour."
          last
        />

        {/* Philosophy */}
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 20, color: '#7a1818', marginBottom: 14, borderBottom: '2px solid #c8900a', paddingBottom: 6, marginTop: 24 }}>
          Notre Philosophie
        </div>
        <div style={{ backgroundColor: '#fdf5dd', border: '2px solid #e8d49a', borderRadius: 12, padding: '14px', marginBottom: 20 }}>
          {[
            { emoji: '🌿', text: "Des producteurs artisans locaux à l'honneur sur chaque assiette" },
            { emoji: '📅', text: 'Une carte qui évolue au fil des saisons, pour sublimer les produits du moment' },
            { emoji: '⚖️', text: "Une recherche constante d'harmonie de saveurs — la signature de Philippe Constant" },
            { emoji: '🤝', text: '100 couverts accueillis avec la même attention, de la brasserie au gastronomique' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 3 ? 10 : 0, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: '#5c3d1a', fontStyle: 'italic', lineHeight: 1.5 }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div style={{ fontFamily: "'Ranchers', cursive", fontSize: 20, color: '#7a1818', marginBottom: 14, borderBottom: '2px solid #c8900a', paddingBottom: 6 }}>
          L'Équipe
        </div>

        <OwnerCard
          emoji="👨‍🍳"
          name="Philippe Constant"
          role="Chef & Patron"
          desc="Fils du fondateur, Philippe a repris l'établissement à 22 ans. Passionné par les produits du terroir ardennais, il compose une cuisine de saison en partenariat avec les producteurs artisans de la région. Sa devise : l'harmonie des saveurs avant tout."
        />
        <OwnerCard
          emoji="👩‍💼"
          name="Nathalie Constant"
          role="Directrice et Accueil"
          desc="Bras droit indispensable de Philippe, Nathalie gère l'accueil, les réservations de chambres, la brasserie et le restaurant, ainsi que l'ensemble de l'équipe. Sa chaleur et son professionnalisme font du Val de la Cascade une maison où l'on se sent toujours bienvenu."
        />

        {/* Contact shortcut */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            backgroundColor: '#fdf5dd', border: '1px solid #c8900a', borderRadius: 10,
            padding: '10px 14px', fontFamily: "'Crimson Text', serif", fontSize: 13, color: '#5c3d1a', textAlign: 'center',
          }}>
            📍 Petit Coo 1, 4970 Stavelot, Belgique<br />
            📞 +32 (0)80 68 40 78 · ✉️ info@valdelacascade.be
          </div>
          <CartoonButton icon="📞">Nous contacter</CartoonButton>
        </div>
      </CartoonFrame>
    </div>
  )
}
