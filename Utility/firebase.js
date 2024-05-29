
import firebase from "firebase/compat/app";

import {getAuth} from "firebase/auth"// for authentication services
import "firebase/compat/firestore"
import "firebase/compat/auth"


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhed9z-J7NL78du8x5Ql9ADnW5hqsmvhM",
  authDomain: "clone-6c46d.firebaseapp.com",
  projectId: "clone-6c46d",
  storageBucket: "clone-6c46d.appspot.com",
  messagingSenderId: "772140116580",
  appId: "1:772140116580:web:ea3fa662b8e145c6f00d71",
  measurementId: "G-V9CR7662X3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = app.firestore();

