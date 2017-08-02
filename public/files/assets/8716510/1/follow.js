var Follow = pc.createScript('follow');

Follow.attributes.add('target', {
  type: 'entity',
  title: 'Target',
  description: 'The Entity to follow'
});

Follow.attributes.add('distance', {
  type: 'number',
  default: 4,
  title: 'Distance',
  description: 'How far from the Entity should the follower be'
});

Follow.prototype.initialize = function() {
  this.vec = new pc.Vec3();
};

Follow.prototype.updateTarget = function(target) {
  this.target = target;
};

Follow.prototype.update = function(dt) {
  // console.log('THIS INSIDE OF FOLLOW >>>>>', this);
  if (!this.target) return;
  // console.log('THIS.TARGET AFTER IF STATEMENT>>>>>', this.target);

  // get the position of the target entity
  var pos = this.target.getPosition();

  // calculate the desired position for this entity
  pos.x += 0.75 * this.distance;
  pos.y += 1.0 * this.distance;
  pos.z += 0.75 * this.distance;

  // smoothly interpolate towards the target position
  this.vec.lerp(this.vec, pos, 0.1);

  // set the position for this entity
  this.entity.setPosition(this.vec);
};
