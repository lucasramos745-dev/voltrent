// ================================================
// MENU MOBILE — usado em todas as páginas
// ================================================

export function iniciarMenuMobile() {
  const gaveta  = document.getElementById("gaveta");
  const overlay = document.getElementById("gaveta-overlay");
  const btnAbrir= document.getElementById("btn-menu");
  const btnFechar = document.getElementById("btn-fechar-gaveta");

  function abrir() {
    gaveta?.classList.add("ativa");
    overlay?.classList.add("ativo");
    document.body.style.overflow = "hidden";
  }

  function fechar() {
    gaveta?.classList.remove("ativa");
    overlay?.classList.remove("ativo");
    document.body.style.overflow = "";
  }

  btnAbrir?.addEventListener("click", abrir);
  overlay?.addEventListener("click", fechar);
  btnFechar?.addEventListener("click", fechar);

  // Fecha ao clicar em qualquer link da gaveta
  gaveta?.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", fechar);
  });
}
