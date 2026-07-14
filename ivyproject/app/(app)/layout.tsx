"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconHome,
  IconFolder,
  IconUsers,
  IconUser,
} from "@tabler/icons-react";
import { MiniPlayer } from "@/components/player/MiniPlayer";
import { FullPlayer } from "@/components/player/FullPlayer";
import type { Track } from "@/lib/types";
import { PlayerProvider, usePlayer } from "@/lib/player-context";

function AppShell({ children }: { children: React.ReactNode }) {
  const { currentTrack, isExpanded, setIsExpanded } = usePlayer();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-44 flex-shrink-0 flex-col gap-1 border-r border-border p-4">
        <div className="mb-5 text-base font-medium text-white">IvyProject</div>
        <NavItem href="/" icon={<IconHome size={16} />} label="Bibliothèque" />
        <NavItem href="/projects" icon={<IconFolder size={16} />} label="Projets" />
        <NavItem href="/sessions" icon={<IconUsers size={16} />} label="Sessions" />
        <NavItem href="/profile" icon={<IconUser size={16} />} label="Profil" />
      </aside>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-8">{children}</main>

        {currentTrack && !isExpanded && (
          <MiniPlayer track={currentTrack} onExpand={() => setIsExpanded(true)} />
        )}
        {currentTrack && isExpanded && (
          <div className="border-t border-border p-4">
            <FullPlayer track={currentTrack} onCollapse={() => setIsExpanded(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-subtle hover:bg-surface hover:text-primary-light"
    >
      {icon}
      {label}
    </Link>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <AppShell>{children}</AppShell>
    </PlayerProvider>
  );
}
