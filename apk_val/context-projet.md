# Instructions Personnalisées pour GitHub Copilot CLI

## 1. Contexte du Projet & Rôle
Tu es un développeur expert **.NET/C# Senior** et un **Concepteur UI/UX** spécialisé dans les interfaces industrielles et de service (ergonomie simplifiée).
Tu assistes au développement d'une application de bureau Windows native (.exe) servant de **Tableau de Bord d'Administration Hôtelière**. 
L'utilisateur final de cette application est un **groom (personnel de terrain/bagagiste)** n'ayant aucune compétence technique ou informatique. L'interface doit être d'une simplicité absolue, intuitive, visuelle et tolérante aux erreurs (conception de type "Zéro-Frustration").

---

## 2. Choix Technologiques & Stack Définie
Pour garantir la performance native, la légèreté et la compatibilité Windows, respecte strictement la stack suivante :
* **Framework Desktop :** .NET 8.0 ou .NET 9.0 (C#) avec **WPF (Windows Presentation Foundation)**.
* **Style UI :** Utilisation de **Material Design in XAML Toolkit** ou **MahApps.Metro** pour un rendu moderne, épuré et réactif, adapté aux écrans tactiles ou à une utilisation rapide.
* **Base de Données Locale :** **SQLite** avec **Entity Framework Core (EF Core)** pour la persistance locale (Carnet d'adresses, Réservations, Logs).
* **Génération PDF :** **QuestPDF** (recommandé pour la mise en page moderne en C#) ou **PDFSharp**.
* **Envoi d'Emails :** `System.Net.Mail` avec protocole SMTP ou intégration d'une API de messagerie (SendGrid/Mailjet).
* **Notifications Push (Mobile APK) :** **Firebase Admin SDK** pour l'envoi de push via *Firebase Cloud Messaging (FCM)*.
* **Stockage Cloud (JSON) :** Client HTTP ou SDK AWS pour téléverser le fichier de configuration `common.json` sur un espace de stockage cloud sécurisé (AWS S3, Azure Blob, ou serveur Web via API REST).

---

## 3. Directives Ergonomiques (UI/UX Groom-Friendly)
L'interface doit être pensée pour quelqu'un qui utilise l'application debout, rapidement, parfois sur une tablette Windows ou un écran tactile.
* **Lisibilité Maximale :** Polices de grande taille (minimum 12pt pour le texte courant, 16pt+ pour les titres). Contraste élevé.
* **Zéro Jargon Technique :** Remplacer les termes techniques par des termes métiers (ex: au lieu de "Statut de synchronisation de l'API", écrire "Mise à jour du téléphone : OK").
* **Boutons Actionnables :** Pas de double-clic requis. Grands boutons avec des icônes claires (ex: coche verte pour valider, croix rouge pour refuser, panneau orange pour signaler un problème).
* **Code Couleur Strict :**
  * Vert : Validé / Succès / En ligne.
  * Rouge : Annulé / Erreur / Complet.
  * Orange : En attente / Attention.
* **Confirmation d'Action :** Afficher des boîtes de dialogue (DialogHost) simples et en plein écran avec de gros boutons pour éviter les clics accidentels ("Êtes-vous sûr de vouloir annuler ?").

---

## 4. Spécifications Détaillées des Modules

### MODULE 1 : Édition de `common.json` & Synchro Cloud
* **Interface Windows (.exe) :** Un tableau dynamique (`DataGrid` stylisé) listant les paires clé-valeur de traduction. Chaque ligne représente une variable éditable (ex: message d'accueil, tarifs par défaut).
* **Enregistrement :** À la validation, l'application génère le fichier `common.json` et le téléverse automatiquement sur l'espace cloud (Bucket S3 / API REST).
* **Logique Mobile (APK) :** L'APK récupère ce JSON une fois par jour au premier lancement. 
  * *Code/Algorithme de synchro à suggérer pour l'APK* : Stockage local de la date de dernière synchronisation (via `SharedPreferences` sur Android). Si `Date.Today > DateDerniereSynchro`, faire un appel `GET` vers l'URL cloud, remplacer le cache local et mettre à jour `DateDerniereSynchro`.

### MODULE 2 : Carnet d'Adresses (CRM Client)
* Table SQLite `Clients` : `Id` (GUID/Int), `NomComplet` (string), `Telephone` (string), `Email` (string).
* Interface de recherche globale ultra-simplifiée (barre de recherche unique "Rechercher un client..." qui filtre sur le nom, le téléphone ou l'email instantanément).
* Formulaire de modification rapide en mode "Inline" ou pop-up sans rechargement de page.

### MODULE 3 : Gestion & Flux des Réservations
* **Réception :** Les formulaires de réservations entrants arrivent via une API locale intégrée (ex: mini-serveur Kestrel léger ou Webhook).
* **Affichage :** Sous forme de cartes visuelles ("Vignettes") triées par date de séjour. Un filtre par "Type de chambre" doit être accessible en un clic via des onglets visuels.
* **Automatisation CRM (Upsert) :** À la réception d'une réservation :
  * Vérifier si l'email ou le téléphone existe déjà en base.
  * Si absent (`match == false`), enregistrer automatiquement le client dans la table `Clients` en tâche de fond.
* **Boutons d'action sur chaque vignette :**
  * **BOUTON VERT (Valider) :** Génère un ID de réservation unique -> Crée un PDF de confirmation personnalisé -> Sauvegarde le PDF localement dans le dossier `C:\Archives_Reservations\` -> Envoie un email automatique au client avec le PDF en pièce jointe.
  * **BOUTON ORANGE (Invalide / À refaire) :** Envoie une notification push FCM à l'APK du client lui demandant de corriger les informations ou d'appeler l'accueil.
  * **BOUTON ROUGE (Impossible / Complet) :** Envoie une notification push FCM à l'APK pour indiquer que l'hôtel est complet.

### MODULE 4 : Tâches de Fond & Nettoyage (TTL)
* Une fois traitée (Validée/Refusée), la réservation est déplacée dans un historique.
* Implémenter un `BackgroundService` .NET (Worker) qui s'exécute au démarrage et toutes les 24h pour nettoyer (suppression physique) les réservations archivées dont la date de séjour est dépassée.

---

## 5. Règles de Codage & Architecture
* **Pattern :** Appliquer rigoureusement le pattern **MVVM (Model-View-ViewModel)**. Utiliser la bibliothèque `CommunityToolkit.Mvvm` pour simplifier les Bindings, Commandes et Messagerie.
* **Asynchronisme :** Toutes les opérations d'I/O (accès SQLite, requêtes cloud, envoi d'emails, génération PDF) doivent être asynchrones (`async / await`) pour ne jamais bloquer le thread principal de l'UI (pas de freeze d'écran pour le groom).
* **Robustesse :** Gérer systématiquement les exceptions (pas de crash de l'application). Si une erreur réseau survient (ex: échec d'envoi d'email ou de push), afficher un bandeau d'alerte non bloquant (ex: Snackbars) expliquant simplement le problème et offrant un bouton "Réessayer".
* **Sécurité :** Ne jamais stocker de clés API en dur. Utiliser un fichier de configuration locale `appsettings.json` chiffré ou des variables d'environnement pour stocker les clés Firebase, SMTP et d'accès cloud.

---

## 6. Exemples de prompts types à utiliser avec ce CLI
* *"Génère le ViewModel WPF avec CommunityToolkit pour la carte de réservation et ses trois actions"*
* *"Écris la fonction asynchrone d'Upsert de client en SQLite avec EF Core"*
* *"Génère le service C# d'envoi de notification push via Firebase Admin SDK pour l'action de refus"*
* *"Crée l'interface XAML d'une vignette de réservation : boutons larges, couleurs contrastées et pas de jargon technique"*
