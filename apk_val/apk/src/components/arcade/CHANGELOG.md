# Journal des Modifications

Toutes les modifications notables apportées à ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à la [Gestion Sémantique de Version](https://semver.org/lang/fr/).

## [Non publié]

### Ajouté
- **Internationalisation (i18n)** : Intégration de la bibliothèque `i18next` pour permettre la traduction de l'application.
- **Fichiers de traduction centralisés** : Création de fichiers JSON (`common.json`, `resto_common.json`) pour gérer tous les textes visibles par l'utilisateur.
- **Séparation des contextes (Namespaces)** : Mise en place d'un "namespace" `restaurant` pour isoler les traductions spécifiques à cette section et mieux organiser le code.

### Modifié
- **Refactorisation des composants** : Mise à jour des composants `MainMenu`, `BottomNav`, `HistoireSection`, `InfosSection` et `RestaurantSection` pour utiliser le hook `useTranslation` et charger les textes dynamiquement.
- **Suppression de code en dur** : Remplacement de tous les textes statiques dans les composants par des clés de traduction.
- **Nettoyage du code** : Suppression du fichier de données obsolète `menuData.ts`.

### Corrigé
- **Configuration TypeScript** : Ajustement de `tsconfig.json` (`"resolveJsonModule": true`) pour permettre l'importation directe des fichiers `.json`.
- **Erreurs de type** : Correction de diverses erreurs TypeScript apparues durant la refactorisation.
- **Duplication de code** : Suppression du code dupliqué dans le fichier principal `main.tsx`.