const cards = [
  { nome: "Meliodas", ataque: 1200, defesa: 800, imagem: "img/meliodas.webp" },
  { nome: "Ban", ataque: 700, defesa: 1000, imagem: "img/ban.webp" },
  { nome: "escanor(nao vale)", ataque: 1500, defesa: 1200, imagem: "img/escanor.webp" },
  { nome: "estarossa", ataque: 1400, defesa: 900, imagem: "img/estarosa.jpg" },
  { nome: "king", ataque: 500, defesa: 400, imagem: "img/king.webp" },
  { nome: "zeldris", ataque: 900, defesa: 700, imagem: "img/zeldris.webp" },
  { nome: "rei arthur", ataque: 500, defesa: 300, imagem: "img/rei arthur.jpg" }  
];

function gerarCards() {
  const areaCards = document.getElementById("area-cards"); /* Obtém a área onde os cards serão exibidos */
  areaCards.innerHTML = "";

  cards.forEach((card, index) => { /* Itera sobre cada card */ 
    const cardDiv = document.createElement("div"); /* Cria um elemento div para o card */
    cardDiv.className = "card"; 
    cardDiv.setAttribute("draggable", true); 
    cardDiv.setAttribute("data-index", index);

    cardDiv.innerHTML = `
      <img src="${card.imagem}" alt="${card.nome}" /> 
      <h3>${card.nome}</h3> 
      <div class="stats">Ataque: ${card.ataque}</div>
      <div class="stats">Defesa: ${card.defesa}</div>
    `;

    // Evento de início do arrasto
    cardDiv.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
    });

    areaCards.appendChild(cardDiv);
  });
}

function setupDropAreas() {
  const arenas = document.querySelectorAll(".arena");

  arenas.forEach((arena) => {
    arena.addEventListener("dragover", (e) => {
      e.preventDefault();
      arena.style.backgroundColor = "#5c4033"; // cor no hover
    });

    arena.addEventListener("dragleave", () => {  
      arena.style.backgroundColor = "#31170c"; // cor original
    });

    arena.addEventListener("drop", (e) => { /* Evento de drop */
      e.preventDefault(); /* Impede o comportamento padrão do navegador */
      arena.style.backgroundColor = "#31170c"; /* Restaura a cor original */

      const index = e.dataTransfer.getData("text/plain"); /* Obtém o índice do card arrastado */
      const card = cards[index]; /* Obtém o card correspondente ao índice */

      arena.innerHTML = ` 
        <img src="${card.imagem}" alt="${card.nome}" style="width:80px; border-radius:6px;" /> 
        <h3>${card.nome}</h3> 
        <div class="stats">Ataque: ${card.ataque}</div>
        <div class="stats">Defesa: ${card.defesa}</div>
      `;
      arena.dataset.index = index;

      const status = document.getElementById("status");
      if (document.getElementById("player1").dataset.index && document.getElementById("player2").dataset.index) { /* Verifica se ambos os guerreiros foram selecionados */
        status.textContent = "⚔️ Pronto para lutar! Clique em LUTAR!"; /* Atualiza o status para pronto para lutar */
      } else {
        status.textContent = "🛡️ Aguardando Guerreiros 🛡️"; 
      }
    });
  });
}

function lutar() {
  const p1 = document.getElementById("player1"); /* Obtém a arena do jogador 1 */
  const p2 = document.getElementById("player2"); /* Obtém a arena do jogador 2 */
  const resultado = document.getElementById("resultado"); /* Obtém o elemento de resultado */

  if (!p1.dataset.index || !p2.dataset.index) { /* Verifica se ambos os guerreiros foram selecionados */
    resultado.textContent = "Selecione dois guerreiros para lutar!"; /* Exibe mensagem de erro se não houver guerreiros selecionados */
    return;
  }

  const card1 = cards[p1.dataset.index];
  const card2 = cards[p2.dataset.index];

  if (card1.nome.includes("(nao vale)") || card2.nome.includes("(nao vale)")) {
    resultado.textContent = "⚠️ Escanor está banido da competição!";
    return;
  }

  const poder1 = card1.ataque + card1.defesa;
  const poder2 = card2.ataque + card2.defesa;

  if (poder1 > poder2) {
    resultado.textContent = `🏆 ${card1.nome} venceu a batalha!`;
  } else if (poder2 > poder1) {
    resultado.textContent = `🏆 ${card2.nome} venceu a batalha!`;
  } else {
    resultado.textContent = "⚖️ Empate!";
  }
}

function resetar() {
  const arenas = document.querySelectorAll(".arena");
  arenas.forEach((arena, index) => {
    arena.innerHTML = `Arena do Guerreiro ${index + 1}<br><span>Arraste um guerreiro aqui</span>`;
    arena.style.backgroundColor = "#31170c";
    arena.removeAttribute("data-index");
  });

  document.getElementById("resultado").textContent = "";
  document.getElementById("status").textContent = "🛡️ Aguardando Guerreiros 🛡️";
}

// Inicialização
gerarCards();
setupDropAreas();
