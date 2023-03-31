import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs391Rwb7q_gqX6zNiWS0NvdF7VCQLR58",
  authDomain: "recipe-app-bccfe.firebaseapp.com",
  projectId: "recipe-app-bccfe",
  storageBucket: "recipe-app-bccfe.appspot.com",
  messagingSenderId: "997985371861",
  appId: "1:997985371861:web:37de02fcabdc74e31bc45c",
  measurementId: "G-FDCKDD7HZ8",
};

function createFirebaseApp(config: any) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

//Initialize app
const app = createFirebaseApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
