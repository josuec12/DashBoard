// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpBSv790ZpGMXcG9HcYyuoE2op2AUunh0",
  authDomain: "besitz-41c2a.firebaseapp.com",
  projectId: "besitz-41c2a",
  storageBucket: "besitz-41c2a.appspot.com",
  messagingSenderId: "349541104569",
  appId: "1:349541104569:web:045ae1165a7a4eedb69468"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;