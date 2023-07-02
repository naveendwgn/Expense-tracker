// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4zuP_02zCYEK6FQj7LE2zhOp7SE-unJM",
  authDomain: "expense-tracker-de535.firebaseapp.com",
  projectId: "expense-tracker-de535",
  storageBucket: "expense-tracker-de535.appspot.com",
  messagingSenderId: "876091758246",
  appId: "1:876091758246:web:5bd3f2ac7da41f848bc667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);