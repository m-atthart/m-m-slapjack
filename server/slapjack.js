import Deck from "./deck.js";

let p1Deck = new Deck();
let p2Deck = new Deck();
let playDeck = new Deck();

let royal = null;
let firstCard = null;
let secondCard = null;
let thirdCard = null;
let fourthCard = null;

function checkSlap(deck) {
    let currentCard = null;
    let lastCard = null;
    let secondLastCard = null;

    if (deck.length > 0) {
        currentCard = deck.slice(-1)[0];
    }
    if (deck.length > 1) {
        lastCard = deck.slice(-2)[0];
    }
    if (deck.length > 2) {
        secondLastCard = deck.slice(-3)[0];
    }

    if (currentCard && currentCard.value == "10") {
        return true;
    } else if (currentCard, lastCard && currentCard.value == lastCard.value) {
        return true;
    } else if (currentCard, secondLastCard && currentCard.value == secondLastCard.value) {
        return true;
    } else {
        return false;
    }
}

function roundEnd(winner) {
    royal = null;
    firstCard = null;
    secondCard = null;
    thirdCard = null;
    fourthCard = null;

    winner.deck.pushDeck(playDeck);
}

io.on("connection", (sock) => {});

sock.on("slap", checkSlap(playDeck));
