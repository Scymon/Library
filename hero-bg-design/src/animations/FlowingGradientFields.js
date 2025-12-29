import { BaseAnimation } from '../core/BaseAnimation.js';

export class FlowingGradientFields extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      gridSize: 20,
      speed: 0.002,
      colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
      ...options
    });

    this.time = 0;
  }

  update() {
    this.time += this.options.speed;
  }

  render() {
    const gridSize = this.options.gridSize;
    const cols = Math.ceil(this.width / gridSize);
    const rows = Math.ceil(this.height / gridSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;

        const hue = (Math.sin(i * 0.1 + this.time) + Math.cos(j * 0.1 + this.time)) * 60 + 200;
        const saturation = 70;
        const lightness = 50 + Math.sin(i * 0.05 + j * 0.05 + this.time) * 20;

        this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        this.ctx.fillRect(x, y, gridSize, gridSize);
      }
    }
  }
}
