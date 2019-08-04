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
  radius: .241, // m
  frontalArea: 2.24, // m^2
  timer: 0,
  acceleratorPressed: false,
  driveRatio: 9, 
  reverse: false,
  draw: function(ctx) {
    ctx.save();
    var x = ctx.canvas.clientWidth / 2 - this.length / 2
    var y = ctx.canvas.clientHeight / 2 - this.width / 2
    ctx.translate(x, y);
    ctx.rotate(this.r);
    ctx.drawImage(tesla, 0, 0, this.length, this.width);
    ctx.restore();
  }, 
  torque: function(v) {
    if (v <= 45) return this.maxTorque
    else if (v <= 75) return this.maxTorque - 10 * (v - 45)
    else return this.maxTorque
  }
};