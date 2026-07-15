# Serveur

Ce dossier reserve la separation logique des composants serveur.

Etat actuel:
- Le listener HTTP local (webhook reservations) est encore heberge dans l'application EXE WPF.
- Endpoint actuel: http://localhost:5001/webhook/reservation

Objectif:
- Extraire a terme les services serveur vers un projet dedie (API/worker) sans coupler l'UI desktop.
