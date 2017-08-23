/*jshint esversion: 6 */

var Scoreboard = pc.createScript('scoreboard');

Scoreboard.attributes.add('scoreboard-markup', {type: 'asset', assetType: 'html', title: 'scoreboardhtmlhtmlhtml'});
Scoreboard.attributes.add('scoreboard-style', {type: 'asset', assetType: 'css', title: 'scoreboardcsscsscsscss'});

// initialize code called once per entity
Scoreboard.prototype.initialize = function() {

  if (window.socket === undefined) {
    //window.socket = io('http://localhost:8081');
    //
    //window.socket = io('http://pond-game.herokuapp.com');
    window.socket = io('http://ballhalla.herokuapp.com');
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

  // scoreData is leaderboard data from redis: [
  //                                             '0 nickname1', // player id [space] nickName
  //                                             '0',           // number of kills
  //                                             '1 nickname2',
  //                                             '0'
  //                                           ]
  window.socket.on('leaderboardUpdate', function(scoreData) {

    var n = Math.min(10, scoreData.length);
    var temp, id, nickName, points;
    var scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    var scoreRank = document.getElementById('score-rank');

    for (var i = 0; i < n; i++) {
      temp = scoreData[i].split(' ');
      id = temp[0];
      nickName = temp[1];

      if (nickName !== undefined) {
        if (nickName.length > 10) {
          nickName = nickName.split('').slice(0, 8).join('');
          nickName += '...';
        }
        points = scoreData[i+1];

        var newLI = document.createElement('li');
        newLI.innerHTML = `<span style="display: inline-block; overflow: hidden;">#${Math.ceil((i+1)/2)} | ${nickName}</span>
                                 <span style="display: inline-block; float: right;">${points}</span>`;
        scoreList.appendChild(newLI);
        // if (window.player.id + '' === id) {
        //     console.log(scoreData);
        //     var myScore = scoreData[i + 1];
        //     var rank = Math.ceil((i+1)/2);
        //     scoreRank.innerHTML = '';
        //     var pTag = document.createElement('p');
        //     pTag.innerHTML = `Your score: ${myScore}</p><p>Your rank: ${rank}`;
        //     scoreRank.appendChild(pTag);
        // }
      }

      for (var j = 0; j < scoreData.length; j++) {
        var cur = scoreData[i].split(' ');
        var redisId = cur[0];
        if (nickName !== undefined) {
          if (window.player.id + '' === redisId) {
            console.log(scoreData);
            var myScore = scoreData[i + 1];
            var rank = Math.ceil((i+1)/2);
            scoreRank.innerHTML = '';
            var pTag = document.createElement('p');
            pTag.innerHTML = `Your score: ${myScore}</p><p>Your rank: ${rank}`;
            scoreRank.appendChild(pTag);
          }
        }
      }
    }

    // If we can get something like line 72 working, we can do the rest of this..
  });
};
