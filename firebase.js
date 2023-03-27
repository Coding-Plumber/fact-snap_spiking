import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpFOuSj4LukzaTPmcFJDMpR4wE87wexAM",
  authDomain: "fact-snap-dev-test.firebaseapp.com",
  projectId: "fact-snap-dev-test",
  storageBucket: "fact-snap-dev-test.appspot.com",
  messagingSenderId: "118219448361",
  appId: "1:118219448361:web:591d9a3604352c7e69fc38"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };

