var ScriptCrown = pc.createScript('scriptCrown');
var defVec = new pc.Vec3(0,0.52,0);
var parentInverseQuat;
var newPosition;
// initialize code called once per entity
ScriptCrown.prototype.initialize = function() {
  this.camera = this.app.root.findByName('camera');
};

// update code called every frame
ScriptCrown.prototype.update = function(dt) {
  this.entity.setRotation(this.camera.getRotation());
  this.entity.rotateLocal(15, 0, 0);   
  parentInverseQuat = this.entity.parent.getRotation().invert();
  newPosition = parentInverseQuat.transformVector(defVec);
  this.entity.setLocalPosition(newPosition.x, newPosition.y, newPosition.z);    
};

// swap method called for script hot-reloading
// inherit your script state here
// ScriptCrown.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/