currentCard = null;
lastCard = null;
secondLastCard = null;

function updateCards(player) {
    secondLastCard = lastCard;
    lastCard = currentCard;
    currentCard = getCardFromDeck(player);
}

io.on("connection", (sock) => {});

io.on("card", updateCards(sock));
