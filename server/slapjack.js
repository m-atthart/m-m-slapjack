const Deck = require("./deck")

class SJGame {
    constructor(player1, p1Name, player2, p2Name) {
        this.players = [player1, player2];
        this.playerNames = [p1Name, p2Name];

        this.startDeck = new Deck();
        this.cutDeck = this.startDeck.cutInTwo();
        this.p1Deck = new Deck(false, this.cutDeck[0]);
        this.p2Deck = new Deck(false, this.cutDeck[1]);
        this.playDeck = new Deck(false, []);

        this.royal = null;
        this.placedRoyal = null;
        this.firstCard = null;
        this.secondCard = null;
        this.thirdCard = null;
        this.fourthCard = null;

        this.currentSlapped = null;
        this.p1TimeToSlap = null;
        this.p2TimeToSlap = null;
        this.recentlySlapped = null;

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
        if (player == this.players[0]) {
            return this.p1Deck;
        } else {
            return this.p2Deck;
        }
    }

    endRound(winner) {
        this.clearRoyals();
        this.clearSlaps();
        this.getPlayerDeck(winner).pushDeck(this.playDeck);
        setTimeout(() => this.players.forEach(player => player.emit("cardFlip", null)), 1000);
    }

    endGame(winner) {
        this.clearRoyals();
        this.clearSlaps();
        this.winner = winner;
        this.players.forEach(player => player.emit("cardFlip", null));
        if (winner == this.players[0]) {
            this.players.forEach(player => player.emit("message", `${this.playerNames[0]} won`));
        } else {
            this.players.forEach(player => player.emit("message", `${this.playerNames[1]} won`));
        }
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
        if (!this.checkSlap()) {
            if (this.p2Deck.numberOfCards == 0 && this.placedRoyal != this.players[1]) {
                this.endGame(this.playerNames[0]);
            } else if (this.p1Deck.numberOfCards == 0 && this.placedRoyal != this.players[0]) {
                this.endGame(this.playerNames[1]);
            } else if (this.royal, this.firstCard && this.royal.value == "J") {
                this.endRound(this.lastMove);
            } else if (this.royal, this.secondCard && this.royal.value == "Q") {
                this.endRound(this.lastMove);
            } else if (this.royal, this.thirdCard && this.royal.value == "K") {
                this.endRound(this.lastMove);
            } else if (this.royal, this.fourthCard && this.royal.value == "A") {
                this.endRound(this.lastMove);
            }
        } else {
            if (this.royal, this.firstCard && this.royal.value == "J") {
                this.lastMove = "pause";
                this.recentlySlapped = 0;
                setTimeout(() => {
                    if (this.recentlySlapped == 0) {
                        this.endRound(this.lastmove);
                    }
                });
            } else if (this.royal, this.secondCard && this.royal.value == "Q") {
                this.lastMove = "pause";
                this.recentlySlapped = 0;
                setTimeout(() => {
                    if (this.recentlySlapped == 0) {
                        this.endRound(this.lastmove);
                    }
                });
            } else if (this.royal, this.thirdCard && this.royal.value == "K") {
                this.lastMove = "pause";
                this.recentlySlapped = 0;
                setTimeout(() => {
                    if (this.recentlySlapped == 0) {
                        this.endRound(this.lastmove);
                    }
                });
            } else if (this.royal, this.fourthCard && this.royal.value == "A") {
                this.lastMove = "pause";
                this.recentlySlapped = 0;
                setTimeout(() => {
                    if (this.recentlySlapped == 0) {
                        this.endRound(this.lastmove);
                    }
                });
            }
        }
    }

    flipCard(player) {
        if (this.lastMove != player && this.lastMove != "pause") {
            if (!this.currentSlapped) {
                let nextCard = this.getPlayerDeck(player).pop();
                if (["J", "Q", "K", "A"].includes(nextCard.value)) {
                    this.clearRoyals();
                    this.royal = nextCard;
                    this.placedRoyal = player;
                    this.lastMove = player;
                } else {
                    if (this.royal) {
                        if (["Q", "K", "A"].includes(this.royal.value) && this.firstCard) {
                            if (["K", "A"].includes(this.royal.value) && this.secondCard) {
                                if (["A"].includes(this.royal.value) && this.thirdCard) {
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
                        if (this.royal.value == "J" && this.firstCard) {
                            this.lastMove = player;
                        } else if (this.royal.value == "Q" && this.secondCard) {
                            this.lastMove = player;
                        } else if (this.royal.value == "K" && this.thirdCard) {
                            this.lastMove = player;
                        } else if (this.royal.value == "A" && this.fourthCard) {
                            this.lastMove = player;
                        }
                    } else {
                        this.lastMove = player;
                    }
                }
                this.playDeck.push(nextCard);
            } else if (this.currentSlapped && this.currentSlapped != player) {
                this.endRound(this.currentSlapped);
            }
            this.players.forEach(player => player.emit("cardFlip", this.playDeck.cardAtIdx(-1)));
            this.checkEnd();
            console.log("PlayDeck");
            console.log(this.playDeck.cards);
            console.log("P1Deck");
            console.log(this.p1Deck.cards);
            console.log("P2Deck");
            console.log(this.p2Deck.cards);
        }
    }

    slap(player, timeToSlap) {
        if (this.checkSlap()) {
            this.currentSlapped = player;
            if (player == this.players[0] && !this.p1TimeToSlap) {
                this.p1TimeToSlap = timeToSlap;
            } else if (player == this.players[1] && !this.p2TimeToSlap) {
                this.p2TimeToSlap = timeToSlap;
            }
            if (this.p1TimeToSlap && this.p2TimeToSlap) {
                if (this.p1TimeToSlap < this.p2TimeToSlap) {
                    this.endRound(1);
                } else {
                    this.endRound(2);
                }
            }
            this.recentlySlapped = 1;
        } else {
            this.playDeck.pushToFront(this.getPlayerDeck(player).pop());
        }
        this.players.forEach(player => player.emit("cardFlip", this.playDeck.cardAtIdx(-1)));
        this.checkEnd();
    }
}

module.exports = SJGame;
