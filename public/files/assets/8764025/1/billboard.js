var Billboard = pc.createScript('billboard');
var defVec = new pc.Vec3(0,1,0);
var lastDate = new Date();
var parentInverseQuat;
var newPosition;

Billboard.prototype.initialize = function () {
  this.camera = this.app.root.findByName('camera');
  this.player = this.app.root.findByName('Player');

};

Billboard.prototype.update = function (dt) {
  this.entity.setRotation(this.camera.getRotation());
  this.entity.rotateLocal(90, 0, 0);
  parentInverseQuat = this.entity.parent.getRotation().invert();
  newPosition = parentInverseQuat.transformVector(defVec);
  this.entity.setLocalPosition(newPosition.x, newPosition.y, newPosition.z);

};