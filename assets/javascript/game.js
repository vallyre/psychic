(function() {
	"use strict";
	//declare global elements
	const startBtn = document.getElementById('startBtn');
	const mainGame = document.getElementById('mainGame');
	const messageArea = document.getElementById('messageArea');
	const guessPrompt = document.getElementById('guessPrompt');
	const winsDisplay = document.getElementById('wins');
	const lossesDisplay = document.getElementById('losses');
	const guessesLeftDisplay = document.getElementById('guessesLeft');
	const lettersGuessedDisplay = document.getElementById('lettersGuessed');
	const theLetterDisplay = document.getElementById('theLetter');
	const theLetterContainerDisplay = document.getElementById('theLetterContainer');
	let targetLetter, guessesLeft, lettersGuessed;
	let wins = 0;
	let losses = 0;
	let guessArray = [];

	startBtn.addEventListener('click', function() {runGame();});

	const keypressListener = function(e) {
		displayText(messageArea, '');
		evaluateGuess(onlyLetters(e.key));
	};

	function displayValue(element, value) {return element.innerText = value;}
	function displayText(element, text) {return element.textContent = text;}

	function runGame() {
		displayText(messageArea, '');
		displayText(theLetterDisplay, '');
		theLetterContainerDisplay.classList.add('hide');
		guessArray = [];
		generateLetter();
		window.addEventListener('keypress', keypressListener, false);
		guessesLeft = 10;
		displayValue(winsDisplay, wins);
		displayValue(lossesDisplay, losses);
		displayValue(guessesLeftDisplay, guessesLeft);
		displayValue(lettersGuessedDisplay, guessArray);
		mainGame.classList.remove('hide');
		guessPrompt.classList.remove('hide');
		startBtn.classList.add('hide');
	}

	function generateLetter() {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		targetLetter = chars.substr(Math.floor(Math.random() * 26), 1);
	}

	function onlyLetters(key) {
		const ucKey = key.toUpperCase();
		const letters = /^[A-Z]+$/;
		if (ucKey.match(letters)) {
			if (guessArray.includes(ucKey)) {
				displayText(messageArea, 'You already guessed that guess again');
				return 'dup';
			} else {
				guessArray.push(ucKey);
				displayValue(lettersGuessedDisplay, guessArray.join(' '));
				return ucKey;
			}
		} else {
			return displayText(messageArea, 'Only letters please...');
		}
	}

	function evaluateGuess(guess) {
		if (guess === 'dup') {return;};
		if (guess === targetLetter) {
			displayText(messageArea, 'you win! play another');
			guessPrompt.classList.add('hide');
			wins++;
			displayValue(winsDisplay, wins);
			theLetterContainerDisplay.classList.remove('hide');
			displayValue(theLetterDisplay, targetLetter);
			endGame();
		} else if (guessesLeft === 1){
			guessesLeft--;
			displayValue(guessesLeftDisplay,guessesLeft);
			losses++;
			displayValue(lossesDisplay, losses);
			guessPrompt.classList.add('hide');
			theLetterContainerDisplay.classList.remove('hide');
			displayValue(theLetterDisplay, targetLetter);
			displayText(messageArea, 'out of guesses, play another?');
			endGame();
		} else {
			displayText(messageArea, 'nope try again');
			guessesLeft--;
			displayValue(guessesLeftDisplay, guessesLeft);
		}
	}

	function endGame() {
		startBtn.classList.remove('hide');
		guessPrompt.classList.add('hide');
		window.removeEventListener('keypress', keypressListener, false);
	}

})();
