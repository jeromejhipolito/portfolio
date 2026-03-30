import { projects } from '@/data/projects';
import { ProjectForm } from '@/components/admin/project-form';
import type { Project } from '@/types/portfolio';

const emptyProject: Project = {
  slug: '',
  name: '',
  problem: '',
  solution: '',
  impact: '',
  framework: 'nextjs',
  techStack: [],
  githubUrl: '',
  screenshot: '/projects/',
  outcomeMetric: '',
  featured: false,
  claudeAssisted: false,
  order: projects.length + 1,
};

export default function NewProject() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Project</h1>
      <ProjectForm project={emptyProject} allProjects={projects} isNew />
    </div>
  );
}
