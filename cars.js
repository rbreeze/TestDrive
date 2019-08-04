// Model 3 Performance
var m3p = {
  vx: 0, vy: 0,
  ax: 0, ay: 0,
  r: 0,
  width: 73, // inches 
  length: 185, // inches
  mass: 1847, // kg
  timer: 0,
  draw: function() {
    ctx.save();
    var x = ctx.canvas.clientWidth / 2 - this.length / 2
    var y = ctx.canvas.clientHeight / 2 - this.width / 2
    ctx.translate(x, y);
    ctx.rotate(this.r);
    ctx.drawImage(tesla, 0, 0, this.length, this.width);
    ctx.restore();
  }
};