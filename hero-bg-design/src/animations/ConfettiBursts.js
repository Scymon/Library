import { BaseAnimation } from '../core/BaseAnimation.js';
import { random, randomColor } from '../core/utils.js';

export class ConfettiBursts extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      burstInterval: 2000,
      particlesPerBurst: 50,
      gravity: 0.3,
      ...options
    });

    this.particles = [];
    this.lastBurst = 0;
  }

  createBurst() {
    const x = random(this.width * 0.3, this.width * 0.7);
    const y = random(this.height * 0.3, this.height * 0.7);

    for (let i = 0; i < this.options.particlesPerBurst; i++) {
      const angle = random(0, Math.PI * 2);
      const velocity = random(3, 10);
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        rotation: random(0, Math.PI * 2),
        rotationSpeed: random(-0.2, 0.2),
        color: randomColor(),
        size: random(5, 15),
        life: 1
      });
    }
  }

  update() {
    const now = Date.now();
    if (now - this.lastBurst > this.options.burstInterval) {
      this.createBurst();
      this.lastBurst = now;
    }

    this.particles.forEach((p, index) => {
      p.vy += this.options.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.life -= 0.01;

      if (p.life <= 0 || p.y > this.height) {
        this.particles.splice(index, 1);
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    });

    this.ctx.globalAlpha = 1;
  }
}
