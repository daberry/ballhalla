var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8081;

var testVar = 'server var';
var p2 = require('p2');

app.use(express.static(__dirname + '/server-p2'));

// Create a physics world, where bodies and constraints live
var world = new p2.World({
  gravity:[0, -9.82]
});
console.log(world);
// Create an empty dynamic body
var circleBody = new p2.Body({
  mass: 1,
  position: [0, 3]
});

console.log(circleBody);

// Add a circle shape to the body.
var circleShape = new p2.Circle({ radius: 1 });
circleBody.addShape(circleShape);

// ...and add the body to the world.
// If we don't add it to the world, it won't be simulated.
world.addBody(circleBody);

// Create an infinite ground plane.
var groundBody = new p2.Body({
  mass: 0 // Setting mass to 0 makes the body static
});
var groundShape = new p2.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);


// To get the trajectories of the bodies,
// we must step the world forward in time.
// This is done using a fixed time step size.
var timeStep = 1 / 60; // seconds
var count = 0;
// The "Game loop". Could be replaced by, for example, requestAnimationFrame.
setInterval(function(){

  // The step method moves the bodies forward in time.
  world.step(timeStep);
  sendUpdate(null, true);
  // Print the circle position to console.
  // Could be replaced by a render call.
  // console.log("Circle y position: " + circleBody.position[1], 'count: ', count);
  count++;
}, 1000 * timeStep);

////////////////////////////////////
//////socket functions
////////////////////////////////////
var getDataz = function() {
  return {
    x: circleBody.position[0],
    y: circleBody.position[1],
    vx: circleBody.velocity[0],
    vy: circleBody.velocity[1]
  };
};
var sendUpdate = function(socket, globalFlag) {
  var dataz = getDataz();
  if (globalFlag === true) {
    io.emit('circleUpdate', dataz);
  } else {
    socket.emit('circleUpdate', dataz);
  }
};

var handleAddVelocity = function(socket, data) {
  console.log('handling velcoity update ', data, getDataz());
  circleBody.velocity[0] += data.x;
  circleBody.velocity[1] += data.y;
};

io.on('connection', function (socket) {
  sendUpdate(socket);

  socket.on('addVelocity', function(data) {
    handleAddVelocity(socket, data);
  });
});


var players = [];

app.use(express.static(__dirname + '/public'));

server.listen(port, function () {
  console.log('listening on port >>>>' + port);
});



module.exports = testVar;
