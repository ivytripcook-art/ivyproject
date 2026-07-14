export type Project = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
};

export type Folder = {
  id: string;
  project_id: string;
  parent_id: string | null;
  name: string;
  position: number;
};

export type Track = {
  id: string;
  project_id: string;
  folder_id: string | null;
  title: string;
  description: string | null;
  audio_path: string;
  cover_path: string | null;
  video_path: string | null;
  duration_seconds: number | null;
  created_at: string;
};
