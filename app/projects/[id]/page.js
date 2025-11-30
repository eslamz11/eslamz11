import { getProjectById } from '@/app/lib/firestoreData';
import { notFound } from 'next/navigation';
import ProjectDetailContent from './ProjectDetailContent';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const projectId = parseInt(id);
  const project = await getProjectById(projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} - Project Details`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailsPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const projectId = parseInt(id);

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
