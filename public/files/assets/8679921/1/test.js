var Network = pc.createScript('network');

Network.prototype.initialize = function() {
  this.socket = io('http://pond-game.herokuapp.com');
  this.socket.emit('initialize');
    
  var self = this;
  this.player = this.app.root.findByName ('Player');
  this.other = this.app.root.findByName ('Other');

  this.socket.on('playerData', function(data) {
    self.initializePlayers(data);
  });

  this.socket.on('playerJoined', function(data) {
    self.addPlayer(data);
  });

  this.socket.on ('playerMoved', function (data) {
    self.movePlayer (data);
  });
};

Network.prototype.initializePlayers = function(data) {
  this.players = data.players;
  this.id = data.id;
  this.player.id = data.id;

  for (var i = 0; i < this.players.length; i++) {
    if (i !== this.id) {
      this.players[i].entity = this.createPlayerEntity (data.players[i]);
    }
  }

  this.initialized = true;
};

Network.prototype.addPlayer = function(data) {
  this.players.push (data);
  this.players[this.players.length - 1].entity = this.createPlayerEntity (data);
};

Network.prototype.createPlayerEntity = function(data) {
  var newPlayer = this.other.clone();

  newPlayer.enabled = true;
  newPlayer.id = data.id;
  newPlayer.lastCollision = null;

  this.other.getParent().addChild(newPlayer);
  if (data) {
    console.log('data', data);
    console.log('newPlayer', newPlayer);
    console.log('newPLayer.rigidBody', newPlayer.rigidBody);
    console.log(this.player);
    newPlayer.rigidbody.teleport(data.x, data.y, data.z);
  }

  return newPlayer;
};

Network.prototype.movePlayer = function (data) {
  if (this.initialized) {
    this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z);
    this.players[data.id].entity.rigidbody.linearVelocity = new pc.Vec3(data.vx, data.vy, data.vz);
    this.players[data.id].entity.rigidbody.angularVelocity = new pc.Vec3(data.ax, data.ay, data.az);
  }
};

Network.prototype.update = function(dt) {
  this.updatePosition ();
};

Network.prototype.updatePosition = function () {
  if (this.initialized) {
    var pos = this.player.getPosition();
    var lv = this.player.rigidbody.linearVelocity;
    var av = this.player.rigidbody.angularVelocity;
    this.socket.emit ('positionUpdate', {
      id: this.id,
      x: pos.x,
      y: pos.y,
      z: pos.z,
      vx: lv.x,
      vy: lv.y,
      vz: lv.z,
      ax: av.x,
      ay: av.y,
      az: av.z
    });
  }
};
