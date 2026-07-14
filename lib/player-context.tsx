"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Track } from "@/lib/types";

type PlayerContextValue = {
  currentTrack: Track | null;
  isExpanded: boolean;
  play: (track: Track) => void;
  setIsExpanded: (expanded: boolean) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function play(track: Track) {
    setCurrentTrack(track);
    setIsExpanded(true);
    // TODO: brancher l'élément <audio> réel + getSignedAudioUrl(track.id)
  }

  return (
    <PlayerContext.Provider value={{ currentTrack, isExpanded, play, setIsExpanded }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer doit être utilisé dans un PlayerProvider");
  return ctx;
}
