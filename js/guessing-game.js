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

        if (num < 1 || num > 100 || typeof num !== 'number') {
            throw new Error('That is an invalid guess.')
            return 'That is an invalid guess.';
        }

        else {
            this.playersGuess = num;
        }

        return this.checkGuess();
    }

    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return "You Win!"
        }
        if (this.pastGuesses.includes(this.playersGuess)) {
            return "You have already guessed that number."
        }
        if (this.playersGuess !== this.winningNumber && !this.pastGuesses.includes(this.playersGuess)) {
            document.querySelector(`#guess${this.pastGuesses.push(this.playersGuess)}`).textContent = this.playersGuess;
        }
        if (this.pastGuesses.length === 5) {
            return "You Lose."
        }
        if (this.difference() < 10) {
            return "You\'re burning up!: less than 10 digits away"
        }
        if (this.difference() < 25) {
            return "You\'re lukewarm: less than 25 digits away"
        }
        if (this.difference() < 50) {
            return "You\'re a bit chilly: less than 50 digits away"
        }
        if (this.difference() < 100) {
            return "You\'re ice cold!"
        }
    }

    provideHint() {
        let arr = [];
        arr.push(this.winningNumber)
        arr.push(generateWinningNumber());
        arr.push(generateWinningNumber());
        return shuffle(arr);
    }
}

function newGame() {
    let newInstance = new Game();
    return newInstance;
}

function playGame() {
    const game = newGame();
    const button = document.querySelector('#submit-button')

    button.addEventListener('click', function() {
        const playersGuess = +document.querySelector('.your-guess').value;
        document.querySelector('.your-guess').value = '';
        document.querySelector('#current-status').textContent = game.playersGuessSubmission(playersGuess);
    }
    );

    document.querySelector('#hint').addEventListener('click', function() {
        document.querySelector('#current-status').textContent = toString(game.provideHint().join(','));
    });
}


document.querySelector('#play-again').addEventListener('click', function() {
    location.reload()
})

playGame();