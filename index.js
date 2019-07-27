var Word = require("./word.js");
var inquirer = require("inquirer");

// letters entry
var alphArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var gameWords = [
    "environment",
    "variable",
    "coding",
    "bootcamp",
    "weather",
    "astrology",
    "bamboozled",
    "esquire",
    "opacity",
    "govenor",
    "hydrant",
    "sample",
    "pocket",
    "sprout",
    "subsequent",
    "probable",
    "fierce",
    "originate",
    "umbrella",
    "obnoxious",
    "ambiguous",
    "overjoyed",
    "habitual",
    "acoustic",
    "conspire"
];

// Pick Random index from gameWords array
var randomIndex = Math.floor(Math.random() * gameWords.length);
var randomWord = gameWords[randomIndex];

// Pass random word through Word constructor
var chosenWord = new Word(randomWord);

var makeNewWord = false;

// Array for guessed letters
var wrongLetter = [];
var rightLetter = [];

// Guesses left
var guessesLeft = 10;

function playGame() {
    // Generates new word for Word constructor if true
    if (makeNewWord) {
        // Selects random gameWords array
        var randomIndex = Math.floor(Math.random() * gameWords.length);
        var randomWord = gameWords[randomIndex];

        // Passes random word through the Word constructor
        chosenWord = new Word(randomWord);

        makeNewWord = false;
    }

    // TestS if a letter guessed is correct
    var wordComplete = [];
    chosenWord.objectArr.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([{
                type: "input",
                message: "Please type in a letter to see if it's in the word I chose",
                name: "userinput"
            }])
            .then(function(input) {
                if (!alphArray.includes(input.userinput) ||
                    input.userinput.length > 1
                ) {
                    console.log("\nPlease select a letter, any letter from A to Z.\n");
                    playGame();
                } else {
                    if (
                        wrongLetter.includes(input.userinput) ||
                        rightLetter.includes(input.userinput) ||
                        input.userinput === ""
                    ) {
                        console.log("\nYou have chosen that letter already, (or I didn't catch that)\n");
                        playGame();
                    } else {
                        // Checks if guess is correct
                        var wordCheckArray = [];

                        chosenWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        chosenWord.objectArr.forEach(wordCheck);
                        if (wordCheckArray.join("") === wordComplete.join("")) {
                            console.log("\nIncorrect guess\n");

                            wrongLetter.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");

                            rightLetter.push(input.userinput);
                        }

                        chosenWord.log();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log(
                            "Letters Guessed: " + wrongLetter.join(" ") + "\n"
                        );

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function
                            playGame();
                        } else {
                            console.log("I'm terribly sorry, the word I chose was, umm... I forgot that quick!\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer
        .prompt([{
            type: "list",
            message: "Would you care to:",
            choices: ["Play Again", "Leave Game"],
            name: "restart"
        }])
        .then(function(input) {
            if (input.restart === "Play Again") {
                makeNewWord = true;
                wrongLetter = [];
                rightLetter = [];
                guessesLeft = 10;
                playGame();
            } else {
                return;
            }
        });
}

playGame();