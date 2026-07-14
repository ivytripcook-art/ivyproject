import { notFound } from "next/navigation";
import { IconChevronLeft, IconDots, IconShare } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/server";
import { TrackList } from "@/components/project/TrackList";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const supabase = await createClient();

  const [{ data: project }, { data: tracks }, { data: folders }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", projectId).single(),
    supabase.from("tracks").select("*").eq("project_id", projectId).order("created_at"),
    supabase.from("folders").select("*").eq("project_id", projectId).order("position"),
  ]);

  if (!project) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-surface">
          <IconChevronLeft size={16} className="text-[#C7C2D6]" />
        </button>
        <div className="ml-auto flex gap-2">
          <button className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-surface">
            <IconShare size={15} className="text-subtle" />
          </button>
          <button className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-surface">
            <IconDots size={15} className="text-subtle" />
          </button>
        </div>
      </div>

      <h1 className="mb-1 text-xl font-medium text-white">{project.name}</h1>
      <p className="mb-5 text-sm text-subtle">{tracks?.length ?? 0} morceaux</p>

      <TrackList tracks={tracks ?? []} folders={folders ?? []} />
    </div>
  );
}
