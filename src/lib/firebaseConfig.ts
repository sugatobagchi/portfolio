import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Parse the JSON string from environment variable
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable Analytics if it's in a browser environment
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };
