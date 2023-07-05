import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvAp0tvBhwJxfRakgg4UHC8QD8vkoJLIQ",
  authDomain: "whatsapp-d0b5f.firebaseapp.com",
  projectId: "whatsapp-d0b5f",
  storageBucket: "whatsapp-d0b5f.appspot.com",
  messagingSenderId: "909741353722",
  appId: "1:909741353722:web:e7546c9cc26a34eda4b743",
  measurementId: "G-E8PHSK6F1R",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
