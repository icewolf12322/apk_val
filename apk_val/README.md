# Val de la Cascade - Structure par domaines

Le dépôt est désormais séparé en 4 zones pour isoler clairement les responsabilités tout en conservant les liens fonctionnels entre composants.

## Separation cible

```text
.
├── apk/                          # Application client React/Vite + Capacitor Android
├── exe/                          # Application desktop WPF (.NET)
│   └── GestionReservations/
├── serveur/                      # Documentation et conventions des flux serveur
├── compileurs/                   # Scripts transverses de build et cartographie
├── exports/                      # Données/export externes
├── AGENTS.md
└── CLAUDE.md
```

## Mapping dynamique de l'infrastructure

Le mapping dynamique est généré via :

```powershell
powershell -ExecutionPolicy Bypass -File .\compileurs\Generate-InfrastructureMap.ps1
```

Fichier produit :

- compileurs/infrastructure-map.json

## Liens techniques conserves

1. La partie EXE continue d'accéder aux traductions APK :
Le chemin de common.json est calculé dynamiquement depuis l'exécutable WPF vers apk/src/locales/fr/common.json.

2. Les builds restent indépendants :
- APK: depuis apk
- EXE: depuis exe/GestionReservations

3. Le serveur embarqué (webhook local) reste dans l'EXE :
ReservationListenerService continue d'écouter sur localhost:5001.

## Commandes utiles

### APK

```powershell
Set-Location .\apk
pnpm install
pnpm dev
```

### EXE

```powershell
dotnet build .\exe\GestionReservations\GestionReservations.csproj
dotnet run --project .\exe\GestionReservations\GestionReservations.csproj
```

### Android (depuis apk)

```powershell
Set-Location .\apk
pnpm build
npx cap sync android
npx cap open android
```

### Build global et mapping

```powershell
powershell -ExecutionPolicy Bypass -File .\compileurs\Build-All.ps1
powershell -ExecutionPolicy Bypass -File .\compileurs\Generate-InfrastructureMap.ps1
```

## Notes

- Le dossier serveur est volontairement séparé pour préparer une extraction future des services web.
- Le cœur serveur actuel est encore hébergé dans l'application EXE (mode embedded host).
