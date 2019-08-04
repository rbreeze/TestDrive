var accelBar = {
  height: 5,
  accelWidth: 0, 
  deccelWidth: 0, 
  draw: function(ctx) {
    ctx.save();

    var w = ctx.canvas.clientWidth
    var h = ctx.canvas.clientHeight

    ctx.fillStyle = '#CECECE';
    ctx.fillRect(0, h - this.height, w, this.height);

    // accel
    ctx.fillStyle = '#393939';
    ctx.fillRect(w / 2, h - this.height, this.accelWidth, this.height);

    // deccel / regen
    ctx.fillStyle = '#04C304';
    ctx.fillRect(w / 2, h - this.height, - this.deccelWidth, this.height);
  }, 
  update(a, v) {
    if (a > 0) this.accelWidth =  Math.abs( Math.pow(v, 1) )
    else if (a == 0) this.accelWidth = 0
    else this.deccelWidth = -v
  }
}