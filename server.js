var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Game = /** @class */ (function () {
    function Game() {
    }
    return Game;
}());
var Player = /** @class */ (function () {
    function Player(name, id, player2Id) {
        this.name = name;
        this.id = id;
        this.player2Id = player2Id;
    }
    return Player;
}());
var playersInLobby = [];
var id = 0;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    socket.on('nameSent', function (name) {
        playersInLobby.push(new Player(name, id, -1));
        socket.emit('sendList', playersInLobby);
        id++;
        console.log("new player: " + name);
        io.emit('sendListF5', playersInLobby);
    });
    socket.on('initGame', function (player2Id) {
        io.emit('initGameFor', player2Id);
    });
    socket.on('batLocChanged', function (message) {
        io.emit('refreshBatLoc', message);
    });
});
http.listen(3000, function () {
    console.log('listening on port 3000');
});
