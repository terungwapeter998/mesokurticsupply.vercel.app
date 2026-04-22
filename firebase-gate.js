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
    apiKey: "AIzaSyCSU1Crbiy_pcJrGguhE0adYHltha2ZiEA",
    authDomain: "mesokurtic-live.firebaseapp.com",
    projectId: "mesokurtic-live",
    storageBucket: "mesokurtic-live.firebasestorage.app",
    messagingSenderId: "1000493696057",
    appId: "1:1000493696057:web:e8a6e546c7f3c5018db9e8",
    measurementId: "G-JDMCD15P70"
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