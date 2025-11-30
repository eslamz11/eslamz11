import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj6vHXGbeqPFK40vQR8CEnjoAPofyScfM",
  authDomain: "portfolio-3dd0f.firebaseapp.com",
  projectId: "portfolio-3dd0f",
  storageBucket: "portfolio-3dd0f.firebasestorage.app",
  messagingSenderId: "530466863263",
  appId: "1:530466863263:web:b84470ecd1c5eb07c44aaa"
};

// Initialize Firebase (تجنب التهيئة المتكررة)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

export default app;

