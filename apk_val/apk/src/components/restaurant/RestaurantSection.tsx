import { useState, type CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import CartoonFrame from "../CartoonFrame"
import WolfGroomCanvas from "../pixi/WolfGroomCanvas"
import {
  restaurantAllergens,
  restaurantMenuSections,
  type RestaurantAllergen,
  type RestaurantMenuItem,
  type RestaurantMenuSection,
} from "./menuData"
import {
  getMenuTranslation,
  restaurantMenuGroupTranslations,
  restaurantMenuTranslations,
} from "./menuTranslations"

type LangCode = "fr" | "en" | "de" | "nl" | "es" | "it" | "duck"
type MenuTab = "suggestions" | "carte" | "allergenes"

interface LocalizedMenuItem {
  id: string
  name: Record<LangCode, string>
  desc: Record<LangCode, string>
  price: string
  emoji: string
}

interface Props {
  onBack: () => void
  onArcade: () => void
}

const allergenById = new Map(
  restaurantAllergens.map((allergen) => [allergen.id, allergen]),
)

const flagBaseStyle: CSSProperties = {
  width: 34,
  height: 24,
  borderRadius: 4,
  border: "1px solid rgba(74, 42, 10, 0.28)",
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.35)",
  overflow: "hidden",
}

const countryFlagStyles: Partial<Record<LangCode, CSSProperties>> = {
  fr: {
    background:
      "linear-gradient(90deg, #0055a4 0 33.333%, #ffffff 33.333% 66.666%, #ef4135 66.666% 100%)",
  },
  en: {
    background:
      "linear-gradient(0deg, transparent 42%, #ffffff 42% 58%, transparent 58%), linear-gradient(90deg, transparent 42%, #ffffff 42% 58%, transparent 58%), linear-gradient(0deg, transparent 46%, #c8102e 46% 54%, transparent 54%), linear-gradient(90deg, transparent 46%, #c8102e 46% 54%, transparent 54%), linear-gradient(35deg, transparent 43%, #ffffff 43% 49%, #c8102e 49% 52%, #ffffff 52% 58%, transparent 58%), linear-gradient(145deg, transparent 43%, #ffffff 43% 49%, #c8102e 49% 52%, #ffffff 52% 58%, transparent 58%), #012169",
  },
  de: {
    background:
      "linear-gradient(180deg, #000000 0 33.333%, #dd0000 33.333% 66.666%, #ffce00 66.666% 100%)",
  },
  nl: {
    background:
      "linear-gradient(180deg, #ae1c28 0 33.333%, #ffffff 33.333% 66.666%, #21468b 66.666% 100%)",
  },
  es: {
    background:
      "linear-gradient(180deg, #aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75% 100%)",
  },
  it: {
    background:
      "linear-gradient(90deg, #009246 0 33.333%, #ffffff 33.333% 66.666%, #ce2b37 66.666% 100%)",
  },
}

const menuSectionGroups = [
  {
    id: "petite-faim",
    title: "Petite faim",
    sectionIds: [
      "nos-planches-a-partager",
      "nos-tapas-froids",
      "tapas-chaudes-du-val",
      "nos-potages",
      "nos-paninis",
      "le-casse-croute",
      "nos-en-cas-traditionnels",
      "nos-croques",
      "nos-plats-friterie",
      "nos-entrees-froides",
      "nos-entrees-chaudes",
    ],
  },
  {
    id: "faim-de-loup",
    title: "Faim de loup",
    sectionIds: [
      "nos-plats-froids",
      "nos-pates-fraiches",
      "nos-viandes",
      "nos-poissons",
      "notre-cuisine-traditionnelle",
      "nos-burgers",
      "nos-salades",
      "nos-propositions-vegetariennes",
      "enfants",
    ],
  },
  {
    id: "coin-des-gourmands",
    title: "Coin des gourmands",
    sectionIds: ["sucre-gaufre-crepes", "glaces-maison", "les-desserts"],
  },
] as const

