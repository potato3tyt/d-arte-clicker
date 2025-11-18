//variáveis do código
let moedas = 0;
let contagem = 0;

//constantes do código
const botao = document.getElementById("cookie-button");
const almas = document.getElementById("cookie-count");

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

