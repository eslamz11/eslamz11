import { getAllProjects } from '@/app/lib/firestoreData';
import ProjectsPageContent from './ProjectsPageContent';

export const metadata = {
  title: 'All Projects - Portfolio',
  description: 'Browse all my projects and work',
};

export default async function AllProjectsPage() {
  // جلب جميع المشاريع من Firestore
  const projectsData = (await getAllProjects()) || [];

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainProjects = JSON.parse(JSON.stringify(projectsData));

  return <ProjectsPageContent projects={plainProjects} />;
}
