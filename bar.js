var bar = {
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
  accel() {
    if (this.deccelWidth < 0) this.deccelWidth += 1
    else this.accelWidth += 1
  }, 
  deccel() {
    if (this.accelWidth > 0) this.accelWidth -= 2
    else this.deccelWidth += 2
  }
}