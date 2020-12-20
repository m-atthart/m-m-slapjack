import Deck from "./deck.js";

export default class SJGame {
    constructor() {
        this.startDeck = new Deck();
        this.startDeck.shuffle();
        this.cutDeck = this.startDeck.cutInTwo();
        this.p1Deck = new Deck(this.cutDeck[0]);
        this.p2Deck = new Deck(this.cutDeck[1]);
        this.playDeck = new Deck([]);

        this.royal = null;
        this.placedRoyal = null;
        this.firstCard = null;
        this.secondCard = null;
        this.thirdCard = null;
        this.fourthCard = null;

        this.currentSlapped = null;
        this.p1TimeToSlap = null;
        this.p2TimeToSlap = null;

        this.lastMove = null;
        this.winner = null;
    }

    clearRoyals() {
        this.royal = null;
        this.placedRoyal = null;
        this.firstCard = null;
        this.secondCard = null;
        this.thirdCard = null;
        this.fourthCard = null;
    }

    clearSlaps() {
        this.currentSlapped = null;
        this.p1TimeToSlap = null;
        this.p2TimeToSlap = null;
    }

    getPlayerDeck(player) {
        if (player == 1) {
            return this.p1Deck;
        } else {
            return this.p2Deck;
        }
    }

    endRound(winner) {
        this.clearRoyals();
        this.clearSlaps();
        this.getPlayerDeck(winner).pushDeck(this.playDeck);
    }

    endGame(winner) {
        clearRoyals();
        clearSlaps();
        this.winner = winner;
    }

    checkSlap() {
        let currentCard = null;
        let lastCard = null;
        let secondLastCard = null;

        if (this.playDeck.numberOfCards > 0) {
            currentCard = this.playDeck.cardAtIdx(-1);
        }
        if (this.playDeck.numberOfCards > 1) {
            lastCard = this.playDeck.cardAtIdx(-2);
        }
        if (this.playDeck.numberOfCards > 2) {
            secondLastCard = this.playDeck.cardAtIdx(-3);
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

    checkEnd() {
        if (!this.checkSlap) {
            if (this.p2Deck.numberOfCards == 0 && this.placedRoyal != 2) {
                this.endGame(1);
            } else if (this.p1Deck.numberOfCards == 0 && this.placedRoyal != 1) {
                this.endGame(2);
            } else if (this.royal == "J" && this.firstCard) {
                this.endRound(lastMove);
            } else if (this.royal == "Q" && this.secondCard) {
                this.endRound(lastMove);
            } else if (this.royal == "K" && this.thirdCard) {
                this.endRound(lastMove);
            } else if (this.royal == "A" && this.fourthCard) {
                this.endRound(lastMove);
            }
        }
    }

    flipCard(player) {
        if (lastMove != player) {
            if (!this.currentSlapped) {
                nextCard = this.getPlayerDeck(player).pop();
                if (["J", "Q", "K", "A"].includes(nextCard)) {
                    this.clearRoyals();
                    this.royal = nextCard;
                    this.placedRoyal = player;
                    this.lastMove = player;
                } else {
                    if (this.royal) {
                        if (["Q", "K", "A"].includes(this.royal) && this.firstCard) {
                            if (["K", "A"].includes(this.royal) && this.firstCard, this.secondCard) {
                                if (["A"].includes(this.royal) && this.firstCard, this.secondCard, this.thirdCard) {
                                    this.fourthCard = nextCard;
                                } else {
                                    this.thirdCard = nextCard;
                                }
                            } else {
                                this.secondCard = nextCard;
                            }
                        } else {
                            this.firstCard = nextCard;
                        }
                    } else {
                        this.lastMove = player;
                    }
                }
                this.playDeck.push(nextCard);
            } else if (this.currentSlapped && this.currentSlapped != player) {
                this.endRound(currentSlapped);
            }
            this.checkEnd();
        } 
    }

    slap (player, timeToSlap) {
        if (this.checkSlap()) {
            currentSlapped = player;
            if (player == 1 && !p1TimeToSlap) {
                p1TimeToSlap = timeToSlap;
            } else if (player == 2 && !p2TimeToSlap) {
                p2TimeToSlap = timeToSlap;
            }
            if (p1TimeToSlap && p2TimeToSlap) {
                if (p1TimeToSlap < p2TimeToSlap) {
                    this.endRound(1);
                } else {
                    this.endRound(2);
                }
            }
        } else {
            this.playDeck.pushToFront(getPlayerDeck(player).pop());
        }
        this.checkEnd();
    }
}
