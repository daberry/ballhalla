var OtherSwitch = pc.createScript('otherSwitch');

// // Reference a list of textures that we can cycle through
OtherSwitch.attributes.add("textures", {type: "asset", assetType: "texture", array: true, title: "Textures"});

// initialize code called once per entity
OtherSwitch.prototype.initialize = function() {
    this.textureIndex = 1;
};

// update code called every frame
OtherSwitch.prototype.update = function(dt) {
    var ball = this;
    //var pos = ball.entity.getPosition();//may need later to trigger lava
    var lavaCheck = ball.entity.isLava;
    //console.log('is the ball made of Lava', lavaCheck);
    if (lavaCheck === false || lavaCheck === undefined) {
      if (this.app.keyboard.isPressed(pc.KEY_F)) {
        ball.changeToNextTexture();
        ball.entity.isLava = true;
        setTimeout(function(){
          ball.entity.isLava = false;
          ball.changeToNextTexture();
        }, 10000);
      }
    } 
};
OtherSwitch.prototype.changeToNextTexture = function(dt) {
    this.textureIndex = (this.textureIndex + 1) % this.textures.length;
    var texture = this.textures[this.textureIndex].resource;        
    var meshInstances = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances.length; ++i) { 
        var mesh = meshInstances[i];
        mesh.material.diffuseMap = texture;
        mesh.material.update();
    }
};
//