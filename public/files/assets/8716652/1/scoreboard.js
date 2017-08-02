/*jshint esversion: 6 */

var Scoreboard = pc.createScript('scoreboard');

Scoreboard.attributes.add('scoreboard-markup', {type: 'asset', assetType: 'html', title: 'scoreboardhtmlhtmlhtml'});
Scoreboard.attributes.add('scoreboard-style', {type: 'asset', assetType: 'css', title: 'scoreboardcsscsscsscss'});

// initialize code called once per entity
Scoreboard.prototype.initialize = function() {

  if (window.socket === undefined) {
    window.socket = io('http://localhost:8081');
  }
  this.socket = window.socket;

  var style = document.createElement('style');
  document.head.appendChild(style);
  style.innerHTML = this['scoreboard-style'].resource || '';

  this.div = document.createElement('div');
  this.div.classList.add('sb-container');
  this.div.innerHTML = this['scoreboard-markup'].resource || '';

  document.body.appendChild(this.div);
  window.playerscore = document.querySelector('p.sb-score');

  window.socket.on('pointScored', function(idOfPlayerThatScored) {
    var prev = window.playerscore.innerHTML;
    prev = parseInt(prev);
    prev += 1;
    window.playerscore.innerHTML = prev;
  });
};