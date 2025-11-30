import { getAllSkills } from '@/app/lib/firestoreData';
import SkillsContent from './SkillsContent';

async function Skills() {
  // جلب المهارات من Firestore
  const skillsData = await getAllSkills();
  
  // تصفية المهارات - فقط التي لها اسم أو صورة
  const validSkills = (skillsData || []).filter(skill => {
    if (typeof skill === 'string') return skill.trim() !== '';
    return (skill?.name && skill.name.trim() !== '') || (skill?.image && skill.image.trim() !== '');
  });

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainSkills = JSON.parse(JSON.stringify(validSkills));

  return <SkillsContent skills={plainSkills} />;
}

export default Skills;
