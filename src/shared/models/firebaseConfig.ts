// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB87y3YTn3TEXoMElmUdxTbzZuOFY2qM90",
    authDomain: "anotherbrick-capstone.firebaseapp.com",
    projectId: "anotherbrick-capstone",
    storageBucket: "anotherbrick-capstone.appspot.com",
    messagingSenderId: "895171034162",
    appId: "1:895171034162:web:57f8e2ab37742a129d902b",
    measurementId: "G-Y593BNWZN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);