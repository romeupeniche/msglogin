import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = JSON.parse(`${process.env.REACT_APP_API_CONFIG}`);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
