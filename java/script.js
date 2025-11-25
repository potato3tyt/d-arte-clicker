//variáveis do código
let moedas = 0;
let contagem = 0;
let cpsValue = 0;
let bonus = 10;
let almasporclique = 1;
let progresso = 0;

// Definições dos upgrades (devem vir antes de loadGame)
const upgradesporsegundo = [
    { id: "ASacerdotisa", custo: 300, cps: 1 },
    { id: "ALua", custo: 700, cps: 5 },
    { id: "OMago", custo: 1500, cps: 10 },
    { id: "OLouco", custo: 4000, cps: 120 },
    { id: "ODiabo", custo: 9000, cps: 50 },
    { id: "OHierofante", custo: 19000, cps: 70 },
];

const upgradesbonus = [
    { id: "Bruxa", custo: 600, maisbonus: 5 },
    { id: "CartomanteEsmeralda", custo: 1400, maisbonus: 10 },
    { id: "MágicoMaior", custo: 3000, maisbonus: 20 }
];

const upgradesalmasporclique = [
    { id: "PalhaçaNarizinho", custo: 8000, apc: 5 },
    { id: "Alpha", custo: 18000, apc: 10 },
];

const batalhaGrandeMestre = [
    { id: "GrandeMestre", custo: 38000, apc: 30 },
];

// Função para carregar o jogo
function loadGame() {
    const savedData = localStorage.getItem('cryclickerSave');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        moedas = gameData.moedas;
        cpsValue = gameData.cpsValue;
        bonus = gameData.bonus;
        almasporclique = gameData.almasporclique;
        
        // Atualiza os arrays de upgrades com os dados salvos
        // É importante garantir que a estrutura dos arrays seja mantida,
        // apenas os valores de custo e os valores de bônus comprados são atualizados.
        
        // Upgrades por segundo
        if (gameData.upgradesporsegundo) {
            gameData.upgradesporsegundo.forEach((savedUpg, index) => {
                if (upgradesporsegundo[index]) {
                    upgradesporsegundo[index].custo = savedUpg.custo;
                    // Não é necessário atualizar o cps, pois ele é somado ao cpsValue
                }
            });
        }

        // Upgrades de bônus
        if (gameData.upgradesbonus) {
            gameData.upgradesbonus.forEach((savedUpg, index) => {
                if (upgradesbonus[index]) {
                    upgradesbonus[index].custo = savedUpg.custo;
                }
            });
        }

        // Upgrades de almas por clique
        if (gameData.upgradesalmasporclique) {
            gameData.upgradesalmasporclique.forEach((savedUpg, index) => {
                if (upgradesalmasporclique[index]) {
                    upgradesalmasporclique[index].custo = savedUpg.custo;
                }
            });
        }
        
        console.log("Jogo carregado!");
    }
}

// elementos DOM
const body = document.querySelector("body");
const botao = document.getElementById("cookie-button");
const almas = document.getElementById("cookie-count");
const cpsEl = document.getElementById("cps");
// const bonusEl = document.getElementById("bonus"); // Removido, pois o bônus agora é flutuante


    // addeventlistener para adicionar a função de capturar almas para o botão
botao.addEventListener("click", function(event) {
    moedas += almasporclique;
    contagem++;
    // atualiza UI
    updateUI();

    if (contagem === 10) {
        moedas += bonus;
        contagem = 0;
        console.log(contagem);
        // Cria um novo elemento para o bônus flutuante
        const floatingBonus = document.createElement("div");
        floatingBonus.textContent = `+${bonus} bônus!`;
        floatingBonus.classList.add("floating-bonus");
        
        // Define a posição inicial (onde o clique ocorreu)
        floatingBonus.style.left = `${event.clientX}px`;
        floatingBonus.style.top = `${event.clientY}px`;
        
        // Adiciona ao corpo do documento para posicionamento absoluto
        body.appendChild(floatingBonus);

        // Aplica a animação (o CSS já define a transição)
        // A animação é feita por classes para melhor performance e separação de responsabilidades
        setTimeout(() => {
            floatingBonus.classList.add("show-and-move");
        }, 10); // Pequeno atraso para garantir que o CSS inicial seja aplicado

        // Remove o elemento após a animação
        setTimeout(() => {
            floatingBonus.remove();
        }, 1500); // 1500ms é a duração da animação no CSS
        
        updateUI();
    } else { 
        // O bônus normal de clique não precisa de animação flutuante.
    }
});

