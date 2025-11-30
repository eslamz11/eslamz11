import { getFeaturedProjects } from '@/app/lib/firestoreData';
import ProjectsContent from './ProjectsContent';

const Projects = async () => {
  // جلب المشاريع المميزة فقط للصفحة الرئيسية (6 مشاريع)
  const projectsData = (await getFeaturedProjects(6)) || [];

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainProjects = JSON.parse(JSON.stringify(projectsData));

  return <ProjectsContent projects={plainProjects} />;
};

export default Projects;
