# Val de la Cascade — Application Mobile

Application mobile pour l'hôtel-restaurant **Val de la Cascade**, situé au cœur des Ardennes belges (Petit Coo 1, 4970 Stavelot). L'app présente les hébergements, le menu du restaurant, l'histoire de l'établissement et un mini-jeu arcade — le tout dans une interface cartoon chaleureuse.

---

## Table des matières

1. [Présentation](#présentation)
2. [Stack technique](#stack-technique)
3. [Architecture du projet](#architecture-du-projet)
4. [Fonctionnalités](#fonctionnalités)
5. [Internationalisation](#internationalisation)
6. [Démarrage rapide](#démarrage-rapide)
7. [Build Android (Capacitor)](#build-android-capacitor)
8. [Conventions de style](#conventions-de-style)

---

## Présentation

Val de la Cascade est une application React/Vite empaquetée en APK Android via **Capacitor**. Elle sert de vitrine numérique interactive pour l'établissement : menu consultable en 6 langues, système de réservation, livre d'or, activités régionales et un jeu arcade caché.

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| React | 19 | Bibliothèque UI |
| Vite | 8 | Bundler & serveur de dev |
| TypeScript | 5.7 | Typage statique |
| Tailwind CSS | 4 | Styles utilitaires (plugin Vite) |
| PixiJS | 8 | Rendu WebGL (jeu + animations) |
| Capacitor | 8.4 | Pont natif Android |
| i18next | 26 | Internationalisation |
| react-i18next | 17 | Bindings React pour i18next |

---

## Architecture du projet

```
src/
├── App.tsx                  # Routeur principal (état : main | hotel | restaurant | histoire | infos | arcade)
├── main.tsx                 # Point d'entrée React
├── i18n.ts                  # Configuration i18next (namespaces : translation, restaurant)
├── index.css                # Import Tailwind
├── resto_common.json        # Traductions menu restaurant
├── locales/
│   └── fr/common.json       # Traductions globales (~900 clés)
└── components/
    ├── MainMenu.tsx         # Écran d'accueil (loup animé PixiJS)
    ├── BottomNav.tsx        # Barre de navigation basse
    ├── ArcadeGame.tsx       # Composant racine du jeu
    ├── HistoireSection.tsx  # Timeline & équipe
    ├── InfosSection.tsx     # Horaires, activités, FAQ, livre d'or
    ├── arcade/              # Moteur de jeu PixiJS (modulaire)
    ├── hotel/               # Hébergements & formulaire de réservation
    ├── pixi/                # Scènes PixiJS réutilisables
    └── restaurant/          # Menu multilingue & filtres allergènes
```

### Navigation

La navigation est gérée par un simple `useState` dans `App.tsx` — pas de routeur externe. Le composant `BottomNav` permet de revenir à n'importe quel écran principal.

---

## Fonctionnalités

### 🍽️ Restaurant (`src/components/restaurant/`)

- **6 langues** : 🇫🇷 Français, 🇬🇧 English, 🇩🇪 Deutsch, 🇳🇱 Nederlands, 🇪🇸 Español, 🇮🇹 Italiano
- **Easter egg** : sélectionner "🦆 Canard" fait tout passer en *"Coin coin…"* et débloque l'arcade
- **3 groupes de menu** :
  - *Petite faim* — entrées & snacks
  - *Faim de loup* — plats (poisson, gibier, viande, salades)
  - *Coin des gourmands* — desserts & glaces
- **Filtre allergènes** : 18 marqueurs emoji, activables individuellement
- **Suggestions** : onglet dédié aux spécialités du moment

### 🏨 Hôtel (`src/components/hotel/HotelSection.tsx`)

- **L'Auberge** : 2 chambres, €105–110/nuit
- **L'Hôtel** : 18 chambres (standard, twin, bain à remous), €110–150/nuit
- **Les Gîtes** : 4 locations (2–9 personnes), €155–490/nuit — accepte les animaux
- **Le Chalet** : salle de 80 personnes (son, lumières, projection, terrasse)
- **Formulaire de réservation** : nom, e-mail, dates, nombre de personnes, type d'hébergement

### 📖 Infos (`src/components/InfosSection.tsx`)

- **Horaires** : brasserie & restaurant (ven–mar), hôtel (check-in 14 h, check-out 11 h)
- **Activités** : 8 activités régionales (Cascade de Coo, VTT, kayak, abbayes…)
- **FAQ** : 8 questions/réponses courantes
- **Livre d'or** : commentaires persistants dans `localStorage` (`valcascade-comments`), validation manuelle avant affichage

### 🕹️ Jeu Arcade (`src/components/arcade/`)

Moteur PixiJS écrit from scratch, organisé en modules :

| Fichier | Responsabilité |
|---|---|
| `arcadeEngine.ts` | Boucle de jeu principale |
| `arcadePhysics.ts` | Simulation physique |
| `arcadeRender.ts` | Rendu graphique PixiJS |
| `arcadeState.ts` | État global du jeu |
| `arcadeInput.ts` | Clavier & pointeur |
| `arcadeStorage.ts` | Persistance des scores (localStorage) |

Fonctionnalités : vies, niveaux, tableau des scores, HUD (score / niveau / vies), canvas 480×840 px responsive.

### 🌟 Accueil (`src/components/MainMenu.tsx`)

Composition en couches (z-index) : fond, loup animé PixiJS, bureau de réception en avant-plan. Citation : *"Au cœur des Ardennes, là où la cascade chante"*.

---

## Internationalisation

Deux namespaces i18next :

- **`translation`** → `src/locales/fr/common.json` (UI globale)
- **`restaurant`** → `src/resto_common.json` (menu)

Utilisation dans les composants :

```tsx
// UI globale
const { t } = useTranslation()

// Menu restaurant (namespace dédié)
const { t } = useTranslation('restaurant')
```

Pour ajouter une langue : créer `src/locales/<code>/common.json` et l'importer dans `src/i18n.ts`.

---

## Démarrage rapide

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement (port 8443 par défaut)
pnpm dev
```

Le serveur Vite tourne en continu dans l'environnement Figma Make — inutile de le relancer.

---

## Build Android (Capacitor)

```bash
# 1. Compiler le projet web
pnpm build

# 2. Synchroniser avec Capacitor
npx cap sync android

# 3. Ouvrir dans Android Studio
npx cap open android
```

La configuration Capacitor se trouve dans `capacitor.config.json`. Le dossier `android/` contient le projet Gradle complet.

---

## Conventions de style

- **Palette principale** : brun foncé `#7a1818`, or `#ffd700`, crème `#fdf5dd`, caramel `#c8900a`
- **Tailwind CSS v4** : classes utilitaires directement dans le JSX, aucune config PostCSS requise
- **Police** : serif italique pour les citations, sans-serif pour l'UI
- **Layout** : mobile-first, largeur max 480 px, hauteur 100 vh, centré sur fond `#3d2008`