// upgrades disponíveis (Removido, movido para o topo)

// atualiza interface (contadores e rótulos de botões)
function updatePerClickUI() {
    const perClickEl = document.getElementById("perclick");
    if (perClickEl) perClickEl.textContent = almasporclique;
}
function updateUI() {
    if (almas) almas.textContent = moedas;
    if (cpsEl) cpsEl.textContent = cpsValue;
    updatePerClickUI();

    // A lógica de desabilitar os botões foi removida para permitir que o alerta de 'moedas insuficientes' seja exibido.
}


// Função para resetar o jogo
function resetGame() {
    if (confirm("Tem certeza que deseja reiniciar o progresso?")) {
        localStorage.removeItem('cryclickerSave');
        window.location.reload();
    }
}

// Liga o botão de reset
const resetButton = document.getElementById("reset-button");
if (resetButton) {
    resetButton.addEventListener("click", resetGame);
}

// ligar listeners para os botões de upgrade dinamicamente
upgradesporsegundo.forEach(upg => {
    const btn = document.getElementById(upg.id);
    if (!btn) return; // pula se o botão não existir no HTML

    btn.addEventListener("click", function() {
        // ver se há moedas suficientes
        if (moedas >= upg.custo) {
            moedas -= upg.custo;
            cpsValue += upg.cps;    
            

            updateUI();
            console.log(`Comprado ${upg.id}: agora cps = ${cpsValue}, moedas = ${moedas}`);
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            alert("Moedas insuficientes!");
        }
    });
});

// rendimento automático por segundo
setInterval(function() {
    if (cpsValue > 0) {
        moedas += cpsValue;
        updateUI();
    }
}, 1000);

// Carrega o jogo antes de inicializar a UI
loadGame();

// inicializa UI
updateUI();

// Função para salvar o jogo
function saveGame() {
    const gameData = {
        moedas: moedas,
        cpsValue: cpsValue,
        bonus: bonus,
        almasporclique: almasporclique,
        upgradesporsegundo: upgradesporsegundo,
        upgradesbonus: upgradesbonus,
        upgradesalmasporclique: upgradesalmasporclique
    };
    localStorage.setItem('cryclickerSave', JSON.stringify(gameData));
    console.log("Jogo salvo!");
}

// Salva o jogo a cada 5 segundos
setInterval(saveGame, 5000);



upgradesbonus.forEach(upg => {
    const btn = document.getElementById(upg.id);
    if (!btn) return; // pula se o botão não existir no HTML

    btn.addEventListener("click", function() {
        // ver se há moedas suficientes
        if (moedas >= upg.custo) {
            moedas -= upg.custo;
            bonus += upg.maisbonus;

            updateUI();
            console.log(`Comprado ${upg.id}: agora bonus = ${bonus}, moedas = ${moedas}`);
            // Não precisa de updatePerClickUI aqui, pois updateUI já chama.
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            alert("Moedas insuficientes!");
        }
    });
});

updateUI();



// ligar listeners para os botões de upgrade dinamicamente
upgradesalmasporclique.forEach(upg => {
    const btn = document.getElementById(upg.id);
    if (!btn) return; // pula se o botão não existir no HTML

    btn.addEventListener("click", function() {
        // ver se há moedas suficientes
        if (moedas >= upg.custo) {
            moedas -= upg.custo;
            almasporclique += upg.apc;


            updateUI();
            console.log(`Comprado ${upg.id}: agora almas por clique = ${almasporclique}, moedas = ${moedas}`);
            // document.getElementById("perclick").textContent = almasporclique; // Removido, pois updateUI já chama updatePerClickUI()
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            alert("Moedas insuficientes!");
        }
    });
});

updateUI();

batalhaGrandeMestre.forEach(upg => {
    const btn = document.getElementById(upg.id);
    if (!btn) return; // pula se o botão não existir no HTML

    btn.addEventListener("click", function() {
        // ver se há moedas suficientes
        if (moedas >= upg.custo) {
            moedas -= upg.custo;
            almasporclique += upg.apc;
            updateUI();

            console.log(`Comprado ${upg.id}: agora almas por clique = ${almasporclique}, moedas = ${moedas}`);
            window.location.href = "batalha.html";
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            alert("Moedas insuficientes!");
        }
    });
});