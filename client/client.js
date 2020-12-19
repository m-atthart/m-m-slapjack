function writeEvent(text) {
    document.querySelector("#messageBox").innerHTML = `<h1>${text}</h1>`;
}

//const sock = io();

//sock.on("message", writeEvent);

let currentCard = "43";
let lastCard = "2";
let secondLastCard = null;

if (currentCard, lastCard && currentCard.value == '43') {
    console.log("yup");
} else {
    console.log("no");
}
/*
cardReceived = null;

sock.on("cardflip", setStartTime);

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
