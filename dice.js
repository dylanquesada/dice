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

function startGame(){
	var deck = createNewDeck();
	var newGame;
	while(newGame != "no"){
		deck = createNewDeck();
		while(deck.length > 20){
		deck = runBlackjack(deck);
		}
		newGame = prompt("Shuffle Time! Would you like to shuffle and replay? (yes or no)");
	}
}

startGame();

// function addImageToCard(deck){
// 	for (var i = 0; i < deck.length; i++) {
// 		deck[i].image = "cardImages/" + deck[i].value + "_of_" + deck[i].suit + ".png";
// 	}
// }

function runBlackjack(deck){
	deck = deck;
	let status = [];
	var playerHand = [];
	var dealerHand = [];
	status[0] = deck;
		for (var i = 0; i < numberOfCardsDealtToEachPlayer; i++) {
			playerHand[i] = drawOneCard(deck);
			deck = removeCardFromDeck(deck, playerHand[i]);
			status[0] = deck;
		}
		for (var i = 0; i < numberOfCardsDealtToEachPlayer; i++) {
			dealerHand[i] = drawOneCard(deck);
			deck = removeCardFromDeck(deck, dealerHand[i]);
			status[0] = deck;
		}
		if(dealerHand[0].value + dealerHand[1].value === 21){
			alert("Dealer Blackjack...");
			if(playerHand[0].value + playerHand[1].value === 21){
				alert("Push");
				return deck;
			}
			return deck;
		}
		status = playerTurn(playerHand, dealerHand, deck);
		deck = status[0];
		playerHand = status[1];
		if(checkHandForAce(playerHand) > 21){
			alert("Dealer Wins...");
			return deck;
		}
		dealerTurn(playerHand, dealerHand, deck);
		return deck;

}

function dealerTurn(playerHand, dealerHand, deck){
	printFinalDealerPlay(dealerHand);
	printPlayerHand(playerHand);
	let value = 0;
	let cardIndex;
	while(value < 17){
		value = 0;
		for (var i = 0; i < dealerHand.length; i++) {
			value += dealerHand[i].value;
			if(dealerHand[i].name === "A"){
				value -= 10;
			}
		}
		if(value < 17){
			cardIndex = drawOneCard(deck);
			dealerHand.push(cardIndex);
			removeCardFromDeck(deck, cardIndex);
			printFinalDealerPlay(dealerHand);
			if(value > 21){
				value = checkHandForAce(dealerHand);
			}
			if(value > 21){
				return alert("Dealer busts! Player Wins!");
			}
		}
		else if(value >= 17){
			return compareFinalHands(playerHand, dealerHand);
		}
	}
	return compareFinalHands(playerHand, dealerHand);
}

function compareFinalHands(playerHand, dealerHand){
	let playerTotal = 0;
	let dealerTotal = 0;
	for (var i = 0; i < playerHand.length; i++) {
		playerTotal += playerHand[i].value;
		if(playerTotal > 21){
			playerTotal = checkHandForAce(playerTotal);
		}
	}
	for (var i = 0; i < dealerHand.length; i++) {
		dealerTotal += dealerHand[i].value;
		if (dealerTotal > 21) {
			dealerTotal = checkHandForAce(dealerTotal);
		}
	}
	if(playerTotal > dealerTotal){
		alert("Player Wins!");
	}
	else if(playerTotal === dealerTotal){
		alert("Push!");
	}
	else{
		alert("Dealer Wins...");
	}
}

function playerTurn(playerHand, dealerHand, deck){
	var stay = false;
	var bust = false;
	var status = [];
	status[0] = deck;
	status[1] = playerHand;
	while(checkHandForAce(playerHand) < 21 && !stay && !bust){
		printDealerCard(dealerHand);
		printPlayerHand(playerHand);
		let choice = prompt("Enter 'hit' or 'stay'");
		switch (choice){	
			case "hit":
				let cardIndex = drawOneCard(deck);
				playerHand.push(cardIndex);
				deck = removeCardFromDeck(deck, cardIndex);
				status[0] = deck;
				status[1] = playerHand;
				if(checkHandForAce(playerHand) > 21){
					printFinalDealerPlay(dealerHand);
					bust = true;
					printPlayerHand(playerHand);
					alert("Player Busts");
					return status;
				}
				checkHandForAce(playerHand);
				break;
			case "stay":
				checkHandForAce(playerHand);
				stay = true;
				status[0] = deck;
				status[1] = playerHand;
				return status;
				break;
			default:
				status[0] = deck;
				status[1] = playerHand;
				alert("Wrong input.");
		}
	}
}

function calculateHand(hand){
	let value = 0;
	for (var i = 0; i < hand.length; i++) {
		value += hand[i].value;
	}
	return value;
}

function checkHandForAce(hand){
	let ace = 0;
	let value = 0;
	for (var i = 0; i < hand.length; i++) {
		value += hand[i].value;
		if(hand[i].name === "A"){
			ace++;
		}
	}
	while(value > 21 && ace > 0) {
		ace--;
		value = value - 10;
	}
	return value;
}

function printDealerCard(dealerHand){
	console.log("Dealer's cards:");
	console.log("Hole card : X of X");
	for (var i = 1; i < dealerHand.length; i++) {
		console.log(dealerHand[i].name + " of " + dealerHand[i].suit);
	}
}

function printPlayerHand(playerHand){
	let value = 0;
	console.log("Player's cards:")
	for (var i = 0; i < playerHand.length; i++) {
		console.log(playerHand[i].name + " of " + playerHand[i].suit);
		value += playerHand[i].value;
	}
	console.log("Player Total: " + checkHandForAce(playerHand));
}

function printFinalDealerPlay(dealerHand){
	let value = dealerHand[0].value;
	console.log("Dealer's cards:");
	console.log("Hole card : " + dealerHand[0].name + " of " + dealerHand[0].suit);
	for (var i = 1; i < dealerHand.length; i++) {
		console.log(dealerHand[i].name + " of " + dealerHand[i].suit);
		value += dealerHand[i].value;
	}
	console.log("Dealer Total: " + checkHandForAce(dealerHand));
}

function removeCardFromDeck(deck, card){
	for (var i = 0; i < deck.length; i++){
		if(card === deck[i]){
			deck.splice(i, 1);
			return deck;
		}
	}
}

function createNewDeck(){
	var objectDeck = [];
	let counter = 0;
	for (var i = 0; i < fullDeck.length; i++) {
		for (var j = 0; j < fullDeck[i].length; j++) {
			let number;
			if(	fullDeck[i][j] === "J" ||
				fullDeck[i][j] === "Q" ||
				fullDeck[i][j] === "K"){
				number = 10;
			}
			else if(fullDeck[i][j] === "A"){
				number = 11;
			}
			else{
				number = parseInt(fullDeck[i][j]);
			}
			let card = {
				value: number,
				name: fullDeck[i][j],
				suit: suits[i],
				image: "",
				//fullName: "" + name + " of " + suits[i]
			};
			objectDeck[counter] = card;
			counter++;

		}
	}
	return objectDeck;
}

function rollDie(sides){
	let output = Math.floor(Math.random() * sides);
	return output;
}

function deal(numberOfPlayers, deck){
	let result = [];
	result[2] = deck;
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

function displayDeck(deck){
	for (var i = 0; i < deck.length; i++) {		
	console.log(deck[i]);
	}
}

function drawOneCard(deck){
	let cardIndex = rollDie(deck.length);
	return deck[cardIndex];
}


