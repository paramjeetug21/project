import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDJM2oh6mTdcOvJHdyvDIVD_pEvxXp02GY",
  authDomain: "project-f997d.firebaseapp.com",
  projectId: "project-f997d",
  storageBucket: "project-f997d.firebasestorage.app",
  messagingSenderId: "892869936075",
  appId: "1:892869936075:web:9e34ddd0680c8f08572c4e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
