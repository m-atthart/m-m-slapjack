function writeEvent(text) {
    document.querySelector("#messageBox").innerHTML = `<h1>${text}</h1>`;
}

//const sock = io();
//let player = null;

//sock.on("message", writeEvent);
//sock.on("winner", (winner) => {
//    displayWinMessage(winner);
//});

/*
cardReceived = null;

sock.on("cardflip", card => {
    setStartTime();
    displayCard(card);
});

function setStartTime() {
    cardReceived = Date.now();
}

function slap() {
    cardSlapped = Date.now();
    timeToSlap = cardSlapped - cardReceived;
    sock.emit("slap", timeToSlap);
}

document.querySelector("#slap").addEventListener("click", slap);
*/
