// Javascript for Hangman Game

var wins = document.getElementById("numWins");
var displayedWord = document.getElementById("currentWord");
var guessesRem = document.getElementById("guessesRemaining");
var wrongGuesses = document.getElementById("lettersGuessed");

// wins.textContent = 0;
// guessesRem.textContent = 15;

var wordArray = [
"sterling",
"lana",
"mallory",
"cheryl",
"pam",
"cyril",
"krieger"
];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wordBlanks = "";
var wordToGuess = "";
var lettersInWordToGuess = [];
var numBlanks = 0;
var losses = 0;

wrongGuesses = [];
var formedWord = [];
wins = 0;

function gameBegin() {
    // wins.textContent = 0;
    // wrongGuesses.textContent = 0;
    guessesRem = 15;
    displayedWord = [];
    formedWord = [];
    wrongGuesses = [];

    document.getElementById("numWins").innerHTML = wins;
    document.getElementById("guessesRemaining").innerHTML = guessesRem;

    wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)];
    lettersInWordToGuess = wordToGuess.split("");
    numBlanks = lettersInWordToGuess.length;
    console.log("wordToGuess: " + wordToGuess);
    console.log("lettersInWordToGuess: " + lettersInWordToGuess);
    console.log("numBlanks: " + numBlanks);

    for (var i=0; i < numBlanks; i++) {
        formedWord.push("_");
    }

    displayedWord = formedWord;
    // displayedWord.textContent = formedWord;
    document.getElementById("currentWord").innerHTML = displayedWord.join(" ");

    console.log("Displayed Word: " + displayedWord);
    console.log("-------------------");

}

function letterCheck(letter) {
    var letterInWord = false;
    var letterInAlphabet = false;

    var letter = letter.toLowerCase();

    for(var i = 0; i < numBlanks; i++) {
        if(lettersInWordToGuess[i] === letter) {
            letterInWord = true;
        }
    }

    for(var j = 0; j < 26; j++) {
        if(alphabet[j] === letter) {
            letterInAlphabet = true;
        }
    }

    if(letterInAlphabet) {
        if(letterInWord) {
            for(i = 0; i < numBlanks; i++){
                if(wordToGuess[i] === letter && displayedWord[i] === "_"){
                    displayedWord[i] = letter;
                    guessesRem--; 

                    console.log("letter: " + letter);
                    console.log("displayedWord[i]: " + displayedWord[i]);
                    console.log("guessesRem: " + guessesRem);
                    console.log("Wrong Letters Guessed: " + wrongGuesses);
                    break;
                }
            }
        }

        else {
            guessesRem--; 
            wrongGuesses.push(letter);
            console.log("letter: " + letter);
            console.log("guessesRem: " + guessesRem);
            console.log("Wrong Letters Guessed: " + wrongGuesses);
        }
    }

    console.log("letterInWord: " + letterInWord);
    console.log("letterInAlphabet: " + letterInAlphabet);

    // document.getElementById("currentWord").innerHTML = displayedWord.join(" ");
}

function selectionEnd() {
    console.log("Displayed Word: " + displayedWord);
    console.log("letters in word to guess: " + lettersInWordToGuess);
    console.log("-------------------");

    document.getElementById("currentWord").innerHTML = displayedWord.join(" ");
    document.getElementById("lettersGuessed").innerHTML = wrongGuesses.join(" ");
    document.getElementById("guessesRemaining").innerHTML = guessesRem;

    if(lettersInWordToGuess.join(" ") === displayedWord.join(" ")){
        wins++;

        var audio2 = document.getElementById("myAudio2");
        audio2.play();

        // document.getElementById("currentWord").innerHTML = displayedWord.join(" ");
        alert("You guessed the character name: " + displayedWord.join("") + ". You win!!");
        alert("Guess another character name.");
        console.log("Number of Wins: " + wins);
        gameBegin();
    }

    else if(guessesRem === 0){
        losses++;
        alert("You ran out of guesses.  Try another name.");        
        gameBegin();
    }

}


gameBegin();


document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userChoice = event.key.toLowerCase();

    // Alerts the key the user pressed (userGuess).
    // alert("User Selection: " + userChoice);
    // console.log("User Selection: " + userChoice);

    letterCheck(userChoice);
    selectionEnd();
}
