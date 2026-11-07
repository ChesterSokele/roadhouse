// Loaded only when someone submits a review (needs the Firebase SDK for a server timestamp write).
import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

/** New reviews stay pending until approved in admin.html. */
export function submitReview({ name, text, rating }) {
  return addDoc(collection(db, 'reviews'), {
    name: String(name).slice(0, 60),
    text: String(text).slice(0, 1000),
    rating: Math.max(1, Math.min(5, parseInt(rating) || 5)),
    approved: false,
    pinned: false,
    createdAt: serverTimestamp(),
  });
}
