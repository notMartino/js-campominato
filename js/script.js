// Funzione calcolo numeri random esplosivi
function getRandomNumbers (min, max){
    var max = max - min + 1;
    var randomNumbers = [];

    for (let i = 0; i < 16; i++) {
        // Variante con for
        // randomNumbers[i] = Math.floor(Math.random() * max) + min;
        // if (i > 0) {
        //     for (let j = 0; j < i; j++) {
        //         if (randomNumbers[j] == randomNumbers[i]) {
        //             i--;
        //             break;
        //         }
        //     }
        // }

        // Variante con includes()
        var randomNumb = Math.floor(Math.random() * max) + min;
        if (randomNumbers.includes(randomNumb)) {
            i--;
        }else{
            randomNumbers[i] = randomNumb; 
        }
    } 
    return randomNumbers;
}

// Funzione di richiesta difficoltà e modifica impostazioni di gioco in base ad essa
function getDifficolta() {
    var countError = false;
    do{
        if (countError) {
            alert('ERRORE: la difficoltà deve corrispondere ad un numero da 1 a 3!');
        }
        countError = true;

        difficolta = parseInt(prompt('Scegli la difficoltà (1 / 2 / 3): '));
    }while(difficolta != 1 && difficolta != 2 && difficolta != 3);

    var max = 100;
    var difficoltaWord = 'Easy';

    if (difficolta == 2) {
        max = 80;
        difficoltaWord = 'Normal';
    }
    else if(difficolta == 3){
        max = 50;
        difficoltaWord = 'Hard';
    }

    console.log('Difficoltà: ' + difficoltaWord  + '(' + difficolta + ')');
    var slotTentativi = max - 16;

    return [max, slotTentativi];
}

// Funzione principale CampoMinato
function campoMinato() {
     // Richiamo la funzione scelta difficoltà
     var arrayDifficolta = getDifficolta();
     var min = 1;
     var max = arrayDifficolta[0]; // Range max
     var slotTentativi = arrayDifficolta[1]; // Num. tentativi

    // Richiamo la funzione dei num. random
    var numeriComputer = getRandomNumbers(min, max);
    console.log('Numeri Computer: ' + numeriComputer);

    // pointsCounter(slotTentativi, numeriComputer, max);
}

// Avvio il gioco quando premo il pulsante START
var btnStart = document.getElementById('campoMinato');
btnStart.addEventListener('click', campoMinato);
