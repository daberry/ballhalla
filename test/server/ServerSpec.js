var expect = require('chai').expect;

// server.js > module.exports = testVar;
var server = require('../../server.js');
var io = require('socket.io-client');
var socketURL = 'http://127.0.0.1:8081';

describe('Ballhalla Server', function() {
  beforeEach(function() {
    server.players = [];
    newPlayer = new server.Player(3);
    server.players.push(newPlayer);
  });

  describe('Player initialization', function() {
    it ('should find defined variables inside server files', function () {
      expect(server.players).to.exist;
    });

    it ('should initialize a player with the desired ID @ (0,0,0)', function () {
      newPlayer = new server.Player(13579);
      expect(newPlayer.id).to.equal(13579);
    });
  });
  


  describe('Socket.IO', function() {
    //before (function)
    it ('player list should be non-empty before connecting to socket', function() {
      expect(server.players.length).to.equal(1);
    });
    describe ('basic socket event communication', function() {
      var socket = io(socketURL);
      var socket2 = io(socketURL);
      var firstId;
      it('have one player after both sockets connect, but one is initialized', function (done) {
        socket.emit('initialize');
        socket.on('playerData', function (data) {
          firstId = data.id;
          expect(data.players.length).to.equal(1);
          expect(server.players.length).to.equal(1);
          done();
        });
      });

      it('have two players after both sockets connect and init', function (done) {
        socket2.emit('initialize');
        socket2.on('playerData', function (data) {
          expect(data.players.length).to.equal(2);
          done();
        });
      });

      it('should handle player movement events properly between connections', function(done) {
        socket.emit('positionUpdate', {
          id: firstId,
          x: 1,
          y: 1,
          z: 1,
          vx: 2,
          vy: 2,
          vz: 2,
          ax: 3,
          ay: 3,
          az: 3
        });
        socket2.on('playerMoved', function (data) {
          expect(data.id).to.equal(firstId);
          expect(data.x).to.equal(1);
          expect(Object.keys(data).length).to.equal(10);
          done();
        });
      });
    });
  });
});
