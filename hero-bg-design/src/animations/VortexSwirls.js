import { BaseAnimation } from '../core/BaseAnimation.js';
import { random } from '../core/utils.js';

export class VortexSwirls extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      particleCount: 200,
      spiralSpeed: 0.02,
      pullStrength: 0.5,
      colors: ['#ff006e', '#8338ec', '#3a86ff'],
      ...options
    });

    this.particles = [];
    this.centerX = 0;
    this.centerY = 0;
  }

  onResize() {
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      const angle = random(0, Math.PI * 2);
      const distance = random(0, Math.max(this.width, this.height));
      this.particles.push({
        x: this.centerX + Math.cos(angle) * distance,
        y: this.centerY + Math.sin(angle) * distance,
        angle: angle,
        distance: distance,
        color: this.options.colors[i % this.options.colors.length],
        size: random(1, 3)
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      const dx = this.centerX - p.x;
      const dy = this.centerY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      p.angle += this.options.spiralSpeed / (dist * 0.01 + 1);
      p.distance -= this.options.pullStrength;

      if (p.distance < 10) {
        const angle = random(0, Math.PI * 2);
        p.distance = Math.max(this.width, this.height);
        p.x = this.centerX + Math.cos(angle) * p.distance;
        p.y = this.centerY + Math.sin(angle) * p.distance;
      }

      p.x = this.centerX + Math.cos(p.angle) * p.distance;
      p.y = this.centerY + Math.sin(p.angle) * p.distance;
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.particles.forEach(p => {
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}
