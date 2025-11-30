import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBj6vHXGbeqPFK40vQR8CEnjoAPofyScfM",
  authDomain: "portfolio-3dd0f.firebaseapp.com",
  projectId: "portfolio-3dd0f",
  storageBucket: "portfolio-3dd0f.firebasestorage.app",
  messagingSenderId: "530466863263",
  appId: "1:530466863263:web:b84470ecd1c5eb07c44aaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