function LanguageFlag({
  lang,
  flag,
  label,
}: {
  lang: LangCode
  flag: string
  label: string
}) {
  const countryFlagStyle = countryFlagStyles[lang]

  if (!countryFlagStyle) {
    return (
      <span aria-hidden="true" style={{ fontSize: 28, lineHeight: 1 }}>
        {flag}
      </span>
    )
  }

  return (
    <span
      aria-label={label}
      role="img"
      style={{ ...flagBaseStyle, ...countryFlagStyle }}
    />
  )
}

function formatPrice(price: number) {
  return price.toLocaleString("fr-BE", {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

function normalizeMenuText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

const menuItemIconRules = [
  { icon: "🧄", keywords: ["ail", "ail des ours"] },
  { icon: "🍅", keywords: ["tomate", "tomates"] },
  { icon: "🍤", keywords: ["crevette", "crevettes", "scampi", "scampis", "gamba", "gambas"] },
  { icon: "🐚", keywords: ["moule", "moules", "huitre", "huitres", "mollusque"] },
  { icon: "🍯", keywords: ["noix", "amande", "amandes", "noisette", "noisettes", "marron"] },
  { icon: "🎣", keywords: ["poisson", "poissons", "saumon", "truite", "truites", "meuniere"] },
  { icon: "🧀", keywords: ["fromage", "fromages", "camembert", "parmesan", "bairsou", "bouquet des moines"] },
  { icon: "🥓", keywords: ["charcuterie", "salami", "jambon", "lard", "boudin", "terrine", "pate"] },
  { icon: "🦆", keywords: ["foie gras", "perigourdine"] },
  { icon: "🥩", keywords: ["steak", "entrecote", "boeuf", "veau", "agneau", "spare-ribs", "carbonnade", "tartare", "gigotin", "filet americain"] },
  { icon: "🍗", keywords: ["poulet", "volaille", "vol au vent", "coq"] },
  { icon: "🍳", keywords: ["omelette", "oeuf", "oeufs"] },
  { icon: "🍄", keywords: ["champignon", "champignons", "bois", "forestiere"] },
  { icon: "🥦", keywords: ["salade", "salades", "legume", "legumes", "poireau", "poireaux", "celeri"] },
  { icon: "🌿", keywords: ["basilic", "pesto", "persil", "herbe", "herbes", "curry", "peri-peri", "epice", "epices"] },
  { icon: "🥔", keywords: ["frite", "frites", "friterie", "pomme de terre", "pommes de terre"] },
  { icon: "🥖", keywords: ["spaghetti", "penne", "tagliatelle", "pain", "panini", "croque", "gaufre", "crepe", "tarte"] },
  { icon: "🍎", keywords: ["pomme", "pommes", "normande"] },
  { icon: "🍫", keywords: ["chocolat", "mikado", "mousse"] },
  { icon: "🍦", keywords: ["glace", "vanille", "sorbet", "sorbets"] },
  { icon: "🍓", keywords: ["fruit", "fruits", "framboise", "framboises", "confiture"] },
  { icon: "🧈", keywords: ["creme", "lait"] },
  { icon: "🍮", keywords: ["caramel", "creme brulee"] },
  { icon: "☕", keywords: ["cafe"] },
  { icon: "🥂", keywords: ["vin blanc", "grand marnier"] },
  { icon: "🍺", keywords: ["biere"] },
  { icon: "🍈", keywords: ["melon"] },
  { icon: "🍇", keywords: ["raisin", "raisins"] },
  { icon: "🍑", keywords: ["abricot"] },
]

function getMenuItemIcon(item: RestaurantMenuItem, sectionTitle = "") {
  const itemText = normalizeMenuText(`${item.name} ${item.description}`)
  const sectionText = normalizeMenuText(sectionTitle)
  const itemRule = menuItemIconRules.find(({ keywords }) =>
    keywords.some((keyword) => itemText.includes(keyword)),
  )
  const sectionRule = menuItemIconRules.find(({ keywords }) =>
    keywords.some((keyword) => sectionText.includes(keyword)),
  )

  return itemRule?.icon ?? sectionRule?.icon ?? "🍴"
}

function getTranslatedMenuSectionTitle(
  section: RestaurantMenuSection,
  lang: LangCode,
) {
  return getMenuTranslation(
    section.title,
    restaurantMenuTranslations.sections[section.id]?.title,
    lang,
  )
}

function getTranslatedMenuItemDescription(
  item: RestaurantMenuItem,
  section: RestaurantMenuSection,
  lang: LangCode,
) {
  return getMenuTranslation(
    item.description,
    restaurantMenuTranslations.sections[section.id]?.items[item.id]?.description,
    lang,
  )
}

function getTranslatedMenuGroupTitle(
  groupId: keyof typeof restaurantMenuGroupTranslations,
  fallback: string,
  lang: LangCode,
) {
  return getMenuTranslation(
    fallback,
    restaurantMenuGroupTranslations[groupId]?.title,
    lang,
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Luckiest Guy', cursive",
        fontSize: 14,
        color: "#7a1818",
        padding: "4px 0",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      ← {useTranslation().t("back")}
    </button>
  )
}

function SuggestionItemCard({
  item,
  lang,
}: {
  item: LocalizedMenuItem
  lang: LangCode
}) {
  const [open, setOpen] = useState(false)
  const isDuck = lang === "duck"
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        backgroundColor: "#fdf5dd",
        border: `2px solid ${isDuck ? "#f0a000" : "#c8900a"}`,
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 8,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: open ? 6 : 0,
        }}
      >
        <span style={{ fontSize: 22 }}>{item.emoji}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: 13,
              color: "#4a2a0a",
              lineHeight: 1.3,
            }}
          >
            {item.name.fr}
          </div>
          {lang !== "fr" && (
            <div
              style={{
                fontFamily: "'Crimson Text', serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "#7a1818",
              }}
            >
              {item.name[lang]}
            </div>
          )}
        </div>
        <div
          style={{
            backgroundColor: "#7a1818",
            borderRadius: 8,
            padding: "4px 8px",
            color: "#ffd700",
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          {item.price}€
        </div>
        <span style={{ color: "#8b6030", fontSize: 12 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>
      {open && (
        <div
          style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: 14,
            color: "#5c3d1a",
            fontStyle: isDuck ? "normal" : "italic",
            lineHeight: 1.5,
            paddingTop: 6,
            borderTop: "1px solid #e8d49a",
          }}
        >
          {item.desc[lang]}
        </div>
      )}
    </div>
  )
}

