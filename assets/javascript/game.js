 
//Special thanks to my fiend Keith who helped me pare this down and understand objects and conditional statements much better.

var hangmanArea = document.getElementById("hangman-area");
var hangmanPrompt = document.getElementById("hangman-prompt");
var hangmanWord = document.getElementById("hangman-word");
var hangmanCounter = document.getElementById("hangman-counter");
var hangmanGuesses = 12;
var guessArea = document.getElementById("guess-area");
var previousGuesses = document.getElementById("previous-guesses");
var winCounter = document.getElementById("win-counter");
var wins = 0;
var newWord = document.getElementById("new-word");
var wordArray = [
	"apple",
	"orange",
	"pear",
	"apricot",
	"watermelon",
	"guava",
	"avocado",
	"plum", 
	"tomato"
	];
var j;
var wordInPlay;
var correct;
var counter;
var guessedTable;
var guessedLetterString;

//initialize page//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none";
newWord.style.display = "none";
winCounter.style.display = "none";

//set up a new game//
function setupNewGame(){
	j = Math.floor(Math.random() * wordArray.length)
	wordInPlay = wordArray[j];
	correct = false;
	counter = 0;
	hangmanGuesses = 12;
	guessedTable = {};
	guessedLetterString = "";
	previousGuesses.textContent = guessedLetterString;
	document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	document.getElementById("wins").textContent = wins;
	underscore();
}

//start game//
window.onload = function (){
	document.addEventListener("keydown", startGame, false);
}

function startGame(event){
	document.removeEventListener("keydown", startGame, false);
	hangmanPrompt.textContent = "This is your word, try to guess it before you run out of guesses!";
	hangmanWord.style.display = "block";
	hangmanCounter.style.display = "block";
	guessArea.style.display = "block";
	winCounter.style.display = "block";
	newWord.style.display = "block";
	setupNewGame();
	//all functions based on key presses go under here//
	document.onkeydown = function(event){
		var key = event.key.toLowerCase();
		if (event.keyCode >= 65 && event.keyCode <= 90){
			if (!alreadyGuessed(key)){
				if (wordInPlay.includes(key)){
					correctGuess(key);
				} else {
					wrongGuess(key);
				}
			}
		}
		winCounting(event);
	}
};

//function that turns the length of the word in play into underscores//
function underscore(){
	hangmanWord.innerHTML = "";
	for (i = 0; i < wordInPlay.length; i++){
		var underscore = document.createElement("span");
		var newId = "underscore" + [i]
		underscore.setAttribute("id", newId);
		underscore.textContent = "_ ";
		hangmanWord.appendChild(underscore);
	}
}

//this function displays correctly guessed letters in the word blank//
function correctGuess(key){
	console.log(key);
	for(i = 0; i < wordInPlay.length; i++){
		if (key === wordInPlay[i]){
			var letter = document.getElementById("underscore"+i);
			console.log("correct");
			letter.textContent = wordInPlay[i];
			counter++;
			console.log("counter:"+counter);
		}
	}
}

//count down wrong guesses//
function wrongGuess(key){
	for(i = 0; i < wordInPlay.length; i++){
		if (key !== wordInPlay[i]){
			correct = false;
		}
	}
	if (correct === false){
		console.log("incorrect")
		hangmanGuesses--;
		document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	}
};

//win counter function
function winCounting(event){
		if (counter === wordInPlay.length){
			console.log("win");
			alert("You Win!");
			wins++;
			document.getElementById("wins").textContent = wins;
		} else if (hangmanGuesses === 0){
			console.log("lose");
			alert("You Lose!");
		}
	}

//display already guessed letters//
function alreadyGuessed(key){
	var guessed = guessedTable[key];
	if(!guessedTable[key]){
		guessedTable[key] = true;
		guessedLetterString += key.toUpperCase() + " ";
	}
	previousGuesses.textContent = guessedLetterString;
	return guessed;
}

//reset button
newWord.onclick = function reStartGame(event){
	setupNewGame();
}
