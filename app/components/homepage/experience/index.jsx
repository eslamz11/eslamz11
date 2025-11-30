import { getAllExperience } from '@/app/lib/firestoreData';
import ExperienceContent from './ExperienceContent';

async function Experience() {
  // جلب الخبرات من Firestore
  const experiences = (await getAllExperience()) || [];

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainExperiences = JSON.parse(JSON.stringify(experiences));

  return <ExperienceContent experiences={plainExperiences} />;
}

export default Experience;
