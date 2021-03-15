// Funzione calcolo numeri random esplosivi
function getRandomNumbers (min, max){
    var max = max - min + 1;
    var randomNumbers = [];
    var listaNumPC = document.getElementById('numPC');

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
            listaNumPC.children[i].innerHTML += randomNumbers[i];
            setTimeout (()=> {
                listaNumPC.children[i].style.opacity = '1';
            },1000);
        }
    }

    // Ritorno i numeri esplosivi
    return randomNumbers;
}

// -------------------------------------------------------
// Funzione di richiesta difficoltà e modifica impostazioni di gioco in base ad essa
function getDifficolta() {
    var countError = false;

    // Ciclo che impedisce inserimento difficoltà non conforme 
    do{
        if (countError) {
            alert('ERRORE: la difficoltà deve corrispondere ad un numero da 1 a 3!');
        }
        countError = true;

        difficolta = parseInt(prompt('Scegli la difficoltà (1 / 2 / 3): '));
    }while(difficolta != 1 && difficolta != 2 && difficolta != 3);

    // Difficoltà 1: default
    var max = 100;
    var difficoltaWord = 'Easy';

    // Difficoltà 2: normale
    if (difficolta == 2) {
        max = 80;
        difficoltaWord = 'Normal';
    }
    // Difficoltà 3: difficile
    else if(difficolta == 3){
        max = 50;
        difficoltaWord = 'Hard';
    }

    console.log('Difficoltà: ' + difficoltaWord  + '(' + difficolta + ')');
    var slotTentativi = max - 16;

    // Torno il range e i tentativi a disposizione dell'utente
    return [max, slotTentativi];
}

// -------------------------------------------------------
// Funzione di verifica punti/sconfitta/vittoria
function pointsCounter(slotTentativi, numeriComputer, max) {
    var numsUtente = [];
    var listaNumUtente = document.getElementById('numUser');

    // Variante verifica con while
    var exit = false;
    var i = 0;

    while (i < slotTentativi && !exit) {
        var numTemporaneo = parseInt(prompt('Inserisci un numero da 1 a ' + max+ ': '));
        console.log('Hai inserito: ' + numTemporaneo);

        // Verifico che il numero inserito non sia già stato inserito
        if (numsUtente.includes(numTemporaneo)) {
            console.log('Errore! Hai già inseito questo numero: ' +  numTemporaneo);
            alert('Errore! Hai già inseito questo numero: ' +  numTemporaneo);
            i--;
        }
        // Verifico che il numero inserito non sià fuori range, oppure non sia un numero
        else if (numTemporaneo > max || numTemporaneo < 1 || isNaN(numTemporaneo) ) {
            console.log('Errore: inserisci un numero (da 1 a ' + max + ')!');
            alert('Errore: inserisci un numero (da 1 a ' + max + ')!');
            i--;
        }
        // Altrimenti quando abbiamo un inserimento corretto
        else{
            numsUtente[i] = numTemporaneo;
            listaNumUtente.innerHTML += '<li class="green-text">' + numsUtente[i] + '</li>';
            listaNumUtente.children[i].style.opacity = '1';

            // Verifico se il numero inserito è esplosivo
            if (numeriComputer.includes(numsUtente[i])) {
                console.log('KABOOOOM!!');
                console.log('Hai totalizzato: ' + i + ' PUNTI');
                console.log('Numeri corretti usati: ' + numsUtente);
                exit = true;
                listaNumUtente.children[i].className = 'rose-text';
                listaNumUtente.children[i].innerHTML += ' <i class="fas fa-bomb"></i>';
            }
            // Se arrivo alla fine dei tentativi ho vinto
            else if (i == (slotTentativi - 1)) {
                console.log('Hai Vinto!! Hai totalizzato: ' + (i + 1) + ' PUNTI');
            }
        }
        i++;
    }

    // Variante verifica con for
    // for (let i = 0; i < slotTentativi; i++) {
    //     var numTemporaneo = parseInt(prompt('Inserisci un numero da 1 a ' + max+ ': '));
    //     console.log('Hai inserito: ' + numTemporaneo + ' ' + typeof numTemporaneo);
        
    //     if (numsUtente.includes(numTemporaneo)) {
    //         console.log('Errore! Hai già inseito questo numero: ' +  numTemporaneo);
    //         alert('Errore! Hai già inseito questo numero: ' +  numTemporaneo);
    //         i--;
    //     }
    //     else if (numTemporaneo > max || numTemporaneo < 1 || isNaN(numTemporaneo) ) {
    //         console.log('Errore: inserisci un numero (da 1 a ' + max + ')!');
    //         alert('Errore: inserisci un numero (da 1 a ' + max + ')!');
    //         i--;
    //     }
    //     else{
    //         numsUtente[i] = numTemporaneo;

    //         if (numeriComputer.includes(numsUtente[i])) {
    //             numsUtente.pop();
    //             console.log('KABOOOOM!!');
    //             console.log('Hai totalizzato: ' + i + ' PUNTI');
    //             console.log('Numeri buoni usati: ' + numsUtente);
    //             break;
    //         }
    //         else if (i == (slotTentativi - 1)) {
    //             console.log('Hai Vinto!! Hai totalizzato: ' + (i + 1) + ' PUNTI');
    //         }
    //     }
    // }    
}

// -------------------------------------------------------
// Funzione principale CampoMinato
function campoMinato() {
    var listaNumComputer = document.getElementById('numPC');
    if(listaNumComputer.children[0].innerHTML != ''){
        for (let i = 0; i < 16; i++) {
            listaNumComputer.children[i].innerHTML = '';
            listaNumComputer.children[i].style.opacity = '0';
        }
    }

    var listaNumUser = document.getElementById('numUser');
    listaNumUser.innerHTML = '';
    
    // Richiamo la funzione scelta difficoltà
    var arrayDifficolta = getDifficolta();
    var min = 1;
    var max = arrayDifficolta[0]; // Range max
    var slotTentativi = arrayDifficolta[1]; // Num. tentativi

    // Richiamo la funzione dei num. random
    var numeriComputer = getRandomNumbers(min, max);
    console.log('Numeri Computer: ' + numeriComputer);

    // Richiamo la funzione di inserimento numeri utente e verifica points/win/lose
    pointsCounter(slotTentativi, numeriComputer, max);
}

// Avvio il gioco quando premo il pulsante START
var btnStart = document.getElementById('campoMinato');
btnStart.addEventListener('click', campoMinato);
