/* CONSTANTS */

const roadWidth = 170 // inches
const markerWidth = 20 // inches
const markerLength = 40 // inches

var road = {
  vx: 0, vy: 0,
  ax: 0, ay: 0,
  r: 0,
  x: 0, 
  y: 0, 
  width: markerWidth, 
  length: markerLength, 
  draw: function(ctx) {
    ctx.save();

    var w = ctx.canvas.clientWidth
    var h = ctx.canvas.clientHeight

    // // rotation
    // ctx.translate(w / 2, h / 2);
    // ctx.rotate(this.r);
    // ctx.translate(-w, 0)

    // road
    var yOffset = h / 2 - roadWidth / 2
    ctx.fillStyle = '#393939';
    ctx.fillRect(0, yOffset, w * 2, roadWidth);

    // marker
    yOffset = h / 2 - markerWidth / 2
    ctx.fillStyle = '#D4C000';
    ctx.fillRect(w - markerLength + this.x, yOffset, markerLength, markerWidth);

    // infinite looping for marker
    if (this.x < -w) this.x = 0
    else if (this.x > 0) this.x = -w

    ctx.restore();
  }
}
