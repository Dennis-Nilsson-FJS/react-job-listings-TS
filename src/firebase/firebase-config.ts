// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK0U1etywB9cRgDpRhGdYEtUqIKG2QzZQ",
    authDomain: "jobchaser-ac586.firebaseapp.com",
    projectId: "jobchaser-ac586",
    storageBucket: "jobchaser-ac586.appspot.com",
    messagingSenderId: "1055985356454",
    appId: "1:1055985356454:web:011bf6d245011913aa6e67",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export { db, auth };
