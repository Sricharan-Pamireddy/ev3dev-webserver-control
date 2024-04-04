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
var EV3Control = require('./class/EV3Control');

app.use(express.static(config.path));

app.get("/webConfig.json", (req, res) => {
    try {
        var data = fs.readFileSync(args[2]);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        data = JSON.parse(data);
        data = data.webConfig;
        data = JSON.stringify(data);
        res.write(data);
        res.end();
    } catch (err) {
        res.writeHead(500, {'Content-Type': 'text/json'});
        var data = {};
        data.status = 500;
        data.message = `Could Not Read Config File`;
        data.error = "" + err + "";
        data = JSON.stringify(data);
        res.write(data);
        res.end();
    }
});

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('disconnect', async function () {
        console.log(`A user disconnected`);
        await bot.resetAllMotors();
    });
});

var bot = new EV3Control(config.ev3.address, config.ev3.sshPort, config.ev3.username, config.ev3.password);

bot.on("ready", () => {
    http.listen(config.port, function () {
        console.log(`WebServer started on port ${config.port}`);
    });
});