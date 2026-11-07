// Public site only needs Firestore (the admin page does its own sign-in).
// Loaded lazily from live-data.js, after the page has rendered.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDq1jqOsmoHWOovP2zwnc8kcASQEA9iDF4',
  authDomain: 'carry-together.firebaseapp.com',
  projectId: 'carry-together',
  storageBucket: 'carry-together.firebasestorage.app',
  messagingSenderId: '590186733121',
  appId: '1:590186733121:web:80899a8ff4c7f286fd30c0',
  measurementId: 'G-8R60R3RW76',
};

export const db = getFirestore(initializeApp(firebaseConfig));
