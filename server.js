// droplet IP address: 138.68.251.126
require('dotenv').config();
var express = require('express');
var app = express();
//var server = require('http').createServer();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8081;
app.use(express.static(__dirname + '/public'));

var redis;
if (process.env.REDISTOGO_URL) {
  console.log('theres a redis url, here we go');
  var rtg   = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]);

} else {
  redis = require('redis').createClient();
}
var scoreboardCallback = function(err, response) {
  if (err) {console.error(err);}
};
redis.zincrby('scoreobard', 2, 'dave');
var scoreboard1 = redis.zrangebyscore('scoreboard', 0, 999999, 'WITHSCORES', scoreboardCallback);

redis.zincrby('scoreboard', 1, 'dave');
var scoreboard2 = redis.zrangebyscore('scoreboard', 0, 999999, 'WITHSCORES', scoreboardCallback);




var players = [];


function Player (id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.entity = null;
  this.lastCollision = null;
}

io.sockets.on('connection', function(socket) {
  console.log(' ');
  console.log('new connection', socket.id);

  socket.on('initialize', function(nickName) {
    console.log(' ');
    console.log('-------------------------');
    console.log('socket on initialize... ');
    console.log('list of sockets: ', Object.keys(io.sockets.sockets));

    var idNum = players.length;
    var newPlayer = new Player (idNum);
    newPlayer.nickName = nickName;

    players.push(newPlayer);

    console.log('emitting playerData... ');
    socket.emit('playerData', {id: idNum, players: players});

    console.log('broadcasting playerJoined... ');
    console.log('-------------------------');
    socket.broadcast.emit('playerJoined', newPlayer);
  });

  socket.on('deletePlayer', function(id) {
    console.log(' ');
    console.log('players before deletion... ', players);

    console.log(' ');
    console.log('socket on deletePlayer... ');
    console.log(' ');

    players[id] = 'dead';
    console.log('players after deletion... ', players);
    // socket.disconnect();
  });

  socket.on('positionUpdate', function(data) {
    // console.log(Date.now(), ' socket on positionUpdate... ');

    if (players[data.id] !== 'dead') {
      var dataKeys = Object.keys(data);
      dataKeys.map(function(curKey) {
        if (curKey !== 'id') {
          players[data.id][curKey] = data[curKey];
        }
      });

      // console.log(Date.now(), ' broadcasting playerMoved... ');
      socket.broadcast.emit('playerMoved', data);
    }
  });

  // currently this emites 1 point which everyone takes per second
  // even though it sends an id, the clients currently always take the
  // point, even if it's not 'theirs' so that it mimics time-based scoring
  var randPlayerId;
  setInterval(function() {
    randPlayerId = 0;
    console.log('emitting point', randPlayerId);
    socket.emit('pointScored', randPlayerId);
  }, 1000);
});

console.log('server running on port ', port);
server.listen(port);

exports.players = players;
exports.Player = Player;
exports.app = app;