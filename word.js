var Letter = require("./letter.js");

function Word(answer) {
    //Letter objects array
    this.objectArr = [];

    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.objectArr.push(letter);
    }

    this.log = function() {
        answerLog = "";
        for (var i = 0; i < this.objectArr.length; i++) {
            answerLog += this.objectArr[i] + " ";
        }
        console.log(answerLog + "\n☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆\n");
    };

    this.userGuess = function(input) {
        for (var i = 0; i < this.objectArr.length; i++) {
            this.objectArr[i].guess(input);
        }
    };
}

module.exports = Word;