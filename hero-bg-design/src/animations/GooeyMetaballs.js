import { BaseAnimation } from '../core/BaseAnimation.js';
import { random } from '../core/utils.js';

export class GooeyMetaballs extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      ballCount: 8,
      minRadius: 30,
      maxRadius: 80,
      speed: 0.5,
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
      ...options
    });

    this.balls = [];
  }

  onResize() {
    this.balls = [];
    for (let i = 0; i < this.options.ballCount; i++) {
      this.balls.push({
        x: random(0, this.width),
        y: random(0, this.height),
        vx: random(-this.options.speed, this.options.speed),
        vy: random(-this.options.speed, this.options.speed),
        radius: random(this.options.minRadius, this.options.maxRadius),
        color: this.options.colors[i % this.options.colors.length]
      });
    }
  }

  update() {
    this.balls.forEach(ball => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < 0 || ball.x > this.width) ball.vx *= -1;
      if (ball.y < 0 || ball.y > this.height) ball.vy *= -1;
    });
  }

  render() {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Apply SVG-like blur filter effect
    this.ctx.filter = 'blur(15px) contrast(20)';

    this.balls.forEach(ball => {
      const gradient = this.ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
      gradient.addColorStop(0, ball.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.filter = 'none';
  }
}
