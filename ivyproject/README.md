# IvyProject

Le workspace privé des artistes. Squelette de départ basé sur Next.js (App Router) + Supabase.

## 1. Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com), crée un nouveau projet.
2. Dans **SQL Editor**, colle le contenu de `supabase/schema.sql` et exécute-le.
   Ça crée les tables, les index et les policies RLS.
3. Dans **Storage**, crée 4 buckets : `covers` (public), `audio` (privé),
   `video` (privé), `avatars` (public).
4. Dans **Project Settings > API**, récupère l'URL du projet, la clé `anon`
   et la clé `service_role`.

## 2. Configurer le projet local

```bash
cp .env.local.example .env.local
```

Remplis `.env.local` avec les valeurs récupérées à l'étape précédente.

## 3. Installer et lancer

```bash
npm install
npm run dev
```

L'app tourne sur http://localhost:3000.

## Ce qui est déjà posé

- **Auth** : pages `/login` et `/signup` branchées sur Supabase Auth
  (email/password). Le middleware protège toutes les routes sauf
  `/login`, `/signup`, `/share/*` et `/session/*`.
- **Bibliothèque** (`/`) : grille des projets de l'utilisateur, en
  Server Component, requête RLS-safe.
- **Page projet** (`/projects/[id]`) : liste plate des morceaux avec
  filtre par dossiers (chips), lecture au clic.
- **Lecteur double niveau** : `PlayerProvider` (`lib/player-context.tsx`)
  partage l'état entre `MiniPlayer` (persistant en bas) et `FullPlayer`
  (plein écran). Le vrai élément `<audio>` et la récupération de l'URL
  signée restent à brancher (voir TODO dans `player-context.tsx`).
- **Schéma Supabase** (`supabase/schema.sql`) : tables du MVP (profils,
  projets, dossiers, morceaux, partages, commentaires, historique
  d'écoute) avec RLS activé partout.

## Ce qu'il reste à faire (dans l'ordre suggéré)

1. **Upload de morceau** : formulaire + upload direct vers le bucket
   `audio` de Supabase Storage, puis Server Action `createTrack()`.
2. **Lecture réelle** : Server Action `getSignedAudioUrl(trackId)` +
   branchement d'un `<audio>` dans `FullPlayer`/`MiniPlayer`.
3. **Création de projet** : modale + Server Action `createProject()`.
4. **Partage** : Route Handler `/share/[token]` + Server Action
   `createShare()` (voir la spec technique, section 8.3).
5. **Sessions d'écoute** : tables déjà prévues dans la spec technique
   complète (non incluses dans ce schéma MVP) — à ajouter avant la V3.

## Stack

Next.js 14 (App Router) · Supabase (Auth, Postgres, Storage) · Tailwind
CSS · Tabler Icons · déploiement prévu sur Vercel.
