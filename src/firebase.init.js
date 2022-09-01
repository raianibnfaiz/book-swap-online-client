import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyA244x3b9U_EkDU-t2rbTWsfN2GdbkfCMA",
    authDomain: "book-swap-online.firebaseapp.com",
    projectId: "book-swap-online",
    storageBucket: "book-swap-online.appspot.com",
    messagingSenderId: "309366348682",
    appId: "1:309366348682:web:d610865224ecd1d6128673"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;