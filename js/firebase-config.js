// ================================================
// CONFIGURAÇÃO DO FIREBASE
// Substitua os valores abaixo pelos do seu projeto
// Firebase Console > Configurações > Geral > Seus apps
// ================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-xXv9HBM5eFqbVaCMRW8ZS2L1gnv0mE4",
  authDomain: "voltrent-6f808.firebaseapp.com",
  projectId: "voltrent-6f808",
  storageBucket: "voltrent-6f808.firebasestorage.app",
  messagingSenderId: "9996769573",
  appId: "1:9996769573:web:cdfb83fee6aab9e464a2cc"
};

const app = initializeApp(firebaseConfig);

export const db   = getFirestore(app);
export const auth = getAuth(app);
