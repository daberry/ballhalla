var Teleportable = pc.createScript('teleportable');

Teleportable.prototype.initialize = function() {
  this.lastTeleportFrom = null;
  this.lastTeleportTo = null;
  this.lastTeleport = Date.now();
  this.startPosition = this.entity.getPosition().clone();
    
  this.entity.script.on('destroy', function() {
    console.log('TELEPORTABLE DESTROYED');
  });
};

Teleportable.prototype.update = function(dt) {
  var pos = this.entity.getPosition();

  // when the player falls off: game over
  if (pos.y < -4 && this.entity.name === 'Player') {
    var targetDiv = document.querySelector('body > div.container');
    targetDiv.style.display = 'block';

    this.entity.sound.play('wilhelm');
      
    this.app.fire('gameover');
    //this is where we delete the dead player
      //send event to server from array
    window.socket.emit('deletePlayer', this.entity.id); //socket player listener on server
    this.teleport(this.lastTeleportFrom, this.lastTeleportTo);
<<<<<<< HEAD
=======
    window.clientCurrentPlayerReference = this.entity;
>>>>>>> 8bf65a344ebb1bcedea4bfa4d323caa262161085
    //this.entity.destroy();
    

  } else if (pos.y < -4 && this.entity.name !== 'Player') {
      console.log('this should never be run');
    this.entity.destroy();
  }
};

Teleportable.prototype.teleport = function(from, to) {
  if (from && (Date.now() - this.lastTeleport) < 500) {
    return;
  }

  this.lastTeleport = Date.now();

  // update object's teleport 'history' to reflect
  // teleport about to happen
  this.lastTeleportFrom = from;
  this.lastTeleportTo = to;

  var position;

  if (to) {
    position = to.getPosition();
    position.y += 0.5;
  } else {
    // startPosition is the respawn point
    position = this.startPosition;
  }

  this.entity.rigidbody.teleport(position);

  // reset forces
  this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
  this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
};