const http = require("http");
const express = require("express");
const socketio = require("socket.io");

import SJGame from "./slapjack.js"

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

let active_game = null;
let player1 = null;
let player2 = null;

function startGame(p1, p2) {
    active_game = new SJGame();
    player1 = p1;
    player2 = p2;
}

function endGame() {
    winner = active_game.winner;
    [player1, player2].forEach((p) => {
        p.emit("displayCard", null);
        if (winner) {
            p.emit("winner", active_game.winner)
        }
    });
    active_game = null;
}

io.on("connection", (sock) => {
    if (waitingPlayer) {
        [waitingPlayer, sock].forEach((s) => s.emit("message", "game start"));
        startGame(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        io.emit("message", "waiting for player");
    }
});

sock.on("move", (player, move) => {
    if (move == "flipCard") {
        active_game.flipCard(player);
    }
    if (move == "end") {
        endGame();
    }

});

server.on("error", (err) => {
    console.error("Server error: ", err);
});

server.listen(8080, () => {
    console.log("Server started on 8080");
});
