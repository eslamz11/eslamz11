import { getPersonalData, getAllSkills } from '@/app/lib/firestoreData';
import HeroContent from './HeroContent';

async function HeroSection() {
  // جلب البيانات الشخصية والمهارات من Firestore
  const personalData = await getPersonalData();
  const allSkills = await getAllSkills();
  
  // أخذ أول 5 مهارات للعرض
  const displaySkills = (allSkills || []).slice(0, 5);

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainPersonalData = personalData ? JSON.parse(JSON.stringify(personalData)) : null;
  const plainSkills = displaySkills ? JSON.parse(JSON.stringify(displaySkills)) : [];

  return (
    <HeroContent personalData={plainPersonalData} displaySkills={plainSkills} />
  );
}

export default HeroSection;
