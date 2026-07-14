import { IconPlus } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/library/ProjectCard";

export default async function LibraryPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 grid grid-cols-4 gap-5">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {!projects?.length && (
        <p className="mb-8 text-sm text-muted">
          Aucun projet pour le moment. Crée-en un pour commencer.
        </p>
      )}

      <div className="flex justify-center">
        <button className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-primary-light hover:bg-surface">
          <IconPlus size={14} className="mr-1.5 inline" />
          Nouveau projet
        </button>
      </div>
    </div>
  );
}
