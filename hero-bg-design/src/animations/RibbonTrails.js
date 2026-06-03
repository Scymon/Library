import { BaseAnimation } from '../core/BaseAnimation.js';

export class RibbonTrails extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      trailLength: 50,
      lineWidth: 3,
      colors: ['#ff006e', '#8338ec', '#3a86ff'],
      fadeSpeed: 0.95,
      ...options
    });

    this.trails = [];
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.element.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  update() {
    this.trails.push({
      x: this.mouseX,
      y: this.mouseY,
      age: 0
    });

    if (this.trails.length > this.options.trailLength) {
      this.trails.shift();
    }

    this.trails.forEach(point => point.age++);
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    if (this.trails.length < 2) return;

    for (let i = 0; i < this.trails.length - 1; i++) {
      const point = this.trails[i];
      const nextPoint = this.trails[i + 1];
      const progress = i / this.trails.length;
      const color = this.options.colors[Math.floor(progress * this.options.colors.length)];

      this.ctx.strokeStyle = color.replace(')', `, ${1 - progress})`).replace('rgb', 'rgba');
      this.ctx.lineWidth = this.options.lineWidth * (1 - progress);
      this.ctx.lineCap = 'round';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = color;

      this.ctx.beginPath();
      this.ctx.moveTo(point.x, point.y);
      this.ctx.lineTo(nextPoint.x, nextPoint.y);
      this.ctx.stroke();
    }

    this.ctx.shadowBlur = 0;
  }

  destroy() {
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    super.destroy();
  }
}
