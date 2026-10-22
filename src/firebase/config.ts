import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
 apiKey: "AIzaSyCaB_ecdnFQhUlUrbpJcOvuwpJdilKyYco",
  authDomain: "challenge-06-cf672.firebaseapp.com",
  projectId: "challenge-06-cf672",
  storageBucket: "challenge-06-cf672.firebasestorage.app",
  messagingSenderId: "637267213986",
  appId: "1:637267213986:web:ff814874d74c93e648e1fb",
  measurementId: "G-H4M2EH81QT",
  databaseURL: "https://challenge-06-cf672-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;