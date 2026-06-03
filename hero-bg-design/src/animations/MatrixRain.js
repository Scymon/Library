import { BaseAnimation } from '../core/BaseAnimation.js';
import { random, randomInt } from '../core/utils.js';

export class MatrixRain extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      fontSize: 14,
      speed: 1,
      color: '#0F0',
      ...options
    });

    this.columns = [];
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  }

  onResize() {
    const columnCount = Math.floor(this.width / this.options.fontSize);
    this.columns = [];

    for (let i = 0; i < columnCount; i++) {
      this.columns.push({
        x: i * this.options.fontSize,
        y: random(-this.height, 0),
        speed: random(0.5, 1.5) * this.options.speed
      });
    }
  }

  update() {
    this.columns.forEach(col => {
      col.y += col.speed;
      if (col.y > this.height) {
        col.y = random(-100, 0);
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = this.options.color;
    this.ctx.font = `${this.options.fontSize}px monospace`;

    this.columns.forEach(col => {
      const char = this.chars[randomInt(0, this.chars.length)];
      this.ctx.fillText(char, col.x, col.y);
    });
  }
}
