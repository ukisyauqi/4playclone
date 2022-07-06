// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCDWLX3ZWP7EpVA-cNirhU36rexvS2oK44",
  authDomain: "playclone-b8f97.firebaseapp.com",
  projectId: "playclone-b8f97",
  storageBucket: "playclone-b8f97.appspot.com",
  messagingSenderId: "11676851871",
  appId: "1:11676851871:web:375e8de86660874a9bccaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
