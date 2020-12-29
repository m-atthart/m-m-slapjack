let sock = null;

let playerName = null;

let cardReceived = null;

function writeEvent(text) {
    document.querySelector("#messageBox").innerHTML = `<h1>${text}</h1>`;
}

function connectToServer() {
    sock = io();
    sock.emit("setName", playerName);
    sock.on("message", writeEvent);
    sock.on("cardFlip", card => {
        cardReceived = Date.now();
        if (card) {
            document.querySelector("#play-card").innerHTML = `${card.value}${card.suit}`;
        } else {
            document.querySelector("#play-card").innerHTML = ``;
        }
        //document.querySelector("#play-card").innerHTML = `${card.getHTML()}`; add card css
    });
}

function flipCard() {
    sock.emit("flipCard");
}

function slap() {
    cardSlapped = Date.now();
    timeToSlap = cardSlapped - cardReceived;
    sock.emit("slap", timeToSlap);
}

document.querySelector("#slap").addEventListener("click", slap);
document.querySelector("#flip-card").addEventListener("click", flipCard);
document.querySelector("#name-submit").addEventListener("click", () => {
    if (document.querySelector("#name").value) {
        playerName = document.querySelector("#name").value;
        document.querySelector(".name-card").style.display = "none";
        document.querySelector(".play-card").style.display = "block";
        connectToServer();
    } else {
        writeEvent("better name idiot");
    }
});
