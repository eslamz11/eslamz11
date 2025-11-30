import { getPersonalData } from '../lib/firestoreData';
import WhatsAppButton from './WhatsAppButton';

export default async function WhatsAppButtonWrapper() {
  const personalData = await getPersonalData();
  
  return <WhatsAppButton whatsappNumber={personalData?.whatsapp} />;
}

