const cards = [
    {
        nome: "Meliodas",
        ataque: 1200,
        defesa: 800,
        imagem: "img/meliodas.webp"
    },
    {
        nome: "Ban",
        ataque: 700,
        defesa: 1000,
        imagem: "img/ban.webp"
    },
    {
        nome: "escanor(nao vale)",
        ataque: 1500,
        defesa: 1200,
        imagem: "img/escanor.webp"
    },
    {
        nome: "estarosa",
        ataque: 1000,
        defesa: 700,
        imagem: "img/estarosa.jpg"
    },
    {
        nome: "king",
        ataque: 500,
        defesa: 400,
        imagem: "img/king.webp"
    },

    {
        nome: "zeldris",
        ataque: 900,
        defesa: 700,
        imagem: "img/zeldris.webp"
    },
    {
        nome: "rei arthur",
        ataque: 500,
        defesa: 300,
        imagem: "img/rei arthur.jpg"
    },
];

// Gera os cards na área de escolha
function gerarCards() {
    const areaCards = document.getElementById('area-cards');
    areaCards.innerHTML = "";

    cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('draggable', true);
        cardDiv.setAttribute('data-index', index);

        cardDiv.innerHTML = `
            <img src="${card.imagem}" alt="${card.nome}" />
            <h3>${card.nome}</h3>
            <div class="stats">Ataque: ${card.ataque}</div>
            <div class="stats">Defesa: ${card.defesa}</div>
        `;

        // Evento de início do arrasto
        cardDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });

        areaCards.appendChild(cardDiv);
    });
}

// Configura as áreas de drop para os campos de batalha
function setupDropAreas() {
    const campos = document.querySelectorAll('.campo');
    // Limpa os campos antes de configurar os eventos
    campos.forEach(campo => {
    
        campo.addEventListener('dragover', (e) => {
            e.preventDefault();
            campo.style.background = '#333';
        });
       
        
        campo.addEventListener('dragleave', () => {
            campo.style.background = '#1e1e1e';
        });

        // Evento de drop
        campo.addEventListener('drop', (e) => {
            e.preventDefault();
            campo.style.background = '#1e1e1e';

            const index = e.dataTransfer.getData('text/plain');
            const card = cards[index];

            campo.innerHTML = `
                <img src="${card.imagem}" alt="${card.nome}" style="width:100px; border-radius: 6px;" />
                <h3>${card.nome}</h3>
                <div class="stats">Ataque: ${card.ataque}</div>
                <div class="stats">Defesa: ${card.defesa}</div>
            `;

            campo.dataset.index = index; 
        });
    });
}

// Gera os cards e configura as áreas de drop
gerarCards();
setupDropAreas();
function lutar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    // Limpa o resultado anterior
    if (!p1.dataset.index || !p2.dataset.index) {
        resultado.textContent = "Selecione as duas skins para lutar!";
        return;
    }

    const card1 = cards[p1.dataset.index];
    const card2 = cards[p2.dataset.index];

    const poder1 = card1.ataque + card1.defesa;
    const poder2 = card2.ataque + card2.defesa;

    if (poder1 > poder2) {
        resultado.textContent = `${card1.nome} venceu a batalha!`;
    } else if (poder2 > poder1) {
        resultado.textContent = `${card2.nome} venceu a batalha!`;
    } else {
        resultado.textContent = "Empate!";
    }
}

// Adiciona o evento de click no botão de lutar
document.getElementById('lutar').addEventListener('click', lutar);

