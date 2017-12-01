"use strict";


//Deck of cards
var hearts = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var spades = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var diamonds = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var clubs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var fullDeck = [hearts, spades, diamonds, clubs];




function displayDeck(deck){
	for (var j = 0; j < deck.length; j++) {
		for (var i = 0; i < deck[j].length; i++) {
		deck[j][i];
		}
		console.log(deck[j][i]);
	}
}	
function displayCard(cardIndex, oldDeck){

	console.log(cardIndex + " of " + suit);
}


function draw(){
	//random number from total number of cards left excluding the cards already in play.
	//exentually will need an arguement that has the number to be applied to the random 
	//number generator as well as the arrays with the available cards 
}



function removeCardFromDeck(cardIndex, oldDeck){
	var newDeck = [];
	var newDeckCounter = 0;
	// newDeck = oldDeck.splice(card, 1);
	for (var i = 0; i < oldDeck.length; i++) {
		if(i != cardIndex){
			newDeck[newDeckCounter] = oldDeck[i];
			newDeckCounter++;
		}
		// console.log(removeCardFromDeck(4, hearts));
	}
	return newDeck;
}

// function howManySides(numberOfCardsLeft){

// }

function rollDie(sides){
	let output = Math.ceil(Math.random() * sides);
	console.log(output);
}


// alert(removeCardFromDeck(3, hearts));

displayDeck(fullDeck);
console.log(removeCardFromDeck(7, hearts));
console.log();


//to do now
	// displayCard to console
	// create a display for hands (players, dealers)
	// work through gameplay
	// 	purse operations
	// 		win
	// 		lose
	// 		push
	// 		blackjack
//to do later
	//add used cards pile for counting help