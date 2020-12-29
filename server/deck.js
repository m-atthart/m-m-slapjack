const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

class Deck {
    constructor(shuffled = false, cards = testDeck()) {
        this.cards = cards;
        if (shuffled) {
            this.shuffle();
        }
    }

    get numberOfCards() {
        return this.cards.length;
    }

    cardAtIdx(idx) {
        return this.cards.slice(idx)[0]
    }

    pop() {
        return this.cards.shift();
    }

    push(card) {
        this.cards.push(card);
    }

    pushToFront(card) {
        this.cards.unshift(card);
    }

    pushDeck(deck) {
        for (let i = 0; i < deck.numberOfCards; i++) {
            this.push(deck.cards[i]);
        }
        deck.cards = [];
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }

    cutInTwo() {
        let deckMidpoint = Math.ceil(this.numberOfCards / 2)
        return [this.cards.slice(0, deckMidpoint), this.cards.slice(deckMidpoint, this.numberOfCards)]
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
    }

    getHTML() {
        const cardDiv = document.createElement("div");
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        return cardDiv;
    }
}

function freshDeck() {
    return SUITS.flatMap((suit) => {
        return VALUES.map((value) => {
            return new Card(suit, value);
        });
    });
}

function testDeck() {
    let newDeck = [];
    newDeck.push(new Card("♠", "10"));
    newDeck.push(new Card("♠", "8"));
    return newDeck;
}

module.exports = Deck;
