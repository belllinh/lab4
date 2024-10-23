import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQAaNb8JSDrqKDE6u4BvXGpGVOsUTyiPQ",
  authDomain: "lab4-b28b2.firebaseapp.com",
  projectId: "lab4-b28b2",
  storageBucket: "lab4-b28b2.appspot.com",
  messagingSenderId: "203421370661",
  appId: "1:203421370661:web:591e2fa5c7813293d4b2cc",
  measurementId: "G-0WL49MEK5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Ensure this is correct
export { db };