import { BaseAnimation } from '../core/BaseAnimation.js';

export class NeonWavePulses extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      waveCount: 5,
      amplitude: 50,
      frequency: 0.02,
      speed: 0.05,
      colors: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5'],
      glowIntensity: 20,
      ...options
    });

    this.time = 0;
  }

  update() {
    this.time += this.options.speed;
  }

  render() {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const centerY = this.height / 2;

    for (let i = 0; i < this.options.waveCount; i++) {
      const color = this.options.colors[i % this.options.colors.length];
      const offset = i * 50;

      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 3;
      this.ctx.shadowBlur = this.options.glowIntensity;
      this.ctx.shadowColor = color;

      this.ctx.beginPath();
      for (let x = 0; x < this.width; x++) {
        const y = centerY + Math.sin(x * this.options.frequency + this.time + offset * 0.1) * this.options.amplitude;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    }

    this.ctx.shadowBlur = 0;
  }
}
