"use client";

import { useState } from "react";
import { IconDots, IconWaveSine } from "@tabler/icons-react";
import type { Folder, Track } from "@/lib/types";
import { usePlayer } from "@/lib/player-context";

type TrackListProps = {
  tracks: Track[];
  folders: Folder[];
};

export function TrackList({ tracks, folders }: TrackListProps) {
  const [activeFolder, setActiveFolder] = useState<string | "all">("all");
  const { play, currentTrack } = usePlayer();

  const visibleTracks =
    activeFolder === "all" ? tracks : tracks.filter((t) => t.folder_id === activeFolder);

  return (
    <div>
      {folders.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          <Chip label="Tous" active={activeFolder === "all"} onClick={() => setActiveFolder("all")} />
          {folders.map((folder) => (
            <Chip
              key={folder.id}
              label={folder.name}
              active={activeFolder === folder.id}
              onClick={() => setActiveFolder(folder.id)}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {visibleTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => play(track)}
            className="flex items-center gap-3.5 border-b border-[#221F2E] py-2.5 text-left last:border-0"
          >
            {currentTrack?.id === track.id ? (
              <IconWaveSine size={15} className="text-primary" />
            ) : (
              <div className="w-4" />
            )}
            <div className="flex-1">
              <p className="text-[13px] text-primary-light">{track.title}</p>
              <p className="text-[11px] text-muted">
                {new Date(track.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <IconDots size={15} className="text-muted" />
          </button>
        ))}

        {visibleTracks.length === 0 && (
          <p className="py-4 text-sm text-muted">Aucun morceau dans ce dossier.</p>
        )}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs ${
        active ? "bg-primary font-medium text-background" : "border border-border text-[#C7C2D6]"
      }`}
    >
      {label}
    </button>
  );
}
