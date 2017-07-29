var Collider = pc.createScript('collider');

Collider.prototype.initialize = function () {
  this.entity.collision.on('collisionstart', this.onCollisionStart, this);
  this.entity.collision.on('collisionstart', this.onBump, this);
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
