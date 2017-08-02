// droplet IP address: 138.68.251.126
require('dotenv').config();
var express = require('express');
var app = express();
//var server = require('http').createServer();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8081;
var redis;
app.use(express.static(__dirname + '/public'));

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

  //console.log('scoreboard callback: ', response);
  // console.log(response);
};
// redis.zadd('scoreboard', 1, 'juancarlos');
// redis.zadd('scoreboard', 0, 'dave');
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
  console.log('new connection', players.length);
  socket.on('initialize', function(nickName) {
    var idNum = players.length;
    var newPlayer = new Player (idNum);
    newPlayer.nickName = nickName;

    players.push(newPlayer);
    socket.emit('playerData', {id: idNum, players: players});
    console.log('emitting player joined ', idNum);
    socket.broadcast.emit('playerJoined', newPlayer);
  });

  socket.on('deletePlayer', function(id) {
    console.log('IM IN DELETE PLAYER');
    //remove the player from players
    //socket.broadcast.emit('deleteOther', {id:id, players:players})
    players[id] = 'dead'; // -1 may be wrong but testing....
  });

  socket.on('positionUpdate', function(data) {
    var dataKeys = Object.keys(data);
    //console.log(this, dataKeys);
    dataKeys.map(function(curKey) {
      if (curKey !== 'id') {
        //console.log(data.id, players[data.id], curKey);
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

console.log('server running');
server.listen(port);

exports.players = players;
exports.Player = Player;
exports.app = app;