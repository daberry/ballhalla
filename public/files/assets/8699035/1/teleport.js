var Teleport = pc.createScript('teleport');

Teleport.attributes.add('target', {
  type: 'entity',
  title: 'Target Entity',
  description: 'The target entity where we are going to teleport'
});

Teleport.prototype.initialize = function() {
  if (this.target) {
    // Subscribe to the triggerenter event of this entity's collision component
    // This will be fired when a rigid body enters this collision volume
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
  }
};

Teleport.prototype.onTriggerEnter = function (otherEntity) {
  if (otherEntity.script.teleportable) {
    otherEntity.script.teleportable.teleport(this.entity, this.target);
  }
};
