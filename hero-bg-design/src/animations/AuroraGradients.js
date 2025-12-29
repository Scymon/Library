import { BaseAnimation } from '../core/BaseAnimation.js';
import { PerlinNoise } from '../core/utils.js';

export class AuroraGradients extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      colors: ['#00ff87', '#60efff', '#ff006e', '#8338ec'],
      speed: 0.001,
      scale: 0.003,
      ...options
    });

    this.noise = new PerlinNoise();
    this.time = 0;
  }

  update() {
    this.time += this.options.speed;
  }

  render() {
    const imageData = this.ctx.createImageData(this.width, this.height);
    const data = imageData.data;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const noise1 = this.noise.noise(x * this.options.scale, y * this.options.scale + this.time * 50);
        const noise2 = this.noise.noise(x * this.options.scale + 100, y * this.options.scale + this.time * 50);

        const hue = (noise1 + 1) * 180;
        const saturation = 70;
        const lightness = 40 + (noise2 + 1) * 20;

        const rgb = this.hslToRgb(hue, saturation, lightness);
        const idx = (y * this.width + x) * 4;

        data[idx] = rgb[0];
        data[idx + 1] = rgb[1];
        data[idx + 2] = rgb[2];
        data[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }
}
