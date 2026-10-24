
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyBj9bY4XTUR11HEv0tsgknducSfu6eQPws",
  authDomain: "parcial-2-1978c.firebaseapp.com",
  projectId: "parcial-2-1978c",
  storageBucket: "parcial-2-1978c.firebasestorage.app",
  messagingSenderId: "709440641839",
  appId: "1:709440641839:web:1f30b1a7a18d71f69cdfda"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
