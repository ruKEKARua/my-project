// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDURpJnql2PtKBnpjYj9uUPJ_ToD8-ceag",
  authDomain: "testproject-c4689.firebaseapp.com",
  projectId: "testproject-c4689",
  storageBucket: "testproject-c4689.firebasestorage.app",
  messagingSenderId: "695994525667",
  appId: "1:695994525667:web:5a3ea6b22a49fe43e922d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;