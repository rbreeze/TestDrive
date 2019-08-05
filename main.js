// SCALE: 1px = 1 inch

// setup
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

canvas.width = 1080*2;
canvas.height = 320*2;
canvas.style.width = "1080px";
canvas.style.height = "320px";

ctx.scale(2,2)

color = "white"

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

function changeColor(color) {
  tesla.src = "cars/m3_" + color + ".svg";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // rotation
  if(keys[37]) road.r -= 0.02;
  if(keys[39]) road.r += 0.02;

  m3p.acceleratorPressed = false
  m3p.reverse = false

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

  // updatePosition(road)
  drive(road, m3p)
  road.draw(ctx)
  m3p.draw(ctx)
  bar.draw(ctx)
}

function drive(road, car) {

  // get current speed
  var v = convertSpeed(road.vx) // miles per hour
  var vm = (1609 / 3600) * v // m / s

  // drag
  var drag = 0.5 * car.Cd * airDensity * vm * vm * car.frontalArea // kg * m / sec^2 [N]
  drag = (isNaN(drag) ? 0 : drag);

  // rolling resistance
  var rr = convertForce((v / Math.abs(v)) * car.mass * g * friction)
  rr = (isNaN(rr) ? 0 : rr)

  // motors
  var Fmotors = 0
  if (car.acceleratorPressed)
    Fmotors = car.efficiency * car.driveRatio * car.torque(v * 1.609) / car.radius
  else if (car.reverse)
    Fmotors = -0.5 * car.driveRatio * car.maxTorque / car.radius
  else if (road.vx < 0)
    Fmotors = -0.4 * car.driveRatio * car.maxTorque / car.radius

  // 0-60 timer
  if (road.ax < 0 && v <= 60)
    car.timer += 1 / framerate

  updateInstrument("timer", Math.round(car.timer * 100) / 100)

  // net force
  var Fnet = (rr + convertForce(drag) - convertForce(Fmotors))

  // update acceleration [pixels / frame^2]
  road.ax =  Fnet / car.mass 

  // update velocity [pixels / frame]
  road.vx += road.ax

  // update energy bar
  var power = Math.round( Fmotors * vm / 1000) // kW
  updateInstrument("power", Math.round(power))
  updateInstrument("exertion", Math.round( 100 * power / car.maxPower ))
  bar.update(power)

  // update position [pixels]
  road.x += road.vx;
  road.y += road.vy; 

  updateInstrument("speed", convertSpeed(road.vx))
  updateInstrument("drag", Math.round(drag))
}

// converts vx (px / fr) value to mph
function convertSpeed(ps) {
  return Math.round( -1 * (ps * 3600 * framerate) / 63360 ) // miles per hour
}

// converts force from SI units [N] to game units [kg * px / fr^2]
function convertForce(f) {
  return Math.pow(1 / framerate, 2) * f * 12 * 5280 / 1609
}

function updateInstrument(id, value) {
  var i = document.getElementById(id)
  i.innerHTML = value
}

// load graphics and draw
var tesla = new Image();
tesla.onload = function() {
  setInterval(draw, 1000 / framerate);
}

tesla.src = "cars/m3_" + color + ".svg";