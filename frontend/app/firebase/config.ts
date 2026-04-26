import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA92MaqKfheIrnOcfnK62WizUeYCenBJzQ",
  authDomain: "plant-tale.firebaseapp.com",
  projectId: "plant-tale",
  storageBucket: "plant-tale.firebasestorage.app",
  messagingSenderId: "862850061265",
  appId: "1:862850061265:web:e5033ce750b6c5f8b3c6f0",
  measurementId: "G-EHP457NL5M"
};

// Reuse existing app instance during hot reloads in development.
export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;