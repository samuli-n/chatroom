import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBvHaEUz859fef40MlpqewA741yCIhnvW8",
  authDomain: "chat-app-34ce9.firebaseapp.com",
  projectId: "chat-app-34ce9",
  storageBucket: "chat-app-34ce9.appspot.com",
  messagingSenderId: "314862560642",
  appId: "1:314862560642:web:6de25b60e0d31573e4db9b",
  measurementId: "G-YE34Y08M0X"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);