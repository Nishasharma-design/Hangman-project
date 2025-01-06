import { wordList } from './wordList.js';

let word = wordList[Math.floor(Math.random() * wordList.length)];

const keysBoard = document.querySelector(".keyboard");
const displayLetter = document.querySelector(".displaying__Alphabet");
const letterGuess = document.querySelector(".guess_letter b");
const hangmanImage = document.getElementById('hangman_images');

let guessedLetters = [];
let attempts = 0;
const totalAttempts = 6;
let guessedWord = Array(word.length).fill("_");
displayLetter.textContent = guessedWord.join(" "); 


const gameLogic = (guess, button) => {
    if (guessedLetters.includes(guess)) {
        return;
    }
    
    guessedLetters.push(guess);
    button.disabled = true;
    

    if (word.includes(guess)) {
        // Update guessed word with correct letters
        word.split("").forEach((char, index) => {
            if (char === guess) {
                guessedWord[index] = char;
            }
        });
        console.log(guessedWord);
        displayLetter.textContent = guessedWord.join(" ");
    
     } else {
         attempts++;
         letterGuess.textContent = `${attempts} / ${totalAttempts}`;
         hangmanImage.src = `images/${attempts}.jpg`;
         }

         displayLetter.textContent = guessedWord.join(" ");
         //button.disabled = true;

         if (guessedWord.join('') === word) {
                 alert("Congratulations!");
        } else if (attempts >= totalAttempts) {
            alert("Game Over!");
        }
      return word;   
    };

  //Using "textContent" will return the complete text content, including the hidden text. However, using "innerText" will only return the visible text content, excluding the hidden text. 

function keyboardButtons(keysBoard) {
for (let i = 65; i <= 90; i++) {
    const button = document.createElement("button");
    const char = String.fromCharCode(i);
    keysBoard.appendChild(button);
    button.appendChild(document.createTextNode(char)); 
    button.addEventListener("click", () => gameLogic(char, button));
};
};

keyboardButtons(keysBoard);


const replayGame = document.getElementById("replayGame");

replayGame.addEventListener("click", () => {
    attempts = 0;
    guessedLetters = [];
    word = wordList[Math.floor(Math.random() * wordList.length)];
    guessedWord = Array(word.length).fill("_");
    
    
    displayLetter.textContent = guessedWord.join(" ");
    letterGuess.textContent = `${attempts} / ${totalAttempts}`;
    hangmanImage.src = "images/0.jpg";

    const buttons = keysBoard.querySelectorAll("button");
    buttons.forEach(button => (button.disabled = false));
});