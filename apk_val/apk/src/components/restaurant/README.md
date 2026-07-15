#  "Le Val de la Cascade"

![Aperçu de l'application](https://i.imgur.com/your-image-url.png) 
<!-- Note: Remplacez l'URL par une capture d'écran de votre application hébergée quelque part -->

Bienvenue dans le dépôt de l'application web pour l'établissement "Le Val de la Cascade". Cette application a été conçue pour présenter les services de l'hôtel et du restaurant, raconter son histoire et fournir des informations utiles aux visiteurs, le tout dans une interface thématique et engageante.

## ✨ Fonctionnalités

*   **Navigation Intuitive** : Une interface simple et thématique pour explorer les différentes sections de l'établissement.
*   **Sections Complètes** :
    *   **Hôtel** : Présentation détaillée des chambres, de l'auberge, des gîtes et du chalet événementiel avec leurs tarifs.
    *   **Restaurant** : Menu multilingue complet avec un système de filtrage par allergènes.
    *   **Notre Histoire** : Une chronologie interactive qui retrace l'histoire de l'établissement depuis 1959.
    *   **Infos Utiles** : Horaires d'ouverture, activités locales, FAQ et un livre d'or interactif avec persistance locale.
*   **Internationalisation (i18n)** : Le menu du restaurant est disponible en 7 langues, géré via `i18next` et des fichiers de traduction JSON dédiés.
*   **Composants Interactifs** : Utilisation de `PixiJS` pour des animations de personnages (loup, singe) qui guident et amusent l'utilisateur.
*   **Mini-jeu d'Arcade** : Un jeu d'arcade caché, accessible via une option secrète dans le menu du restaurant, avec son propre système de score.

## 🛠️ Stack Technique

*   **Framework** : React
*   **Build Tool** : Vite
*   **Langage** : TypeScript
*   **Internationalisation** : i18next & react-i18next
*   **Graphismes 2D & Animations** : PixiJS
*   **Styling** : Inline CSS et polices de caractères personnalisées pour un design unique.

## 📂 Structure du Projet

Le code source est principalement situé dans le dossier `src/`.

```
src/
├── components/       # Composants React réutilisables
│   ├── arcade/       # Logique et composants du mini-jeu
│   ├── hotel/        # Section Hôtel
│   ├── restaurant/   # Section Restaurant
│   ├── ...
│   └── pixi/         # Composants Canvas avec PixiJS
├── locales/          # Fichiers de traduction (i18n) pour le français
│   └── fr/
│       ├── common.json
│       └── resto_common.json
├── imports/          # Ressources statiques (images, etc.)
├── App.tsx           # Composant racine de l'application
├── main.tsx          # Point d'entrée de l'application
└── i18n.ts           # Configuration de i18next
```

## 🚀 Démarrage Rapide

Pour lancer le projet en local, suivez ces étapes :

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```
    L'application sera accessible à l'adresse `http://localhost:8443`.

## 📜 Scripts Disponibles

*   `npm run dev`: Lance le serveur de développement avec Hot-Reload.
*   `npm run build`: Compile et optimise l'application pour la production dans le dossier `dist/`.
*   `npm run preview`: Lance un serveur local pour prévisualiser la version de production.

---

Ce projet est suivi via un `CHANGELOG.md` pour documenter les modifications notables.