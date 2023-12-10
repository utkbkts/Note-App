import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_URL,
  authDomain: "notecalendar-2a4b9.firebaseapp.com",
  projectId: "notecalendar-2a4b9",
  storageBucket: "notecalendar-2a4b9.appspot.com",
  messagingSenderId: "461770437498",
  appId: "1:461770437498:web:96c9a8bdc4b4786ef5dcc3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
