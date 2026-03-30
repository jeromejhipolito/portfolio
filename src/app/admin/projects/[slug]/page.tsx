import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectForm } from '@/components/admin/project-form';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditProject({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit: {project.name}</h1>
      <ProjectForm project={project} allProjects={projects} />
    </div>
  );
}
