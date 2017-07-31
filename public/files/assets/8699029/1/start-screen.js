/*jshint esversion: 6 */

var StartScreen = pc.createScript('startScreen');

StartScreen.attributes.add('start-screen', {type: 'asset', assetType: 'html', title: 'htmlhtmlhtml'});
StartScreen.attributes.add('start-screen-style', {type: 'asset', assetType: 'css', title: 'csscsscsscss'});

StartScreen.prototype.initialize = function() {
  var style = document.createElement('style');
  document.head.appendChild(style);
  style.innerHTML = this['start-screen-style'].resource || '';

  this.div = document.createElement('div');
  this.div.classList.add('container');
  this.div.innerHTML = this['start-screen'].resource || '';

  document.body.appendChild(this.div);

  var button = this.div.querySelector('.button'); // all elements, not just document, have this DOM method: https://goo.gl/V8k43u
  button.addEventListener('click', () => {
    // this.div.style.display = 'none';
    var targetDiv = document.querySelector('body > div.container');
    targetDiv.style.display = 'none';

    var playerRandVar = this.app.root.findByName('Player');
    var otherRandVar = this.app.root.findByName('Other');

    var nickName = document.querySelector('#nicknameInput').value;

    Network.prototype.smrtInitialize(nickName, playerRandVar, otherRandVar);
    console.log('starting game');
    this.app.fire('gamestart');
  });
};
