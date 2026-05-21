import { useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface ProjectShowcaseProps {
  projects: Project[];
  lang: string;
  detailsLabel: string;
  repoLabel: string;
}

export default function ProjectShowcase({
  projects,
  lang,
  detailsLabel,
  repoLabel,
}: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {safeProjects.map((project) => (
          <ProjectCard
            key={project.repo}
            {...project}
            detailsLabel={detailsLabel}
            repoLabel={repoLabel}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        lang={lang}
      />
    </>
  );
}
