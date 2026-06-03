import { BaseAnimation } from '../core/BaseAnimation.js';
import { random } from '../core/utils.js';

export class StarfieldDepth extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, {
      starCount: 300,
      speed: 1,
      ...options
    });

    this.stars = [];
  }

  onResize() {
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.stars = [];
    for (let i = 0; i < this.options.starCount; i++) {
      this.stars.push(this.createStar());
    }
  }

  createStar() {
    return {
      x: random(-this.width, this.width),
      y: random(-this.height, this.height),
      z: random(0, this.width)
    };
  }

  update() {
    this.stars.forEach((star, index) => {
      star.z -= this.options.speed;

      if (star.z <= 0) {
        this.stars[index] = this.createStar();
        this.stars[index].z = this.width;
      }
    });
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.stars.forEach(star => {
      const x = (star.x / star.z) * this.width + this.centerX;
      const y = (star.y / star.z) * this.height + this.centerY;
      const size = (1 - star.z / this.width) * 3;
      const opacity = 1 - star.z / this.width;

      if (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }
}
