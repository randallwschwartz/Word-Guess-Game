// Javascript for Hangman Game

var wins = document.getElementById("numWins");
var displayedWord = document.getElementById("currentWord");
var guessesRem = document.getElementById("guessesRemaining");
var wrongGuesses = document.getElementById("lettersGuessed");

// wins.textContent = 0;
// guessesRem.textContent = 15;

var wordArray = [
"sterling",
"mallory",
"cheryl",
"pam",
"cyril",
"krieger"
];

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

    var letter = letter.toLowerCase();

    for(var i = 0; i < numBlanks; i++) {
        if(lettersInWordToGuess[i] === letter) {
            letterInWord = true;
        }
    }

    if(letterInWord) {
        for(i = 0; i < numBlanks; i++){
            if(wordToGuess[i] === letter){
                displayedWord[i] = letter;
                guessesRem--; 

                console.log("letter: " + letter);
                console.log("displayedWord[i]: " + displayedWord[i]);
                console.log("guessesRem: " + guessesRem);
                console.log("Wrong Letters Guessed: " + wrongGuesses);
                // console.log("-------------------");  
                document.getElementById("currentWord").innerHTML = displayedWord.join(" ");
                document.getElementById("lettersGuessed").innerHTML = wrongGuesses.join(" ");
                document.getElementById("guessesRemaining").innerHTML = guessesRem;
            }
        }
    }

    else {
        guessesRem--; 
        wrongGuesses.push(letter);
        console.log("letter: " + letter);
        console.log("guessesRem: " + guessesRem);
        console.log("Wrong Letters Guessed: " + wrongGuesses);
        // console.log("-------------------");  
        document.getElementById("currentWord").innerHTML = displayedWord.join(" ");
        document.getElementById("lettersGuessed").innerHTML = wrongGuesses.join(" ");
        document.getElementById("guessesRemaining").innerHTML = guessesRem;
    }

    console.log("letterInWord: " + letterInWord);

    // displayedWord.textContent = formedWord;
    document.getElementById("currentWord").innerHTML = displayedWord.join(" ");
}

function selectionEnd() {
    console.log("Displayed Word: " + displayedWord);
    console.log("letters in word to guess: " + lettersInWordToGuess);
    console.log("-------------------");

    if(lettersInWordToGuess.join(" ") === displayedWord.join(" ")){
        wins++;
        alert("You guessed the word: " + displayedWord.join("") + ". You win!!");
        // document.getElementById('win-counter').innerHTML = winCounter;
        console.log("Number of Wins: " + wins);
        gameBegin();
    }

    else if(guessesRem === 0){
        losses++;
        // document.getElementById('lettersGuessed').innerHTML = "";
        alert("You ran out of guesses.  Try another word.");        
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
