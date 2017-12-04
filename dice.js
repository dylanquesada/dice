"use strict";


//Deck of cards

var numberOfDealers = 1;
var numberOfCardsDealtToEachPlayer = 2;
var hearts = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var spades = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var clubs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var diamonds = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["hearts", "spades", "clubs", "diamonds"];
var fullDeck = [hearts, spades, clubs, diamonds];


function deal(numberOfPlayers, deck){
	let result = [];
	let cardIndex;
	let dealtCards = [];
	for (var i = 0; i < (numberOfPlayers + numberOfDealers) * numberOfCardsDealtToEachPlayer; i++) {
		cardIndex = draw();
		deck = removeCardFromDeck(cardIndex, deck);
		dealtCards[i] = cardIndex;
	}
	// for (var k = 0; k < 2; k++) {
	// 		for (var l = 0; l < numberOfPlayers + numberOfDealers; l++) {
	// 		cardIndex = draw();
	// 		deck = removeCardFromDeck(cardIndex, deck);
	// 		dealtCards[k][l] = cardIndex;
	// 	}
	// }
	result[0] = dealtCards;
	result[1] = deck;
	console.log(dealtCards);
	return result;
}
// deal(1, fullDeck);
function displayDeck(deck){
	for (var i = 0; i < deck.length; i++) {		
	console.log(deck[i]);
	}
}

function draw(){
	let cardArray = [];
	let cardIndex = rollDie(fullDeck[0].length + fullDeck[1].length + fullDeck[2].length + fullDeck[3].length);	
	if(cardIndex < fullDeck[0].length){
		cardArray = [cardIndex, 0];
		return cardArray;
	}
	else{
		cardIndex = cardIndex - fullDeck[0].length;
	}
	if(cardIndex < fullDeck[1].length){
		cardArray = [cardIndex, 1];
		return cardArray;
	}
	else{
		cardIndex = cardIndex - fullDeck[1].length;
	}
	if(cardIndex < fullDeck[2].length){
		cardArray = [cardIndex, 2];
		return cardArray;
	}
	else{
		cardIndex = cardIndex - fullDeck[2].length;
		cardArray = [cardIndex, 3];
		return cardArray;
	}
}

function removeCardFromDeck(cardArray, oldDeck){
	let suitIndex = cardArray[1];
	let cardPositionInSuit = cardArray[0]; 
	var newDeck = [];
	var newDeckCounter = 0;
	for (var i = 0; i < oldDeck.length; i++) {
		if(i != suitIndex){
			newDeck[i] = oldDeck[i];
		}
		else{
			newDeck[i] = [];
		}
	}
	for (var i = 0; i < oldDeck[suitIndex].length; i++) {
		if(i != cardPositionInSuit){
			newDeck[suitIndex][newDeckCounter] = oldDeck[suitIndex][i];
			newDeckCounter++;
		}
	}
	return newDeck;
}

displayCard(fullDeck, draw());

function rollDie(sides){
	let output = Math.ceil(Math.random() * sides);
	return output;
}

function displayCard(deck, cardIndex){
	let card = deck[cardIndex[1]][cardIndex[0]] + " of " + suits[cardIndex[1]];
	console.log(card);
	return card;
}


function runBlackjack(){

}
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
