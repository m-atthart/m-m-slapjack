const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const SJGame = require("./slapjack");

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;
let p1Name = null;
let p2Name = null;

let active_game = null;

function startGame(player1, player2) {
    setTimeout(() => console.log(p1Name, p2Name), 1000);
    active_game = new SJGame(player1, p1Name, player2, p2Name);
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
    console.log(sock.id);
    if (waitingPlayer) {
        [waitingPlayer, sock].forEach((s) => s.emit("message", "game start"));
        startGame(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        io.emit("message", "waiting for player");
    }
    sock.on("setName", (name) => {
        if (waitingPlayer) {
            p1Name = name;
        } else {
            p2Name = name;
        }
    });
    sock.on("flipCard", () => {
        active_game.flipCard(sock);
        console.log(`player ${sock.id} flipped`);
    });
    sock.on("slap", (timeToSlap) => {
        active_game.slap(sock, timeToSlap);
        console.log(`player ${sock.id} slapped`);
    });
    sock.on("endGame", () => {
        endGame();
    });
    sock.on("disconnect", () => {
        if (waitingPlayer && waitingPlayer == sock) {
            waitingPlayer = null;
        }
    });
});

server.on("error", (err) => {
    console.error("Server error: ", err);
});

server.listen(8080, () => {
    console.log("Server started on 8080");
});
