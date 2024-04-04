var args = process.argv;
if (args.length < 3) {
    console.log(`Not Enough Arguments!!!`);
    console.log(`Run "node ./server.js --help"`);
    process.exit(0);
}

if (args[2] == "--help") {
    console.log(`Usage: "node ./server.js <path to config file>"`);
    process.exit(0);
}

var fs = require('fs');
var config = JSON.parse(fs.readFileSync(args[2]));

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(config.path));

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('disconnect', function () {
        console.log(`A user disconnected`);
    });
});

http.listen(config.port, function () {
    console.log(`WebServer started on port ${config.port}`);
});