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
            continue;
        }
        randomNumbers[i] = randomNumb; 
        listaNumPC.children[i].innerHTML += randomNumbers[i];
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

        // var difficolta = parseInt(prompt('Scegli la difficoltà (1 / 2 / 3): '));
        var difficolta = parseInt(document.getElementById('difficolta').value);
    }while(difficolta != 1 && difficolta != 2 && difficolta != 3);


    switch (difficolta) {
        case 2: // Difficoltà 2: normale
            max = 80;
            difficoltaWord = 'Normal';
            break;
        case 3: // Difficoltà 3: difficile
            max = 50;
            difficoltaWord = 'Hard';
            break;
        default: // Difficoltà 1: default
            var max = 100;
            var difficoltaWord = 'Easy';
            break;
    }

    console.log('Difficoltà: ' + difficoltaWord  + '(' + difficolta + ')');
    var slotTentativi = max - 16;

    // Torno il range, i tentativi a disposizione dell'utente, e la parola associata alla difficoltà
    return [max, slotTentativi, difficoltaWord];
}

// -------------------------------------------------------
// Funzione di verifica punti/sconfitta/vittoria
function pointsCounter(slotTentativi, numeriComputer, max, difficoltaWord) {

    // Lista ul li (che mi farà vedere i numeri in pagina)
    var listaNumUtente = document.getElementById('numUser');
    // Div che mi farà vedere WIN/LOSE e PTS
    var winLoseScore = document.getElementById('winLosePoints');
    winLoseScore.innerHTML = '';
    winLoseScore.style.opacity = '0';
    
    // Variante verifica con while
    // var exit = false;
    
    // var i = 0;

    var btnCalcola = document.getElementById('calcola');
    var continuaInserimento = true;

    // Usiamo il listener al posto del while
    // while (i < slotTentativi && !exit) {
    btnCalcola.addEventListener('click', function () {

        // Var booleana che diventa falsa quando esco (WIN/LOSE) e finche non ho ripremuto start
        if (continuaInserimento) {
            // Valore all'interno di input text
            var inputNumUtente = parseInt(document.getElementById('numeroUtente').value);

            // Passo il valore ad un'altra var
            var numTemporaneo = inputNumUtente;
            console.log('Hai inserito: ' + numTemporaneo);

            // Verifico che il numero inserito non sia già stato inserito
            if (numsUtente.includes(numTemporaneo)) {
                console.log('Errore! Hai già inseito questo numero: ' +  numTemporaneo);
              //  alert('Errore! Hai già inserito questo numero: ' +  numTemporaneo);

                // Pulisco il valore di input text
                inputNumUtente = 'none';
                console.log(inputNumUtente);
                i--;
            }
            // Verifico che il numero inserito non sià fuori range, oppure non sia un numero
            else if (numTemporaneo > max || numTemporaneo < 1 || isNaN(numTemporaneo) ) {
                console.log('Errore: inserisci un numero (da 1 a ' + max + ')!');
                alert('Errore: inserisci un numero (da 1 a ' + max + ')!');

                // Pulisco il valore di input text
                inputNumUtente.value = '';
                i--;
            }
            // Altrimenti quando abbiamo un inserimento corretto
            else{
                numsUtente[i] = numTemporaneo;
                // Inserisco il valore in lista html
                listaNumUtente.innerHTML += '<li class="green-text">' + numsUtente[i] + '</li>';
                // Lo faccio vedere
                listaNumUtente.children[i].style.opacity = '1';
                // Pulisco il valore di input text 
                inputNumUtente = '';

                // Verifico se il numero inserito è esplosivo
                if (numeriComputer.includes(numsUtente[i])) {
                    console.log('KABOOOOM!!');
                    console.log('Hai totalizzato: ' + i + ' PUNTI');
                    console.log('Numeri corretti usati: ' + numsUtente);
                    // exit = true; (con while)

                    // Cambio la classe dell'ultimo perchè so che è quello errato e aggiungo la bombetta
                    listaNumUtente.children[i].className = 'rose-text';
                    listaNumUtente.children[i].innerHTML += ' <i class="fas fa-bomb"></i>';

                    // Inserisco nel div WIN/LOSE, PTS e Difficoltà
                    winLoseScore.innerHTML += '<h3 class="rose-text">YOU LOSE</h3>';
                    winLoseScore.innerHTML += '<h5>Score: ' + i + ' Pts</h5>'; 
                    winLoseScore.innerHTML += '<h5>Mode: ' + difficoltaWord + '</h5>'; 
                    winLoseScore.style.opacity = '1';

                    // Rendo visibile la lista dei numeri Computer
                    var listaNumPC = document.getElementById('numPC');
                    listaNumPC.style.visibility ="visible";
                    for (let i = 0; i < 16; i++) {
                        listaNumPC.children[i].style.opacity = '1';
                        listaNumPC.children[i].style.margin = '10px 20px';
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                    continuaInserimento = false;
                }
                // Se arrivo alla fine dei tentativi ho vinto
                else if (i == (slotTentativi - 1)) {
                    console.log('Hai Vinto!! Hai totalizzato: ' + (i + 1) + ' PUNTI');

                    // Inserisco nel div WIN/LOSE, PTS e Difficoltà
                    winLoseScore.innerHTML += '<h3 class="green-text">YOU WIN</h3>';
                    winLoseScore.innerHTML += '<h5>Score: ' + i + ' Pts</h5>'; 
                    winLoseScore.innerHTML += '<h5>Mode: ' + difficoltaWord + '</h5>'; 
                    winLoseScore.style.opacity = '1';
                    for (let i = 0; i < 16; i++) {
                        listaNumPC.children[i].style.opacity = '1';
                        listaNumPC.children[i].style.margin = '10px 20px';
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                    continuaInserimento = false;
                }
            }
        }
        i++;
    });
    
    // }
    
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
    numsUtente = [];
    i = 0;
    // Pulizia elementi in lista numeri PC e li rendo invisibili
    var listaNumComputer = document.getElementById('numPC');
    if(listaNumComputer.children[0].innerHTML != ''){
        for (let i = 0; i < 16; i++) {
            listaNumComputer.children[i].innerHTML = '';
            listaNumComputer.children[i].style.opacity = '0';
        }
    }

    // Pulizia elementi in lista numeri User
    var listaNumUser = document.getElementById('numUser');
    listaNumUser.innerHTML = '';
    
    // Richiamo la funzione scelta difficoltà che mi ritorna array
    var arrayDifficolta = getDifficolta();
    var min = 1; // Range min
    var max = arrayDifficolta[0]; // Range max
    var slotTentativi = arrayDifficolta[1]; // Num. tentativi
    var difficoltaWord = arrayDifficolta[2]; // Difficolta partita

    // Richiamo la funzione dei num. random
    var numeriComputer = getRandomNumbers(min, max);
    console.log('Numeri Computer: ' + numeriComputer);

    // Richiamo la funzione di inserimento numeri utente e verifica points/win/lose
    pointsCounter(slotTentativi, numeriComputer, max, difficoltaWord);
    
    // window.scrollBy(0, 200);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Array che conterrà i numeri User
var numsUtente;
var i;
// Avvio il gioco quando premo il pulsante START
var btnStart = document.getElementById('campoMinato');
btnStart.addEventListener('click', campoMinato);
