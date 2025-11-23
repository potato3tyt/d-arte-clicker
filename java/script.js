//variáveis do código
let moedas = 0;
let contagem = 0;
let cpsValue = 0;
let bonus = 10;
let almasporclique = 1;

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

// upgrades disponíveis
const upgradesporsegundo = [
    { id: "ASacerdotisa", custo: 10, cps: 1 },
    { id: "ALua", custo: 700, cps: 5 },
    { id: "OMago", custo: 1500, cps: 10 },
    { id: "OLouco", custo: 4000, cps: 120 },
    { id: "ODiabo", custo: 9000, cps: 50 },
    { id: "OHierofante", custo: 19000, cps: 70 },
];

// atualiza interface (contadores e rótulos de botões)
function updatePerClickUI() {
    const perClickEl = document.getElementById("perclick");
    if (perClickEl) perClickEl.textContent = almasporclique;
}
function updateUI() {
    if (almas) almas.textContent = moedas;
    if (cpsEl) cpsEl.textContent = cpsValue;
    updatePerClickUI();

    // atualiza rótulos dos botões de upgrade se existirem
    upgradesporsegundo.forEach(upg => {
        const btn = document.getElementById(upg.id);
        if (btn) {
            btn.disabled = moedas < upg.custo;
        }
    });
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

            // opcional: aumenta custo para próxima compra (escala simples)
            upg.custo = Math.max(1, Math.floor(upg.custo * 1.15));

            updateUI();
            console.log(`Comprado ${upg.id}: agora cps = ${cpsValue}, moedas = ${moedas}`);
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            const confirmarcompra = confirm("Moedas insuficientes!");
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

// inicializa UI
updateUI();

const upgradesbonus = [
    { id: "Bruxa", custo: 10, maisbonus: 5 },
    { id: "CartomanteEsmeralda", custo: 1400, maisbonus: 10 },
    { id: "MágicoMaior", custo: 3000, maisbonus: 20 }
];

upgradesbonus.forEach(upg => {
    const btn = document.getElementById(upg.id);
    if (!btn) return; // pula se o botão não existir no HTML

    btn.addEventListener("click", function() {
        // ver se há moedas suficientes
        if (moedas >= upg.custo) {
            moedas -= upg.custo;
            bonus += upg.maisbonus;

            // opcional: aumenta custo para próxima compra (escala simples)
            upg.custo = Math.max(1, Math.floor(upg.custo * 1.15));

            updateUI();
            console.log(`Comprado ${upg.id}: agora bonus = ${bonus}, moedas = ${moedas}`);
            // Não precisa de updatePerClickUI aqui, pois updateUI já chama.
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            const confirmarcompra = confirm("Moedas insuficientes!");
        }
    });
});

updateUI();

const upgradesalmasporclique = [
    { id: "PalhaçaNarizinho", custo: 10, apc: 5 },
    { id: "Alpha", custo: 18000, apc: 10 },
    { id: "GrandeMestre", custo: 38000, apc: 30 }
];

// ligar listeners para os botões de upgrade dinamicamente
upgradesalmasporclique.forEach(upg => {
    const btn = document.getElementById(upg.id);
    if (!btn) return; // pula se o botão não existir no HTML

    btn.addEventListener("click", function() {
        // ver se há moedas suficientes
        if (moedas >= upg.custo) {
            moedas -= upg.custo;
            almasporclique += upg.apc;

            // opcional: aumenta custo para próxima compra (escala simples)
            upg.custo = Math.max(1, Math.floor(upg.custo * 1.15));

            updateUI();
            console.log(`Comprado ${upg.id}: agora almas por clique = ${almasporclique}, moedas = ${moedas}`);
            // document.getElementById("perclick").textContent = almasporclique; // Removido, pois updateUI já chama updatePerClickUI()
        } else {
            // feedback simples se quiser (console ou UI)
            console.log("Sem moedas suficientes para comprar", upg.id);
            const confirmarcompra = confirm("Moedas insuficientes!");
        }
    });
});

updateUI();

