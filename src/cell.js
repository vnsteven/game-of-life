function Cell(x, y, alive) {
  this.x = x;
  this.y = y;
  this.alive = alive;

  this.draw = () => {
    if (this.alive) {
      ctx.fillStyle = '#252A2E';
      ctx.fillRect(this.x, this.y, scale, scale);
    }
  }
}