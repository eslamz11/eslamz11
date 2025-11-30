import { getAllEducation } from '@/app/lib/firestoreData';
import EducationContent from './EducationContent';

async function Education() {
  // جلب البيانات التعليمية من Firestore
  const educations = (await getAllEducation()) || [];

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainEducations = JSON.parse(JSON.stringify(educations));

  return <EducationContent educations={plainEducations} />;
}

export default Education;
