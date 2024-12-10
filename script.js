const divKeyboard = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guess_letter b")
const displayWord = document.querySelector(".displaying__Alphabet"); 

let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
    // selecting random word and hint from wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint_letter b").innerText = hint;
    displayWord.innerHTML = word.split("").map(() => `<li class="alphabet"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    /*checking if clickedLetter is included in the currentWord */
    if(currentWord.includes(clickedLetter)) {
        /*showing all correct letters on the word display */
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                displayWord.querySelectorAll("li")[index].innerText = letter;
                displayWord.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessCount++;
    }
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}

//Creating Keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    divKeyboard.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();