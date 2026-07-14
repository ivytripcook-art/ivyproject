import Link from "next/link";
import { IconLock, IconPlayerPlay } from "@tabler/icons-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <div
        className="relative mb-2.5 aspect-square rounded-2xl border border-border bg-surface"
        style={
          project.color
            ? { background: `linear-gradient(135deg, ${project.color}, #3C3489)` }
            : undefined
        }
      >
        <div className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-background/55">
          <IconPlayerPlay size={14} className="text-white" />
        </div>
      </div>
      <p className="text-sm font-medium text-white">{project.name}</p>
      <p className="flex items-center gap-1 text-xs text-muted">
        <IconLock size={11} /> Toi
      </p>
    </Link>
  );
}
