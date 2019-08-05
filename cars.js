// Model 3 Performance
var m3p = {
  vx: 0, vy: 0,
  ax: 0, ay: 0,
  r: 0,
  width: 73, // inches 
  length: 185, // inches
  mass: 1847, // kg, 
  Cd: .23, 
  maxTorque: 639, // Nm
  maxPower: 353, // kW
  radius: .3429, // m
  frontalArea: 2.22, // m^2
  timer: 0,
  acceleratorPressed: false,
  brakePressed: false,
  reverse: false,
  driveRatio: 9, 
  efficiency: .97,
  dropoff: 80, // km/h 
  tireFriction: .015, 
  brakeFriction: .42,
  draw: function(ctx) {
    ctx.save();
    var x = ctx.canvas.clientWidth / 2 - this.length / 2
    var y = ctx.canvas.clientHeight / 2 - this.width / 2
    ctx.translate(x, y);
    ctx.rotate(this.r);
    ctx.drawImage(tesla, 0, 0, this.length, this.width);
    ctx.restore();
  }, 
  torque: function(v) { // v in km/h
    if (v <= this.dropoff) return this.maxTorque
    else return - 41.8 * Math.sqrt(v - this.dropoff) + this.maxTorque
  }
};