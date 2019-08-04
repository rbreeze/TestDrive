// SCALE: 1px = 1 inch
// 60 MPH = 88 px / sec

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

/* CONSTANTS */

const framerate = 100 // frames / sec
const friction = .015
const g = 9.8 // m / s^2
const airDensity = 1.29 // kg / m^3

/* EVENT LISTENERS */
var keys = [];
document.addEventListener('keydown', function(e) {
    keys[e.which] = true;
});

document.addEventListener('keyup', function(e) {
    keys[e.which] = false;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // rotation
  if(keys[37]) road.r -= 0.02;
  if(keys[39]) road.r += 0.02;

  // backwards
  if (keys[40]) {
    // road.ax = Math.cos(road.r) * 0.06;
    m3p.acceleratorPressed = false
    m3p.reverse = true
  } 
  // forwards
  else if (keys[38]) { 
    m3p.acceleratorPressed = true 
    m3p.reverse = false
  } 
  // regen braking
  else if (road.vx < 0) {
    road.ax = Math.cos(road.r) * 0.03;
    m3p.acceleratorPressed = false
    m3p.reverse = false
  } else {
    road.ax = 0
  }

  // updatePosition(road)
  drive(road, m3p)
  road.draw(ctx)
  m3p.draw(ctx)
}

function drive(road, car) {

  // get current speed
  var v = convertSpeed(road.vx) // miles per hour
  var vm = 1.609 * v

  // drag
  var drag = 0.5 * car.Cd * airDensity * Math.abs(vm) * vm * car.frontalArea // kg * m / sec^2 [N]
  drag = (isNaN(drag) ? 0 : drag);

  // rolling resistance
  var rr = convertForce((v / Math.abs(v)) * car.mass * g * friction)
  rr = (isNaN(rr) ? 0 : rr)

  // update acceleration [pixels / frame^2]
  var Fmotors = 0
  if (car.acceleratorPressed)
    Fmotors = car.driveRatio * car.maxTorque / car.radius
  else if (car.reverse)
    Fmotors = -0.5 * car.driveRatio * car.maxTorque / car.radius 

  road.ax = (rr + convertForce(drag) - convertForce(Fmotors)) / car.mass 

  // update velocity [pixels / frame]
  road.vx += road.ax

  // update position [pixels]
  road.x += road.vx;
  road.y += road.vy; 

  updateSpeedometer(convertSpeed(road.vx))
  updateDragometer(drag)
}

// converts vx value to mph
function convertSpeed(ps) {
  return Math.round( -1 * (ps * 3600 * framerate) / 63360 ) // miles per hour
}

// converts force from SI units [N] to game units [kg * px / fr^2]
function convertForce(f) {
  return Math.pow(1 / framerate, 2) * f * 12 * 5280 / 1609
}

function updateSpeedometer(speed) {
  var speedometer = document.getElementById("speed");
  speedometer.innerHTML = speed
}

function updateDragometer(drag) {
  var dragometer = document.getElementById("drag")
  dragometer.innerHTML = Math.round(drag / 10) / 100 // kN
}

// load graphics and draw
var tesla = new Image();
tesla.onload = function() {
  setInterval(draw, 1000 / framerate);
}

tesla.src = "tesla.svg";