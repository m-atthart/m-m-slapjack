const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on("connection", (sock) => {
    if (waitingPlayer) {
        [waitingPlayer, sock].forEach((s) => s.emit("message", "game start"));
        waitingPlayer = null;
        //startGame(waitingPlayer, sock);
    } else {
        waitingPlayer = sock;
        io.emit("message", "waiting for player");
    }
});

server.on("error", (err) => {
    console.error("Server error: ", err);
});

server.listen(8080, () => {
    console.log("Server started on 8080");
});
