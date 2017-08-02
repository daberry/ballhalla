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
    playerRandVar.nickName = nickName;
<<<<<<< HEAD:public/files/assets/8699029/1/start-screen.js
      
<<<<<<< HEAD

=======
=======
>>>>>>> e63ffea44942b914932e69163f1fc8d14ca32050:public/files/assets/8716506/1/start-screen.js
    
>>>>>>> 8bf65a344ebb1bcedea4bfa4d323caa262161085
    Network.prototype.smrtInitialize();
    console.log('starting game');
      
    // reset playerScore to 0 for next player
    var prev = window.playerscore.innerHTML = '0';
    
    this.app.fire('gamestart');
  });
};
