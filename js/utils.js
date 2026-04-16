// ================================================
// FUNÇÕES UTILITÁRIAS
// Usadas em todas as páginas do sistema
// ================================================


// Formata número para moeda brasileira (R$ 1.500,00)
export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor || 0);
}


// Formata data do Firebase (Timestamp) para DD/MM/AAAA
export function formatarData(data) {
  if (!data) return "-";
  const d = data.toDate ? data.toDate() : new Date(data);
  return d.toLocaleDateString("pt-BR");
}


// Calcula quantidade de dias entre duas datas
export function calcularDias(dataInicio, dataFim) {
  const inicio = new Date(dataInicio);
  const fim    = new Date(dataFim);
  const diff   = fim - inicio;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


// Verifica se um contrato está atrasado
// Retorna true se a data de fim já passou e o status ainda é "ativo"
export function isAtrasado(dataFim, status) {
  if (status !== "ativo") return false;
  const hoje = new Date();
  const fim  = dataFim?.toDate ? dataFim.toDate() : new Date(dataFim);
  return hoje > fim;
}


// Retorna o badge HTML de status de contrato
export function badgeContrato(status) {
  const badges = {
    ativo:      '<span class="badge badge-ativo">Ativo</span>',
    atrasado:   '<span class="badge badge-atrasado">Atrasado</span>',
    finalizado: '<span class="badge badge-finalizado">Finalizado</span>'
  };
  return badges[status] || `<span class="badge">${status}</span>`;
}


// Retorna o badge HTML de status de equipamento
export function badgeEquipamento(status) {
  const badges = {
    disponivel:  '<span class="badge badge-disponivel">Disponível</span>',
    alugado:     '<span class="badge badge-alugado">Alugado</span>',
    manutencao:  '<span class="badge badge-manutencao">Manutenção</span>'
  };
  return badges[status] || `<span class="badge">${status}</span>`;
}


// Gera link do WhatsApp com mensagem formatada de contrato
export function gerarLinkWhatsApp({ nomeCliente, equipamento, dataInicio, dataFim, valor, telefone }) {
  const msg = `🛵 *Contrato de Locação — VoltRent*

Olá, *${nomeCliente}*! Segue o resumo da sua locação:

📦 *Equipamento:* ${equipamento}
📅 *Início:* ${dataInicio}
📅 *Término:* ${dataFim}
💰 *Valor Total:* ${valor}

Em caso de dúvidas, estamos à disposição. Obrigado! 😊`;

  const tel = (telefone || "").replace(/\D/g, "");
  return `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`;
}


// Exibe uma notificação (toast) no canto da tela
// tipo: "sucesso" | "erro" | "aviso"
export function showToast(mensagem, tipo = "sucesso") {
  const cores = {
    sucesso: { bg: "#16a34a", icon: "✓" },
    erro:    { bg: "#dc2626", icon: "✕" },
    aviso:   { bg: "#d97706", icon: "!" }
  };

  const { bg, icon } = cores[tipo] || cores.sucesso;

  const toast = document.createElement("div");
  toast.innerHTML = `<strong>${icon}</strong> ${mensagem}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    background: ${bg};
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transform: translateY(8px);
    transition: all .25s ease;
  `;

  document.body.appendChild(toast);

  // Animação de entrada
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // Remove após 3 segundos
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
