// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkF_9pCe-Nn6UBOrDofjtajkOGjVGs92w",
  authDomain: "addressbook-1284e.firebaseapp.com",
  projectId: "addressbook-1284e",
  storageBucket: "addressbook-1284e.appspot.com",
  messagingSenderId: "827976691917",
  appId: "1:827976691917:web:28381abf153dd22c92b984"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };