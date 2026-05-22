# TaskFlow — Application de Gestion de Tâches (CRUD)

Mini-Projet 1 · React.js · MSID 2025-2026

## Stack technique

- **Front-end** : React 18 + Vite, React Router v6, Axios, CSS Modules
- **Back-end** : json-server (API RESTful locale)
- **Base de données** : `db.json`

## Installation

```bash
npm install
```

## Lancer le projet

Ouvrez **deux terminaux** :

**Terminal 1 — json-server (API) :**
```bash
npm run server
```
L'API tourne sur `http://localhost:3001`

**Terminal 2 — Application React :**
```bash
npm run dev
```
L'application tourne sur `http://localhost:5173`

## Structure du projet

```
task-app/
├── db.json                    # Base de données json-server
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx               # Point d'entrée React
    ├── App.jsx                # Routeur principal
    ├── index.css              # Variables CSS & styles globaux
    ├── api.js                 # Fonctions axios (getTasks, createTask, updateTask, deleteTask)
    ├── components/
    │   ├── Navbar.jsx         # Barre de navigation
    │   ├── Navbar.module.css
    │   ├── TaskCard.jsx       # Carte d'une tâche (modifier / supprimer)
    │   ├── TaskCard.module.css
    │   ├── TaskForm.jsx       # Formulaire partagé (création & modification)
    │   └── TaskForm.module.css
    └── pages/
        ├── Home.jsx           # / — Liste des tâches avec filtres
        ├── Home.module.css
        ├── AjouterTache.jsx   # /ajouter — Formulaire de création
        ├── ModifierTache.jsx  # /modifier/:id — Formulaire de modification
        └── FormPage.module.css
```

## Endpoints API

| Méthode | Endpoint       | Description              |
|---------|---------------|--------------------------|
| GET     | /tasks        | Récupère toutes les tâches |
| POST    | /tasks        | Crée une nouvelle tâche  |
| PUT     | /tasks/:id    | Met à jour une tâche     |
| DELETE  | /tasks/:id    | Supprime une tâche       |

## Fonctionnalités

- ✅ Lister toutes les tâches
- ✅ Filtrer par statut (À faire / En cours / Terminé)
- ✅ Créer une tâche (titre obligatoire, description optionnelle, statut)
- ✅ Modifier une tâche (formulaire pré-rempli)
- ✅ Supprimer une tâche (avec confirmation)
- ✅ Validation du formulaire
