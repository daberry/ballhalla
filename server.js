require('dotenv').config();
require('@risingstack/trace');
var express = require('express');
var app = express();
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

  socket.on('initialize', function(nickName) {
    var idNum = players.length;
    var newPlayer = new Player (idNum);
    newPlayer.nickName = nickName;
    players.push(newPlayer);

    redis.zadd('scoreboard', 0, '' + idNum + ' ' + nickName);
    socket.emit('playerData', {id: idNum, players: players});
    socket.broadcast.emit('playerJoined', newPlayer);

    var initialCallback = function(err, res) {
      if (err) {
        console.log(err);
      } else {
        socket.emit('leaderboardUpdate', res);
        socket.broadcast.emit('leaderboardUpdate', res);
      }
    };
    redis.zrevrangebyscore('scoreboard', '+inf', '-inf', 'WITHSCORES', initialCallback);
  });

  socket.on('deletePlayer', function(id, lastCollision) {
    if (players[lastCollision]) {
      redis.zrem('scoreboard', '' + id + ' ' + players[id].nickName);
      var playerGettingPoint = '' + lastCollision + ' ' + players[lastCollision].nickName;
      if (players[lastCollision] !== 'dead') {
        redis.zincrby('scoreboard', 1, playerGettingPoint);
      }
      players[id] = 'dead';

      var leaderboardCallback = function (err, res) {
        if (err) {
          console.log(err);
        } else {
          socket.broadcast.emit('leaderboardUpdate', res);
        }
      };
      redis.zrevrangebyscore('scoreboard', '+inf', '-inf', 'WITHSCORES', leaderboardCallback);
    }
  });



  socket.on('positionUpdate', function(data) { //-----------------------------
    if (players[data.id] !== 'dead') {
      var dataKeys = Object.keys(data);
      dataKeys.map(function(curKey) {
        if (curKey !== 'id') {
          players[data.id][curKey] = data[curKey];
        }
      });
      socket.broadcast.emit('playerMoved', data);
    }
  });

  // currently this emites 1 point which everyone takes per second
  // even though it sends an id, the clients currently always take the
  // point, even if it's not 'theirs' so that it mimics time-based scoring
  var randPlayerId;
  setInterval(function() {
    randPlayerId = 0;
    //console.log('emitting point', randPlayerId);
    socket.emit('pointScored', randPlayerId);
  }, 1000);
});

console.log('server running on port ', port);
server.listen(port);
exports.players = players;
exports.Player = Player;
exports.app = app;
