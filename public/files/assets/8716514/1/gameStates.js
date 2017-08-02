var GameStates = pc.createScript('gameStates');

GameStates.attributes.add('Game', {type: 'entity'});
GameStates.attributes.add('StartScreen', {type: 'entity'});

GameStates.prototype.initialize = function() {

  this.app.on('gamestart', function() {
    this.app.fire("game:gamestart");
    this.Game.enabled = true;
    this.StartScreen.enabled = false;
  }, this);

  this.app.on('gameover', function() {
    this.app.fire("game:gameover");
    this.Game.enabled = false;
    this.StartScreen.enabled = true;
  }, this);
};
