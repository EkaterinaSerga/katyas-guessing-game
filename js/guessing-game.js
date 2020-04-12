/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    return Math.ceil(Math.random()*100)
}

function shuffle(arr) {
    let m = arr.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
        console.log(arr)
    }

    return arr;
}

class Game {
    constructor() {
       this.playersGuess = null;
       this.pastGuesses = [];
       this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    isLower() {
        return this.playersGuess < this.winningNumber;
    }

    playersGuessSubmission(num) {
        if (num < 1 || num > 100 || isNaN(num) === true) {
            // throw new Error('That is an invalid guess.')
            return 'That is an invalid guess.';
        }

        else {
            this.playersGuess = num;
        }

        return this.checkGuess();
    }

    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            this.pastGuesses.length = 5;
            return "🏆YOU WIN!!!🏆"
        }
        if (this.pastGuesses.includes(this.playersGuess)) {
            return "You have already guessed that number."
        }
        if (this.playersGuess !== this.winningNumber && !this.pastGuesses.includes(this.playersGuess)) {
            document.querySelector(`#guess${this.pastGuesses.push(this.playersGuess)}`).textContent = this.playersGuess;
        }
        if (this.pastGuesses.length === 5) {
            return "YOU LOSE 💩💩💩"
        }
        
        if (this.difference() < 10) {
            return "You\'re burning up! 🔥🔥🔥"
        }
        if (this.difference() < 25) {
            return "You\'re lukewarm 🔥🔥"
        }
        if (this.difference() < 50) {
            return "You\'re a bit chilly ❄️❄️"
        }
        if (this.difference() < 100) {
            return "You\'re ice cold! ❄️❄️❄️"
        }
    }

    provideHint() {
        let arr = [];
        arr.push(this.winningNumber)
        
        let anotherNumber1 = generateWinningNumber(); 
        if (anotherNumber1 !== this.winningNumber) {
            arr.push(anotherNumber1);
        }
        else {
            ++anotherNumber1;
            arr.push(anotherNumber1);
        }

        let anotherNumber2 = generateWinningNumber(); 
        if (anotherNumber2 !== this.winningNumber) {
            arr.push(anotherNumber2);
        }
        else {
            ++anotherNumber2;
            arr.push(anotherNumber2);
        }
        return shuffle(arr);
    }
}

function newGame() {
    let newInstance = new Game();
    return newInstance;
}

function playGame() {
    const game = newGame();
    const button = document.querySelector('#submit-button');
    const hintButton = document.querySelector('#hint-button');

    button.addEventListener('click', function() {
        const playersGuess = +document.querySelector('.your-guess').value;
        document.querySelector('.your-guess').value = '';
        
        if (game.pastGuesses.length === 5) {
            document.querySelector('#current-status').textContent = "The Game is over, click 'Play again' to start another one"
        }
        else {
            document.querySelector('#current-status').textContent = game.playersGuessSubmission(playersGuess);
        }
    }
    );

    hintButton.addEventListener('click', function() {
        document.querySelector('#current-status').textContent = `The winning number is(was) one of these: ${game.provideHint().join(' , ')}`;
        console.log('ddddd')
    });
}

document.querySelector('#play-again').addEventListener('click', function() {
    location.reload()
})

playGame();