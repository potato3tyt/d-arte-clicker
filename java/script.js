//variáveis do código
let moedas = 0;
let contagem = 0;


//constantes do código
const botao = document.getElementById("cookie-button");
const almas = document.getElementById("cookie-count");
const cps = document.getElementById("cps");


//addeventlistener para adicionar a função de capturar almas para o botão
botao.addEventListener("click", function() {
    moedas ++;
    contagem ++;
    almas.textContent = moedas;

    if (contagem === 10) {
        moedas = moedas + 10;
        contagem = 0; 
        console.log(contagem);
        document.getElementById("bonus").textContent = "+10 bônus!";
        document.getElementById("cookie-count").textContent = moedas;
    }
    else{ 
        document.getElementById("bonus").textContent = "";
    }
});

const upgradesporsegundo = [
    { id: "ASacerdotisa", custo: 10, cps: 1 },
    { id: "ALua", custo: 600, cps: 5 },
    { id: "OMago", custo: 1500, cps: 10 },
    { id: "OLouco", custo: 4000, cps: 120 },
    { id: "ODiabo", custo: 9000, cps: 50 },
    { id: "OHierofante", custo: 19000, cps: 70 },
];

ASacerdotisa.addEventListener("click", function() {
    console.log(cps);
    if (moedas >= upgradesporsegundo.custo) {
        cps = cps + upgradesporsegundo.cps;
        moedas = moedas - upgrade.custo;
        document.getElementById("cookie-count").textContent = moedas;
        document.getElementById("cps").textContent = cps + " cps";
    }
    
    console.log(upgradesporsegundo);
});