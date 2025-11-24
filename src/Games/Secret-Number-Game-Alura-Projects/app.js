let listNumbers = [];
let endNumber = 10;
let secretNumber = secretNumberGeneretion();
let tentativas = 0;

textPrimary();

function text (tag,texto) {
    let title = document.querySelector (tag,);
    title.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function textPrimary() {
    text ('h1','Jogo do numero secreto');
    text ('p','Escolha um numero entre 1 e 10'); 
}
function secretNumberGeneretion(){
    let secretNumbernew = parseInt(Math.random() * endNumber + 1);
    let listAmount = listNumbers.length;

    if (listAmount == endNumber) {
        listNumbers = [];
    }

    if (listNumbers.includes(secretNumberGeneretion)) {
        secretNumber()
    }else{
        return secretNumbernew
    }

}
function testKick() {
    let kick = document.querySelector('input').value;   
    tentativas ++;
    clear();
    if (secretNumber == kick) {
        let palavra = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        text('h1', 'You win!');
        text('p', `você descobriu com ${tentativas} ${palavra}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (secretNumber > kick){
            text('p', `O numero secreto é maior`);
        }else{
            text('p', `O numero secreto é menor`);
    
        }
    }
}

function clear() {
   kick = document.querySelector('input');
   kick.value = ''; 
}
function resetGame() {
    clear();
    secretNumber = secretNumberGeneretion();
    textPrimary();
    tentativas = 0;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}