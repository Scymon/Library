import { BaseAnimation } from '../core/BaseAnimation.js';
import { random, distance } from '../core/utils.js';

export class ParticleNetworks extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      particleCount: 80,
      maxDistance: 150,
      particleSpeed: 0.3,
      particleSize: 2,
      lineOpacity: 0.3,
      particleColor: '#4ECDC4',
      lineColor: '#4ECDC4',
      ...options
    });

    this.particles = [];
  }

  onResize() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: random(0, this.width),
        y: random(0, this.height),
        vx: random(-this.options.particleSpeed, this.options.particleSpeed),
        vy: random(-this.options.particleSpeed, this.options.particleSpeed)
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dist = distance(
          this.particles[i].x, this.particles[i].y,
          this.particles[j].x, this.particles[j].y
        );

        if (dist < this.options.maxDistance) {
          const opacity = (1 - dist / this.options.maxDistance) * this.options.lineOpacity;
          this.ctx.strokeStyle = this.options.lineColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach(p => {
      this.ctx.fillStyle = this.options.particleColor;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, this.options.particleSize, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}
