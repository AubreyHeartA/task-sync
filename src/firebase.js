// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';    

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPtiPYYht62Bv2h_KtvX6ZRYxN13SFpBU",
  authDomain: "tasksync-6cd4c.firebaseapp.com",
  projectId: "tasksync-6cd4c",
  storageBucket: "tasksync-6cd4c.appspot.com",
  messagingSenderId: "948523191391",
  appId: "1:948523191391:web:77fa72444cf74361125fea",
  measurementId: "G-0XPT424B2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   } else {
//     firebase.app();
//   }
  
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };