import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs391Rwb7q_gqX6zNiWS0NvdF7VCQLR58",
  authDomain: "recipe-app-bccfe.firebaseapp.com",
  projectId: "recipe-app-bccfe",
  storageBucket: "recipe-app-bccfe.appspot.com",
  messagingSenderId: "997985371861",
  appId: "1:997985371861:web:37de02fcabdc74e31bc45c",
  measurementId: "G-FDCKDD7HZ8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