function MenuItemCard({
  item,
  section,
  lang,
}: {
  item: RestaurantMenuItem
  section: RestaurantMenuSection
  lang: LangCode
}) {
  const [open, setOpen] = useState(false)
  const itemDescription = getTranslatedMenuItemDescription(item, section, lang)
  const allergens = item.allergenRefs
    .map((ref) => allergenById.get(ref))
    .filter((allergen): allergen is RestaurantAllergen => Boolean(allergen))
  const hasDetails = Boolean(itemDescription || allergens.length)
  const itemIcon = getMenuItemIcon(item, section.title)

  return (
    <div
      onClick={() => hasDetails && setOpen((o) => !o)}
      style={{
        backgroundColor: "#fdf5dd",
        border: "2px solid #c8900a",
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 8,
        cursor: hasDetails ? "pointer" : "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: open ? 6 : 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            flex: "0 0 auto",
            width: 30,
            height: 30,
            borderRadius: 8,
            backgroundColor: "#fff8e7",
            border: "1px solid #e8d49a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          {itemIcon}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: 13,
              color: "#4a2a0a",
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#7a1818",
            borderRadius: 8,
            padding: "4px 8px",
            color: "#ffd700",
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          {formatPrice(item.price)}€
        </div>
        {hasDetails && (
          <span style={{ color: "#8b6030", fontSize: 12 }}>
            {open ? "▲" : "▼"}
          </span>
        )}
      </div>
      {open && hasDetails && (
        <div
          style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: 14,
            color: "#5c3d1a",
            lineHeight: 1.5,
            paddingTop: 6,
            borderTop: "1px solid #e8d49a",
          }}
        >
          {itemDescription && (
            <div
              style={{
                fontStyle: "italic",
                marginBottom: allergens.length ? 8 : 0,
              }}
            >
              {itemDescription}
            </div>
          )}
          {allergens.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                backgroundColor: "#fff8e7",
                border: "1px solid #e8d49a",
                borderRadius: 8,
                padding: "6px 8px",
              }}
            >
              {allergens.map((allergen) => (
                <span
                  key={allergen.id}
                  title={allergen.description}
                  aria-label={allergen.description}
                  style={{
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                >
                  {allergen.emoji}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AllergensTab({
  selectedAllergenIds,
  onToggleAllergen,
  onClearSelection,
}: {
  selectedAllergenIds: Set<number>
  onToggleAllergen: (id: number) => void
  onClearSelection: () => void
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            flex: 1,
            fontFamily: "'Crimson Text', serif",
            fontSize: 14,
            color: "#5c3d1a",
            marginBottom: 10,
            lineHeight: 1.45,
          }}
        >
          Liste des allergènes présents dans la carte.
        </div>
        {selectedAllergenIds.size > 0 && (
          <button
            type="button"
            onClick={onClearSelection}
            style={{
              border: "2px solid #c8900a",
              borderRadius: 8,
              backgroundColor: "#fff8e7",
              color: "#7a1818",
              cursor: "pointer",
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: 10,
              padding: "6px 8px",
              marginBottom: 10,
            }}
          >
            Réinitialiser
          </button>
        )}
      </div>
      {restaurantAllergens.map((allergen) => {
        const selected = selectedAllergenIds.has(allergen.id)

        return (
          <button
            key={allergen.id}
            type="button"
            onClick={() => onToggleAllergen(allergen.id)}
            aria-pressed={selected}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              backgroundColor: selected ? "#7a1818" : "#fdf5dd",
              border: `2px solid ${selected ? "#ffd700" : "#c8900a"}`,
              borderRadius: 12,
              padding: "10px 12px",
              marginBottom: 8,
              cursor: "pointer",
              boxShadow: selected ? "0 0 0 3px rgba(255, 215, 0, 0.28)" : "none",
              transform: selected ? "scale(1.01)" : "scale(1)",
              transition: "background-color 0.15s, border-color 0.15s, transform 0.15s, box-shadow 0.15s",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1 }}>{allergen.emoji}</span>
            <span
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 14,
                color: selected ? "#fff8e7" : "#4a2a0a",
                lineHeight: 1.35,
              }}
            >
              {allergen.description}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function MenuSectionDropdown({
  section,
  lang,
}: {
  section: RestaurantMenuSection
  lang: LangCode
}) {
  const [open, setOpen] = useState(false)
  const sectionTitle = getTranslatedMenuSectionTitle(section, lang)

  return (
    <div
      style={{
        marginBottom: 10,
        backgroundColor: "#fdf5dd",
        border: "2px solid #c8900a",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: open ? "#7a1818" : "#fdf5dd",
          border: "none",
          cursor: "pointer",
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          color: open ? "#ffd700" : "#7a1818",
          fontFamily: "'Ranchers', cursive",
          fontSize: 19,
          lineHeight: 1.15,
          textAlign: "left",
          textShadow: open ? "1px 1px 0 #4a1010" : "1px 1px 0 #f5d483",
        }}
      >
        <span>{sectionTitle}</span>
        <span
          aria-hidden="true"
          style={{
            flex: "0 0 auto",
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: 14,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s ease",
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div style={{ padding: "10px 10px 2px" }}>
          {section.items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              section={section}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MenuSectionOpen({
  section,
  lang,
}: {
  section: RestaurantMenuSection
  lang: LangCode
}) {
  const sectionTitle = getTranslatedMenuSectionTitle(section, lang)

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          fontFamily: "'Ranchers', cursive",
          fontSize: 20,
          color: "#7a1818",
          borderBottom: "2px solid #c8900a",
          paddingBottom: 4,
          marginBottom: 8,
          textShadow: "1px 1px 0 #f5d483",
        }}
      >
        {sectionTitle}
      </div>
      {section.items.map((item) => (
        <MenuItemCard key={item.id} item={item} section={section} lang={lang} />
      ))}
    </div>
  )
}

function MenuGroupDropdown({
  id,
  title,
  sections,
  lang,
}: {
  id: keyof typeof restaurantMenuGroupTranslations
  title: string
  sections: RestaurantMenuSection[]
  lang: LangCode
}) {
  const [open, setOpen] = useState(false)
  const groupTitle = getTranslatedMenuGroupTitle(id, title, lang)

  return (
    <div
      style={{
        marginBottom: 12,
        backgroundColor: "#fff8e7",
        border: "3px solid #7a1818",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        style={{
          width: "100%",
          backgroundColor: open ? "#7a1818" : "#fff8e7",
          border: "none",
          cursor: "pointer",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          color: open ? "#ffd700" : "#7a1818",
          fontFamily: "'Ranchers', cursive",
          fontSize: 22,
          lineHeight: 1.1,
          textAlign: "left",
          textShadow: open ? "1px 1px 0 #4a1010" : "1px 1px 0 #f5d483",
        }}
      >
        <span>{groupTitle}</span>
        <span
          aria-hidden="true"
          style={{
            flex: "0 0 auto",
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: 15,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s ease",
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div style={{ padding: "10px 10px 0" }}>
          {sections.map((section) => (
            <MenuSectionDropdown key={section.id} section={section} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}

function MenuPage({ lang, onBack }: { lang: LangCode; onBack: () => void }) {
  const { t } = useTranslation("restaurant")
  const [tab, setTab] = useState<MenuTab>("carte")
  const [selectedAllergenIds, setSelectedAllergenIds] = useState<Set<number>>(
    () => new Set(),
  )
  const isDuck = lang === "duck"

  const languages = t("languages", { returnObjects: true }) as {
    code: LangCode
    flag: string
    name: string
  }[]
  const langInfo = languages.find((l) => l.code === lang)!

  const tabs: { id: MenuTab; label: string }[] = [
    { id: "suggestions", label: t(`tabs.suggestions.${lang}`) },
    { id: "carte", label: t(`tabs.fullMenu.${lang}`) },
    { id: "allergenes", label: "Allergènes" },
  ]
  const suggestionsSection = restaurantMenuSections.find(
    (section) => section.id === "moules-en-saison",
  )
  const filteredMenuSections = restaurantMenuSections
    .map((section) => ({
      ...section,
      items:
        selectedAllergenIds.size === 0
          ? section.items
          : section.items.filter(
              (item) =>
                !item.allergenRefs.some((ref) => selectedAllergenIds.has(ref)),
            ),
    }))
    .filter((section) => section.items.length > 0)
  const filteredMenuSectionById = new Map(
    filteredMenuSections.map((section) => [section.id, section]),
  )
  const filteredMenuGroups = menuSectionGroups
    .map((group) => ({
      ...group,
      sections: group.sectionIds
        .map((sectionId) => filteredMenuSectionById.get(sectionId))
        .filter(
          (section): section is RestaurantMenuSection => section !== undefined,
        ),
    }))
    .filter((group) => group.sections.length > 0)

  function toggleAllergen(id: number) {
    setSelectedAllergenIds((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div
          style={{
            fontFamily: "'Ranchers', cursive",
            fontSize: 26,
            color: "#7a1818",
            textShadow: "1px 1px 0 #c8900a",
          }}
        >
          {isDuck ? "🦆 COIN COIN 🦆" : t("title")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <LanguageFlag
            lang={langInfo.code}
            flag={langInfo.flag}
            label={langInfo.name}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {tabs.map((tabInfo) => (
          <button
            key={tabInfo.id}
            onClick={() => setTab(tabInfo.id)}
            style={{
              flex: 1,
              padding: "8px 4px",
              border: `2px solid ${tab === tabInfo.id ? "#7a1818" : "#c8900a"}`,
              borderRadius: 10,
              backgroundColor: tab === tabInfo.id ? "#7a1818" : "transparent",
              color: tab === tabInfo.id ? "#ffd700" : "#7a1818",
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: 12,
              cursor: "pointer",
              lineHeight: 1.2,
            }}
          >
            {tabInfo.label}
          </button>
        ))}
      </div>
      {tab === "suggestions" && suggestionsSection && (
        <MenuSectionOpen section={suggestionsSection} lang={lang} />
      )}
      {tab === "carte" &&
        filteredMenuGroups.map((group) => (
          <MenuGroupDropdown
            key={group.id}
            id={group.id}
            title={group.title}
            sections={group.sections}
            lang={lang}
          />
        ))}
      {tab === "carte" && filteredMenuGroups.length === 0 && (
        <div
          style={{
            backgroundColor: "#fdf5dd",
            border: "2px solid #c8900a",
            borderRadius: 12,
            color: "#5c3d1a",
            fontFamily: "'Crimson Text', serif",
            fontSize: 15,
            lineHeight: 1.45,
            padding: "14px 16px",
            textAlign: "center",
          }}
        >
          Aucun plat ne correspond à cette sélection d'allergènes.
        </div>
      )}
      {tab === "allergenes" && (
        <AllergensTab
          selectedAllergenIds={selectedAllergenIds}
          onToggleAllergen={toggleAllergen}
          onClearSelection={() => setSelectedAllergenIds(new Set())}
        />
      )}
    </div>
  )
}

function LanguageSelector({
  onSelect,
}: {
  onSelect: (lang: LangCode) => void
}) {
  const { t } = useTranslation("restaurant")
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>
      {/* PixiJS animated wolf + speech bubble */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 0,
          marginBottom: 16,
        }}
      >
        <WolfGroomCanvas
          width={100}
          height={162}
          animation="iso_run_right"
        />
        <div
          style={{
            flex: 1,
            backgroundColor: "#fdf5dd",
            border: "2px solid #c8900a",
            borderRadius: 16,
            padding: "10px 14px",
            marginBottom: 14,
            marginLeft: 8,
            fontFamily: "'Crimson Text', serif",
            fontSize: 14,
            color: "#4a2a0a",
            fontStyle: "italic",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -10,
              bottom: 18,
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "10px solid #c8900a",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -7,
              bottom: 19.5,
              width: 0,
              height: 0,
              borderTop: "6.5px solid transparent",
              borderBottom: "6.5px solid transparent",
              borderRight: "8px solid #fdf5dd",
            }}
          />
          <span dangerouslySetInnerHTML={{ __html: t("welcome") }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {(t("languages", { returnObjects: true }) as {
          code: LangCode
          flag: string
          name: string
        }[]).map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            onMouseEnter={() => setHovered(lang.code)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "12px 8px",
              backgroundColor: hovered === lang.code ? "#7a1818" : "#fdf5dd",
              border: `2px solid ${
                lang.code === "duck" ? "#f0a000" : "#c8900a"
              }`,
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              transition: "all 0.15s",
              transform: hovered === lang.code ? "scale(1.04)" : "scale(1)",
              boxShadow: lang.code === "duck" ? "0 0 10px #ffd70055" : "none",
            }}
          >
            <LanguageFlag lang={lang.code} flag={lang.flag} label={lang.name} />
            <span
              style={{
                fontFamily: "'Luckiest Guy', cursive",
                fontSize: 12,
                color: hovered === lang.code ? "#ffd700" : "#7a1818",
              }}
            >
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function RestaurantSection({ onBack, onArcade }: Props) {
  const { t } = useTranslation("restaurant")
  const [lang, setLang] = useState<LangCode | null>(null)

  function handleLangSelect(code: LangCode) {
    if (code === "duck") {
      onArcade()
      return
    }
    setLang(code)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5e4b4",
      }}
    >
      <CartoonFrame
        innerPadding={16}
        style={{ flex: 1, margin: 0, borderRadius: 0, overflowY: "auto" }}
      >
        {!lang ? (
          <div>
            <BackButton onClick={onBack} />
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div
                style={{
                  fontFamily: "'Ranchers', cursive",
                  fontSize: 28,
                  color: "#7a1818",
                  textShadow: "1px 1px 0 #c8900a",
                }}
              >
                {t("title")}
              </div>
            </div>
            <LanguageSelector onSelect={handleLangSelect} />
          </div>
        ) : (
          <MenuPage lang={lang} onBack={() => setLang(null)} />
        )}
      </CartoonFrame>
    </div>
  )
}
