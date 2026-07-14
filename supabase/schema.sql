-- ============================================================
-- IvyProject — Schéma initial (Version 1)
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

-- 1. Profils utilisateurs (miroir de auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  role text default 'artist',
  created_at timestamptz default now()
);

-- 2. Projets
create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  cover_url text,
  color text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Dossiers (arborescence récursive)
create table folders (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  parent_id uuid references folders(id) on delete cascade,
  name text not null,
  position int default 0,
  created_at timestamptz default now()
);

-- 4. Morceaux
create table tracks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  folder_id uuid references folders(id) on delete set null,
  title text not null,
  description text,
  audio_path text not null,
  cover_path text,
  video_path text,
  duration_seconds numeric,
  bpm int,
  key_signature text,
  lyrics text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Partages (liens privés)
create table shares (
  id uuid primary key default gen_random_uuid(),
  resource_type text not null check (resource_type in ('track','folder','project')),
  resource_id uuid not null,
  token text unique not null,
  created_by uuid references profiles(id),
  expires_at timestamptz,
  allow_comments boolean default true,
  created_at timestamptz default now()
);

-- 6. Commentaires
create table comments (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks(id) on delete cascade,
  author_id uuid references profiles(id),
  author_name text,
  content text not null,
  timestamp_seconds numeric,
  created_at timestamptz default now()
);

-- 7. Historique d'écoute (pour le dashboard "récemment écoutés")
create table track_plays (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks(id) on delete cascade,
  user_id uuid references profiles(id),
  played_at timestamptz default now()
);

-- Index
create index idx_tracks_project on tracks(project_id);
create index idx_tracks_folder on tracks(folder_id);
create index idx_folders_project on folders(project_id);
create index idx_comments_track on comments(track_id);
create index idx_shares_token on shares(token);
create index idx_track_plays_user on track_plays(user_id, played_at desc);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table profiles enable row level security;
alter table projects enable row level security;
alter table folders enable row level security;
alter table tracks enable row level security;
alter table shares enable row level security;
alter table comments enable row level security;
alter table track_plays enable row level security;

create policy "Un profil est visible et modifiable par son propriétaire"
on profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Les propriétaires gèrent leurs projets"
on projects for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Accès aux dossiers via le projet possédé"
on folders for all
using (exists (select 1 from projects where projects.id = folders.project_id and projects.owner_id = auth.uid()))
with check (exists (select 1 from projects where projects.id = folders.project_id and projects.owner_id = auth.uid()));

create policy "Accès aux morceaux via le projet possédé"
on tracks for all
using (exists (select 1 from projects where projects.id = tracks.project_id and projects.owner_id = auth.uid()))
with check (exists (select 1 from projects where projects.id = tracks.project_id and projects.owner_id = auth.uid()));

create policy "Les partages sont gérés par leur créateur"
on shares for all
using (auth.uid() = created_by)
with check (auth.uid() = created_by);

create policy "Commentaires visibles par le propriétaire du morceau"
on comments for select
using (exists (
  select 1 from tracks join projects on projects.id = tracks.project_id
  where tracks.id = comments.track_id and projects.owner_id = auth.uid()
));

create policy "Historique d'écoute privé"
on track_plays for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- ============================================================
-- Storage buckets — à créer aussi via le dashboard (Storage > New bucket)
-- covers  (public)
-- audio   (privé)
-- video   (privé)
-- avatars (public)
-- ============================================================
