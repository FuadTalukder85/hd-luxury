import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "AIzaSyDummyKeyForPrerendering0000000",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "real-estate.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "real-estate-project",
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "real-estate.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_APP_ID || "1:123456789012:web:abc123def456",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
