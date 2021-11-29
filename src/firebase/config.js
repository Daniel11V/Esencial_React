// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_VTQaveDhXoL9muhwS23ASdgP-lfZ4sA",
    authDomain: "esencial.firebaseapp.com",
    projectId: "esencial",
    storageBucket: "esencial.appspot.com",
    messagingSenderId: "630395241807",
    appId: "1:630395241807:web:869a8e8ba6e79f1292713a",
    measurementId: "G-JQTC8YL7RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app)
