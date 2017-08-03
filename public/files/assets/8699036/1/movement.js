var Movement = pc.createScript('movement');

Movement.attributes.add('speed', {
  type: 'number',
  default: 0.1,
  min: 0.05,
  max: 0.5,
  precision: 2,
  description: 'Controls the movement speed'
});

Movement.prototype.initialize = function() {
  this.force = new pc.Vec3();
};

Movement.prototype.update = function(dt) {
  var forceX = 0;
  var forceZ = 0;

  if (!window.moveLock) {
    // calculate force based on pressed keys
    if (this.app.keyboard.isPressed(pc.KEY_A)) {
      forceX = -this.speed;
    }

    if (this.app.keyboard.isPressed(pc.KEY_D)) {
      forceX += this.speed;
    }

    if (this.app.keyboard.isPressed(pc.KEY_W)) {
      forceZ = -this.speed;
    }

    if (this.app.keyboard.isPressed(pc.KEY_S)) {
      forceZ += this.speed;
    }

    // boost on space bar
    var curVelocity = this.entity.rigidbody.linearVelocity;
    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
      if (curVelocity.data[0] !== 0) {
        var normalizer = Math.sqrt(Math.pow(curVelocity.data[0], 2) + Math.pow(curVelocity.data[2], 2));
        var nx = curVelocity.data[0] / normalizer;
        var ny = curVelocity.data[2] / normalizer;
        this.entity.rigidbody.applyImpulse(0.3 * nx, 0, 0.3 * ny);
      }
    }
  }


  this.force.x = forceX;
  this.force.z = forceZ;

  // if we have some non-zero force
  if (this.force.length()) {

    // calculate force vector
    var rX = Math.cos(-Math.PI * 0.25);
    var rY = Math.sin(-Math.PI * 0.25);
    this.force.set(this.force.x * rX - this.force.z * rY, 0, this.force.z * rX + this.force.x * rY);

    // clamp force to the speed
    if (this.force.length() > this.speed) {
      this.force.normalize().scale(this.speed);
    }
  }

  // apply impulse to move the entity
  this.entity.rigidbody.applyImpulse(this.force);
};
