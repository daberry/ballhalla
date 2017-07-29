require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8081;

app.use(express.static(__dirname + '/public'));

// ----------------------------------------------------------------
// we need to update this section with exactly what redis is doing

var redis;
if (process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]);
} else {
  redis = require('redis').createClient();
}

// misspelling: scoreobard?
redis.zincrby('scoreobard', 2, 'dave');
var scoreboard1 = redis.zrangebyscore('scoreboard', 0, 999999, 'WITHSCORES', scoreboardCallback);

redis.zincrby('scoreboard', 1, 'dave');
var scoreboard2 = redis.zrangebyscore('scoreboard', 0, 999999, 'WITHSCORES', scoreboardCallback);

var scoreboardCallback = function(err, response) {
  if (err) {
    console.error(err);
  }
};

// ----------------------------------------------------------------
var players = [];

function Player (id, nickName) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.nickName = nickName || '';
  this.entity = null;
  this.lastCollision = null;
}

io.sockets.on('connection', function(socket) {
  console.log('connection event fired line 50 hi dave');
  socket.on('initialize', function(data) {
    var idNum = players.length;
    var nickName = data.nickName;
    var newPlayer = new Player (idNum, nickName);

    players.push(newPlayer);
    console.log('about to emit playerData');
    socket.emit('playerData', {id: idNum, nickName: nickName, players: players});

    socket.broadcast.emit('playerJoined', newPlayer);
  });

  socket.on('positionUpdate', function(data) {
    var dataKeys = Object.keys(data);
    dataKeys.map(function(curKey) {
      if (curKey !== 'id') {
        players[data.id][curKey] = data[curKey];
      }
    });
    /*
      players[data.id].x = data.x;
      players[data.id].y = data.y;
      players[data.id].z = data.z;
      players[data.id].vx: lv.x,
      players[data.id.vy: lv.y,
      players[data.id].vz: lv.z,
      players[data.id].ax: av.x,
      players[data.id].ay: av.y,
      players[data.id].az: av.z
    */
    socket.broadcast.emit('playerMoved', data);
  });
});

console.log('server running on port: ', port);
server.listen(port);
