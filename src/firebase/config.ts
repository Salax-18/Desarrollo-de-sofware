import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyLivU3DxKZH0dbvaDhRkB2NkBpy68qjE",
  authDomain: "challenge-05-81bd3.firebaseapp.com",
  projectId: "challenge-05-81bd3",
  storageBucket: "challenge-05-81bd3.firebasestorage.app",
  messagingSenderId: "384735598414",
  appId: "1:384735598414:web:cff31133c468409265701f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);