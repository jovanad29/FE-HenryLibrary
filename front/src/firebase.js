import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBjHCi_mJPzDg5rogWRdo0WXdDnDfhErtQ",
    authDomain: "libreriahenry-89c61.firebaseapp.com",
    projectId: "libreriahenry-89c61",
    storageBucket: "libreriahenry-89c61.appspot.com",
    messagingSenderId: "84202125600",
    appId: "1:84202125600:web:4b4769c85cb1c36745ff45",
    measurementId: "G-0RL3BHQ96D",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
