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

var numeriComputer = getRandomNumbers(1, 100);
console.log('Numeri Computer: ' + numeriComputer);

