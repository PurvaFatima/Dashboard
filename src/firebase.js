// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsd3EoPjTd5Ko6_g3x6f7zpRJPFOqfKug",
  authDomain: "dashboard-5824a.firebaseapp.com",
  projectId: "dashboard-5824a",
  storageBucket: "dashboard-5824a.firebasestorage.app",
  messagingSenderId: "1057762431035",
  appId: "1:1057762431035:web:f66d7dcf551bd43422cc1e",
  measurementId: "G-ZHMDZXQ49Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();