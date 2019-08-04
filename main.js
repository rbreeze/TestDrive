// SCALE: 1px = 1 inch
// 60 MPH = 88 px / sec

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

/* CONSTANTS */

const framerate = 100 // frames / sec
const roadWidth = 170 // inches

const friction = .05
const Cd = .23
const frontalArea = 2.22 // m^2
const airDensity = 1.29 // kg / m^3

const markerWidth = 20 // inches
const markerLength = 40 // inches

var road = {
  vx: 0, vy: 0,
  ax: 0, ay: 0,
  r: 0,
  roadX: - canvas.width,
  roadY: canvas.height / 2 - roadWidth / 2,
  x: canvas.width * 1.5 - markerWidth, 
  y: roadWidth / 2 - markerWidth / 2, 
  width: markerWidth, 
  length: markerLength, 
  draw: function() {
    ctx.save();

    // rotation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(this.r);
    ctx.translate(- canvas.width / 1, - this.roadY)

    ctx.fillStyle = '#393939';
    ctx.fillRect(0, 0, canvas.width * 2, roadWidth);

    // marker
    ctx.fillStyle = '#D4C000';
    ctx.fillRect(this.x, this.y, markerLength, markerWidth);

    ctx.restore();
  }
}

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var keys = [];
document.addEventListener('keydown', function(e){
    keys[e.which] = true;
});
document.addEventListener('keyup', function(e){
    keys[e.which] = false;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // if (timerRunning) car.timer += (interval / 1000)

  if(keys[37]) road.r -= 0.02;
  if(keys[39]) road.r += 0.02;

  // backwards
  if (keys[40]) {
    road.ax = Math.cos(road.r) * 0.06;
  } 
  // forwards
  else if (keys[38]) { 
    road.ax = -1 * Math.cos(road.r) * 0.09; 
  } 
  // regen breaking
  else if (road.vx < 0) {
    road.ax = Math.cos(road.r) * 0.02;
  } else {
    road.ax = 0
  }

  updatePosition(road)
  road.draw()
  m3p.draw()
}

function moveCar(car) {

  var speedometer = document.getElementById("speed");
  var speed = Math.round( -1 * (obj.vx * 3600 * (1000 / interval)) / 63360 ) // miles per hour
  var metricVelocity = 1.609 * speed

  var drag = Cd * ((airDensity * metricVelocity * metricVelocity) / 2) * frontalArea

  var dragometer = document.getElementById("drag")
  dragometer.innerHTML = Math.round(drag / 10) / 100

  car.ax = drag / car.mass
  car.vx += car.ax

  speedometer.innerHTML = speed

  if (speed >= 60) timerRunning = false
}

function updatePosition(obj) {
  // update velocity
  obj.vx += obj.ax;
  obj.vy += obj.ay;

  var speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy),
      angle = Math.atan2(obj.vy, obj.vx);

  if (speed > friction){
      speed -= friction;
  } else {
      speed = 0;
  }

  obj.vx = Math.cos(angle) * speed;
  obj.vy = Math.sin(angle) * speed;

  var speedometer = document.getElementById("speed");
  var speed = Math.round( -1 * (obj.vx * 3600 * (framerate)) / 63360 ) // miles per hour
  var metricVelocity = 1.609 * speed
  var drag = Cd * ((airDensity * metricVelocity * metricVelocity) / 2) * frontalArea

  var dragometer = document.getElementById("drag")
  dragometer.innerHTML = Math.round(drag / 10) / 100

  obj.ax -= drag

  speedometer.innerHTML = speed

  if (speed >= 60) timerRunning = false

  // update position
  obj.x += obj.vx;
  obj.y += obj.vy;

  if (obj.x < 0) obj.x = canvas.width * 1.5 - obj.length
  else if (obj.x > canvas.width * 1.5 + obj.width) obj.x = canvas.width * .5
}

var tesla = new Image();
tesla.onload = function() {
  setInterval(draw, 1000 / framerate);
  // 100 intervals per second
  // 360000 intervals per hour
}
tesla.src = "tesla.svg";