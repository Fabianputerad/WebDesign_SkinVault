
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBndfptGBFnWXn9FAXr_uYJulzCSzQzLFA",
  authDomain: "react-firebase-242e9.firebaseapp.com",
  projectId: "react-firebase-242e9",
  storageBucket: "react-firebase-242e9.appspot.com",
  messagingSenderId: "142959663262",
  appId: "1:142959663262:web:7432fe372b217d31d8c38f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
export const db = getFirestore(app)
