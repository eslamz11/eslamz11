import { getPersonalData } from '@/app/lib/firestoreData';
import AboutContent from './AboutContent';

async function AboutSection() {
  // جلب البيانات الشخصية من Firestore
  const personalData = await getPersonalData();

  // Convert to plain object to avoid Firestore Timestamp serialization issues
  const plainData = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  return <AboutContent personalData={plainData} />;
}

export default AboutSection;
