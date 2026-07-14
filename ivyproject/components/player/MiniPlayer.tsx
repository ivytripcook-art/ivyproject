"use client";

import { IconPlayerPause } from "@tabler/icons-react";
import type { Track } from "@/lib/types";

type MiniPlayerProps = {
  track: Track;
  onExpand: () => void;
};

// Version simplifiée : la vraie implémentation branchera <audio>, la
// progression et l'état play/pause sur un contexte React (PlayerProvider)
// partagé entre le mini-player et le lecteur plein écran.
export function MiniPlayer({ track, onExpand }: MiniPlayerProps) {
  return (
    <button
      onClick={onExpand}
      className="flex w-full items-center gap-4 border-t border-border bg-[#15141F] px-5 py-3 text-left"
    >
      <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-ivy-gradient" />
      <div className="w-28 flex-shrink-0">
        <p className="truncate text-xs font-medium text-white">{track.title}</p>
        <p className="text-[11px] text-muted">En cours</p>
      </div>
      <div className="flex flex-1 items-center gap-0.5">
        {[8, 16, 10, 20, 6, 14, 18].map((h, i) => (
          <div
            key={i}
            style={{ height: h }}
            className={`w-0.5 rounded-full ${i < 4 ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
      <IconPlayerPause size={18} className="flex-shrink-0 text-white" />
    </button>
  );
}
