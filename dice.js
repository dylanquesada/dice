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

runBlackjack();

function runBlackjack(){
	let deck = createNewDeck();
	var playerHand = [];
	var dealerHand = [];
		for (var i = 0; i < numberOfCardsDealtToEachPlayer; i++) {
			playerHand[i] = drawOneCard(deck);
			deck = removeCardFromDeck(deck, playerHand[i]);
		}
		for (var i = 0; i < numberOfCardsDealtToEachPlayer; i++) {
			dealerHand[i] = drawOneCard(deck);
			deck = removeCardFromDeck(deck, dealerHand[i]);
		}
		let status = playerTurn(playerHand, dealerHand, deck);
		deck = status[0];
		playerHand = status[1];
		dealerTurn(playerHand, dealerHand, deck);

}

function dealerTurn(playerHand, dealerHand, deck){
	printFinalDealerPlay(dealerHand);
	printPlayerHand(playerHand);
	let value = 0;
	while(value < 17){
		value = 0;
		for (var i = 0; i < dealerHand.length; i++) {
			value += dealerHand[i].value;
		}
		if(value < 17){
			dealerHand.push(drawOneCard(deck));
			if(value > 21){
				value = checkHandForAce(dealerHand);
			}
			if(value > 21){
				return alert("Dealer busts! Player Wins!");
			}
		}
		else if(value >= 17){
			return alert(compareFinalHands(playerHand, dealerHand));
		}
	}
	return alert(compareFinalHands(playerHand, dealerHand));
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
	var status = [];
	while(calculateHand(playerHand) < 21 && !stay){
		printDealerCard(dealerHand);
		printPlayerHand(playerHand);
		let choice = prompt("Enter 'hit' or 'stay'");
		switch (choice){	
			case "hit":
				playerHand.push(drawOneCard(deck));
				status[0] = deck;
				if(calculateHand(playerHand) > 21){
					printFinalDealerPlay(dealerHand);
					alert("Player Busts");
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
		}
	}
}

function calculateHand(hand){
	let value = 0;
	for (var i = 0; i < hand.length; i++) {
		value =+ hand[i].value;
	}
	return value;
}

function checkHandForAce(hand){
	let ace = false;
	let value = 0;
	for (var i = 0; i < hand.length; i++) {
		value += hand.value;
		if(hand[i].name === "A"){
			ace = true;
		}
		value += hand[i].value;
		if(value > 21 && ace){
			value -= 10;
		}
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
	console.log(value);
}

function printFinalDealerPlay(dealerHand){
	console.log("Dealer's cards:");
	console.log("Hole card : " + dealerHand[0].name + " of " + dealerHand[0].suit);
	for (var i = 1; i < dealerHand.length; i++) {
		console.log(dealerHand[i].name + " of " + dealerHand[i].suit);
	}
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
				number = 1;
			}
			else{
				number = parseInt(fullDeck[i][j]);
			}
			let card = {
				value: number,
				name: fullDeck[i][j],
				suit: suits[i],
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




// // function draw(deck){
// // 	let cardArray = [];
// // 	let cardIndex = rollDie(deck[0].length + deck[1].length + deck[2].length + deck[3].length);	
// // 	if(cardIndex < deck[0].length){
// // 		cardArray = [cardIndex, 0];
// // 		return cardArray;
// // 	}
// // 	else{
// // 		cardIndex = cardIndex - deck[0].length;
// // 	}
// // 	if(cardIndex < deck[1].length){
// // 		cardArray = [cardIndex, 1];
// // 		return cardArray;
// // 	}
// // 	else{
// // 		cardIndex = cardIndex - deck[1].length;
// // 	}
// // 	if(cardIndex < deck[2].length){
// // 		cardArray = [cardIndex, 2];
// // 		return cardArray;
// // 	}
// // 	else{
// // 		cardIndex = cardIndex - deck[2].length;
// // 		cardArray = [cardIndex, 3];
// // 		return cardArray;
// // 	}
// // }

// function assignCardValue(deck, cardIndex){

// }

// function removeCardFromDeck(cardArray, oldDeck){
// 	let suitIndex = cardArray[1];
// 	let cardPositionInSuit = cardArray[0]; 
// 	var newDeck = [];
// 	var newDeckCounter = 0;
// 	for (var i = 0; i < oldDeck.length; i++) {
// 		if(i != suitIndex){
// 			newDeck[i] = oldDeck[i];
// 		}
// 		else{
// 			newDeck[i] = [];
// 		}
// 	}
// 	for (var i = 0; i < oldDeck[suitIndex].length; i++) {
// 		if(i != cardPositionInSuit){
// 			newDeck[suitIndex][newDeckCounter] = oldDeck[suitIndex][i];
// 			newDeckCounter++;
// 		}
// 	}
// 	return newDeck;
// }



// function getCardLabel(deck, cardIndex){
// 	let cardLabel = deck[cardIndex[1]][cardIndex[0]] + " of " + suits[cardIndex[1]];
// 	return cardLabel;
// }

// function displayCard(deck, cardIndex){
// 	let card = deck[cardIndex[1]][cardIndex[0]] + " of " + suits[cardIndex[1]];
// 	console.log(card);
// 	return card;
// }

// function getCardValue(deck, cardIndex){
// 	let value;
// 	if(deck[cardIndex[1]][cardIndex[0]] === "J" ||
// 		deck[cardIndex[1]][cardIndex[0]] === "Q" ||
// 		deck[cardIndex[1]][cardIndex[0]] === "K"){
// 		value = 10;
// 	}
// 	else if(deck[cardIndex[1]][cardIndex[0]] === "A"){
// 		value = 1;
// 	}
// 	else{
// 		value = parseInt(deck[cardIndex[1]][cardIndex[0]]);
// 	}
// 	return value;
// }

// function displayPlayerHand(currentStatus){
// 	let cardsArray = currentStatus[0];
// 	let deck = currentStatus[3];
// 	let cardOne = cardsArray[0];
// 	let cardTwo = cardsArray[1];
// 	console.log("Player's hand: " + displayCard(deck, cardOne) + " " + displayCard(deck, cardTwo));
// }

// function menu(){
// 	// if(prompt("Ready to play Blackjack? (yes/no)") === "yes"){}
// 		let currentGame = deal(2, fullDeck);
// 		displayPlayerHand(currentGame);


	
// }

// menu();
// // console.log(getCardValue(fullDeck, draw()));
// // console.log(getCardValue(fullDeck, draw()));
// // console.log(getCardValue(fullDeck, draw()));
// // console.log(getCardValue(fullDeck, draw()));
// // function runBlackjack(){
// // 	switch(){
// // 		case blackjack:

// // 			break;
// // 		case playerHit:

// // 			break;
// // 		case playerStay:

// // 			break;
// // 		case 

// // }
// //to do now
// 	// displayCard to console
// 	// create a display for hands (players, dealers)
// 	// work through gameplay
// 	// 	purse operations
// 	// 		win
	// 		lose
	// 		push
	// 		blackjack
//to do later
	//add used cards pile for counting help
