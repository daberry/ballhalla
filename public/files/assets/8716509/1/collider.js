var Collider = pc.createScript('collider');
window.moveLock = false;

Collider.prototype.initialize = function () {
  this.entity.collision.on('collisionstart', this.onCollisionStart, this);
  this.entity.collision.on('collisionstart', this.onBump, this);
  this.entity.collision.on('collisionstart', this.disableControls, this);
};

Collider.prototype.onCollisionStart = function (result) {
  if (result.other.name === 'Other') {
    this.entity.sound.play('collide');
  }
};

Collider.prototype.onBump = function (result) {
  if (result.other.name === 'Other') {
    this.entity.lastCollision = result.other.id;   
  }
};

Collider.prototype.disableControls = function(result) {
  if (result.other.name === 'Other') {
    window.moveLock = true;
    
    setTimeout(function() {
      window.moveLock = false;
    }, 1000);
  }
};
