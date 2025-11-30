import { getPersonalData } from '@/app/lib/firestoreData';
import FooterContent from './FooterContent';

async function Footer() {
  const personalData = await getPersonalData();
  
  // Convert to plain object to avoid Firestore Timestamp serialization issues
  const plainData = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  return <FooterContent personalData={plainData} />;
}

export default Footer;
