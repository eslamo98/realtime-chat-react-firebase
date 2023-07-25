import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuk22Ha35RVBsZhpM316u9RkPdlV1zXg8",
    authDomain: "eslamo-chat.firebaseapp.com",
    projectId: "eslamo-chat",
    storageBucket: "eslamo-chat.appspot.com",
    messagingSenderId: "326987123002",
    appId: "1:326987123002:web:f33885b6d53464ce2fa803"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();