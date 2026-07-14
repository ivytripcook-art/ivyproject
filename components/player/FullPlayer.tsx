"use client";

import {
  IconChevronDown,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";
import type { Track } from "@/lib/types";

type FullPlayerProps = {
  track: Track;
  onCollapse: () => void;
};

export function FullPlayer({ track, onCollapse }: FullPlayerProps) {
  return (
    <div className="flex min-h-[440px] flex-col items-center rounded-xl bg-gradient-to-b from-[#2A2140] to-background px-6 py-6">
      <button onClick={onCollapse} className="mb-4 self-start text-subtle">
        <IconChevronDown size={20} />
      </button>

      <div className="mb-5 h-44 w-44 rounded-2xl bg-ivy-gradient" />
      <h2 className="text-lg font-medium text-white">{track.title}</h2>
      <p className="mb-6 text-sm text-subtle">{track.description ?? ""}</p>

      <div className="mb-1.5 h-[3px] w-full max-w-xs rounded-full bg-border">
        <div className="h-full w-[38%] rounded-full bg-primary" />
      </div>
      <div className="mb-6 flex w-full max-w-xs justify-between text-[11px] text-muted">
        <span>0:07</span>
        <span>{track.duration_seconds ? `${Math.floor(track.duration_seconds / 60)}:${String(track.duration_seconds % 60).padStart(2, "0")}` : "--:--"}</span>
      </div>

      <div className="flex items-center gap-7">
        <IconPlayerSkipBack size={20} className="text-[#C7C2D6]" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <IconPlayerPause size={20} className="text-background" />
        </div>
        <IconPlayerSkipForward size={20} className="text-[#C7C2D6]" />
      </div>
    </div>
  );
}
