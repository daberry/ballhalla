var SwitchingTextures = pc.createScript('switchingTextures');

// Reference a list of textures that we can cycle through
SwitchingTextures.attributes.add("textures", {type: "asset", assetType: "texture", array: true, title: "Textures"});

SwitchingTextures.prototype.initialize = function() {
     this.textureIndex = 1;
};

//This is how we turn lava on for ten seconds...all based upon setTimeout
//currently pressing key v triggers
SwitchingTextures.prototype.update = function(dt) {
    var ball = this;
    //var pos = ball.entity.getPosition();//may need later to trigger lava
    var lavaCheck = ball.entity.isLava;
    //console.log('is the ball made of Lava', lavaCheck);
    if (lavaCheck === false) {
      if (this.app.keyboard.isPressed(pc.KEY_V)) {
        ball.changeToNextTexture();
        ball.entity.isLava = true;
        setTimeout(function(){
          ball.entity.isLava = false;
          ball.changeToNextTexture();
        }, 10000);
      }
    } 
};

//This enables us to switch through the textures attatched to the object.
SwitchingTextures.prototype.changeToNextTexture = function(dt) {
    this.textureIndex = (this.textureIndex + 1) % this.textures.length;
    var texture = this.textures[this.textureIndex].resource;        
    var meshInstances = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances.length; ++i) { 
        var mesh = meshInstances[i];
        mesh.material.diffuseMap = texture;
        mesh.material.update();
    }
};