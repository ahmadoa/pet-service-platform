// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pawpal-8305b.firebaseapp.com",
  projectId: "pawpal-8305b",
  storageBucket: "pawpal-8305b.appspot.com",
  messagingSenderId: "467503803376",
  appId: "1:467503803376:web:85f03d37cba70ce38ccb35",
  measurementId: "G-0CK4M8JN0V",
};

const app = initializeApp(firebaseConfig);
