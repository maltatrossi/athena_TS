import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9UfeLFe0tooUUtiW-WKg8KWda1IJNc24",
    authDomain: "athena-66f0b.firebaseapp.com",
    projectId: "athena-66f0b",
    storageBucket: "athena-66f0b.appspot.com",
    messagingSenderId: "529731356673",
    appId: "1:529731356673:web:f0722b014fdeb26f59d800"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
