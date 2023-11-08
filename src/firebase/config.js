// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3W-UYtd2dagykTc0ZD1LcJB50xeqikFI",
  authDomain: "miniblog-54a41.firebaseapp.com",
  projectId: "miniblog-54a41",
  storageBucket: "miniblog-54a41.appspot.com",
  messagingSenderId: "519213464101",
  appId: "1:519213464101:web:a16369d3a053cd5c491dcc",
  measurementId: "G-NTEQ6J4D3R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
