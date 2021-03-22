let order = [];
let clickedOrder = [];
let score = 0;


var musica=document.getElementById("musica");
var somGameover=document.getElementById("somGameover");
var somExplosao=document.getElementById("somExplosao");
var somResgate=document.getElementById("somResgate");
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);

/**
 * 0 - verde
 * 1 - vermelho
 * 2 - amarelo
 * 3 - azul
 */

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}

/**
 * Cria ordem aleatoria de cores
 */
/*
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
*/

/**
 * Cria ordem aleatoria de cores
 */
async function shuffleOrder(){
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    sleep(2000);
    for (let i in order) {
        let elementColor = createColorElement(order[i]);        
        await addAndRemoveClass(elementColor);         
    }
}

async function addAndRemoveClass(element){   
    return new Promise((resolve, reject)=>{     
                    setTimeout(() => {
                        element.classList.add('selected');
                        console.log("add class elemento: ", element);                                                
                        setTimeout(() => {
                            removeClass(element); 
                            resolve();
                        }, 750);
                    });                       
                }); 
};

let removeClass = (element) => {
    element.classList.remove('selected');
    console.log("remove class elemento: ", element);
}

/**
 * Acende a próxima cor
 */
/*
function lightColor(element, number) {
    number = number * 500; 
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');      
    });
}
*/

/**
 * checa se os botoes clicados são os mesmos da ordem gerada no jogo
 */
let checkOrder = () => {
    for (const i in clickedOrder) {
        if (clickedOrder[i] != order[i] ) {
            somExplosao.play();
            gameOver();
            return;            
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

/**
 * função para o clique do usuario
 */
let click = (color) => {
    somResgate.play();
    clickedOrder[clickedOrder.length] = color;
    
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected'); 
        checkOrder();
    }, 250);
}

/**
 * função que retorna a cor
 */
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if ( color == 1){
        return red;
    } else if ( color == 2){
        return yellow;
    } else if ( color == 3){
        return blue;
    }
}

/**
 * função para o nosso proximo nivel do jogo
 */
let nextLevel = () => {
    score++;
    shuffleOrder();

}

/**
 * função para game over
 */
let gameOver = () => {
    musica.pause();
    somGameover.play();
    document.getElementById('gameoverbox').style.display = 'flex';
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = `Pontuação: ${score}!<br>Você perdeu o jogo!<br>Clique para iniciar um novo jogo`;
    order = [];
    clickedOrder = [];
    //playGame();
}

/**
 * função de início do jogo
 */
let playGame = () => {
    document.getElementById('gameoverbox').style.display = 'none';
    
    somGameover.pause();
    //Música em loop    
    musica.play();

    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

/**
 * eventos de clique
 */
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();

/*
green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));
*/