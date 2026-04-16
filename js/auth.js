// ================================================
// MÓDULO DE AUTENTICAÇÃO
// Responsável por: login, logout e proteção de páginas
// ================================================

import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// Faz login com email e senha
export async function login(email, senha) {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
  } catch (err) {
    throw new Error("Email ou senha incorretos. Tente novamente.");
  }
}


// Faz logout e volta para o login
export async function logout() {
  await signOut(auth);
  window.location.href = "index.html";
}


// Protege páginas internas — coloque no início de cada página (ex: dashboard, clientes...)
// Se o usuário não estiver logado, redireciona para o login automaticamente
export function protegerPagina() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}


// Usado na página de login — se já estiver logado, vai direto para o dashboard
export function redirecionarSeLogado() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "dashboard.html";
    }
  });
}


// Retorna o usuário atual (ou null se não estiver logado)
export function getUsuarioAtual() {
  return auth.currentUser;
}
