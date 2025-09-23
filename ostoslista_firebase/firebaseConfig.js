import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.EXPO_PULIC_API_KEY,
  authDomain: "ostoslista-70096.firebaseapp.com",
  databaseURL: "https://ostoslista-70096-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ostoslista-70096",
  storageBucket: "ostoslista-70096.firebasestorage.app",
  messagingSenderId: "342939987920",
  appId: process.env.EXPO_PUBLIC_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);