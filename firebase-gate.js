// ═══════════════════════════════════════════════════════
// firebase-gate.js — Single Source of Truth for Firebase
// ═══════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID

};

// ── Initialise once ─────────────────────────────────────
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Exports ─────────────────────────────────────────────
export { app, auth, signInWithEmailAndPassword };

export const firebaseAuth = {
    onStateChange(callback) {
        return onAuthStateChanged(auth, callback);
    },
    async signOut() {
        return signOut(auth);
    }
};