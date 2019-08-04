var accelBar = {
  height: 5,
  accelWidth: 0, 
  deccelWidth: 0, 
  draw: function() {
    ctx.save(); 
    ctx.fillStyle = '#CECECE';
    ctx.fillRect(0, canvas.height - this.height, canvas.width, this.height);

    // accel
    ctx.fillStyle = '#46D400';
    ctx.fillRect(canvas.width / 2, canvas.height - this.height, this.accelWidth, this.height);

    // deccel
    ctx.fillStyle = '#C20808';
    ctx.fillRect(canvas.width / 2, canvas.height - this.height, - this.deccelWidth, this.height);
  }
}