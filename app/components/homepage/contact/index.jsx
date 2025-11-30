import { getPersonalData } from '@/app/lib/firestoreData';
import ContactSectionContent from './ContactSectionContent';

async function ContactSection() {
  // جلب البيانات الشخصية من Firestore
  const personalData = await getPersonalData();
  
  // Convert to plain object to avoid serialization issues
  const plainData = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  return <ContactSectionContent personalData={plainData} />;
};

export default ContactSection;
