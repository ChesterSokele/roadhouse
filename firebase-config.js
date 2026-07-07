// ================================================================
//  ROADHOUSE DELI & GRILL — Firebase Configuration
//  Replace the placeholder values below with your actual Firebase
//  project credentials (see firebase-setup.html for instructions).
// ================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage }     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── YOUR FIREBASE CONFIG ── (copy from Firebase Console → Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyDq1jqOsmoHWOovP2zwnc8kcASQEA9iDF4",
    authDomain: "carry-together.firebaseapp.com",
    projectId: "carry-together",
    storageBucket: "carry-together.firebasestorage.app",
    messagingSenderId: "590186733121",
    appId: "1:590186733121:web:80899a8ff4c7f286fd30c0",
    measurementId: "G-8R60R3RW76"
  };

// ── Initialise ──
const app = initializeApp(firebaseConfig);

export const db      = getFirestore(app);
export const storage = getStorage(app);
export const auth    = getAuth(app);
