import { BaseAnimation } from '../core/BaseAnimation.js';
import { random, randomInt, randomColor, distance, PerlinNoise } from '../core/utils.js';

// Fire/Smoke Simulation
export class FireSmoke extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { particleCount: 100, ...options });
    this.particles = [];
  }

  onResize() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: random(0, this.width),
        y: this.height,
        vy: random(-3, -1),
        vx: random(-0.5, 0.5),
        life: 1,
        size: random(10, 40)
      });
    }
  }

  update() {
    this.particles.forEach((p, i) => {
      p.y += p.vy;
      p.x += p.vx;
      p.life -= 0.01;
      if (p.life <= 0 || p.y < 0) {
        this.particles[i] = {
          x: random(0, this.width),
          y: this.height,
          vy: random(-3, -1),
          vx: random(-0.5, 0.5),
          life: 1,
          size: random(10, 40)
        };
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.particles.forEach(p => {
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `rgba(255, ${200 * p.life}, 0, ${p.life})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
    });
  }
}

// Water Ripples
export class WaterRipples extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.ripples = [];
    this.handleClick = this.handleClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    const rect = this.element.getBoundingClientRect();
    this.ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: 200,
      alpha: 1
    });
  }

  update() {
    this.ripples.forEach((r, i) => {
      r.radius += 3;
      r.alpha -= 0.02;
      if (r.alpha <= 0) this.ripples.splice(i, 1);
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 50, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ripples.forEach(r => {
      this.ctx.strokeStyle = `rgba(100, 200, 255, ${r.alpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
  }

  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    super.destroy();
  }
}

// Bokeh Lights
export class BokehLights extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { circleCount: 50, ...options });
    this.circles = [];
  }

  onResize() {
    this.circles = [];
    for (let i = 0; i < this.options.circleCount; i++) {
      this.circles.push({
        x: random(0, this.width),
        y: random(0, this.height),
        vx: random(-0.5, 0.5),
        vy: random(-0.5, 0.5),
        radius: random(20, 100),
        color: randomColor(0.3)
      });
    }
  }

  update() {
    this.circles.forEach(c => {
      c.x += c.vx;
      c.y += c.vy;
      if (c.x < 0 || c.x > this.width) c.vx *= -1;
      if (c.y < 0 || c.y > this.height) c.vy *= -1;
    });
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.filter = 'blur(20px)';
    this.circles.forEach(c => {
      this.ctx.fillStyle = c.color;
      this.ctx.beginPath();
      this.ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.filter = 'none';
  }
}

// Fractal Trees
export class FractalTrees extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { angle: 0, ...options });
    this.angle = 0;
  }

  update() {
    this.angle += 0.01;
  }

  drawBranch(x, y, length, angle, depth) {
    if (depth === 0) return;
    const x2 = x + length * Math.cos(angle);
    const y2 = y + length * Math.sin(angle);

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = `hsl(${120 - depth * 10}, 70%, ${50 + depth * 5}%)`;
    this.ctx.lineWidth = depth;
    this.ctx.stroke();

    this.drawBranch(x2, y2, length * 0.7, angle - 0.3 - Math.sin(this.angle) * 0.1, depth - 1);
    this.drawBranch(x2, y2, length * 0.7, angle + 0.3 + Math.sin(this.angle) * 0.1, depth - 1);
  }

  render() {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.drawBranch(this.width / 2, this.height, -100, -Math.PI / 2, 10);
  }
}

// Plasma Effects
export class PlasmaEffects extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.time = 0;
  }

  update() {
    this.time += 0.05;
  }

  render() {
    const imageData = this.ctx.createImageData(this.width, this.height);
    const data = imageData.data;

    for (let y = 0; y < this.height; y += 2) {
      for (let x = 0; x < this.width; x += 2) {
        const value = Math.sin(x * 0.01 + this.time) +
                     Math.sin(y * 0.01 + this.time) +
                     Math.sin((x + y) * 0.01 + this.time) +
                     Math.sin(Math.sqrt(x * x + y * y) * 0.01 + this.time);

        const color = Math.floor((value + 4) * 32);
        const idx = (y * this.width + x) * 4;

        data[idx] = color;
        data[idx + 1] = color * 1.5;
        data[idx + 2] = 255 - color;
        data[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}

// Glitch Distortion
export class GlitchDistortion extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.glitchIntensity = 0;
  }

  update() {
    this.glitchIntensity = Math.random() > 0.95 ? random(0, 50) : 0;
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    if (this.glitchIntensity > 0) {
      const slices = 10;
      for (let i = 0; i < slices; i++) {
        const y = (this.height / slices) * i;
        const offset = random(-this.glitchIntensity, this.glitchIntensity);

        this.ctx.fillStyle = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
        this.ctx.fillRect(offset, y, this.width, this.height / slices);
      }
    }
  }
}

// Lava Lamp Blobs
export class LavaLampBlobs extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { blobCount: 6, ...options });
    this.blobs = [];
  }

  onResize() {
    this.blobs = [];
    for (let i = 0; i < this.options.blobCount; i++) {
      this.blobs.push({
        x: random(0, this.width),
        y: random(0, this.height),
        vy: random(-0.5, -0.2),
        radius: random(40, 80),
        color: randomColor(0.8)
      });
    }
  }

  update() {
    this.blobs.forEach(b => {
      b.y += b.vy;
      if (b.y + b.radius < 0) {
        b.y = this.height + b.radius;
        b.x = random(0, this.width);
      }
    });
  }

  render() {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.filter = 'blur(20px) contrast(30)';

    this.blobs.forEach(b => {
      const gradient = this.ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
      gradient.addColorStop(0, b.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.filter = 'none';
  }
}

// Snowfall Particles
export class SnowfallParticles extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { snowflakeCount: 100, ...options });
    this.snowflakes = [];
  }

  onResize() {
    this.snowflakes = [];
    for (let i = 0; i < this.options.snowflakeCount; i++) {
      this.snowflakes.push(this.createSnowflake());
    }
  }

  createSnowflake() {
    return {
      x: random(0, this.width),
      y: random(-this.height, 0),
      vy: random(1, 3),
      vx: random(-1, 1),
      radius: random(2, 5)
    };
  }

  update() {
    this.snowflakes.forEach((s, i) => {
      s.y += s.vy;
      s.x += s.vx;
      if (s.y > this.height) this.snowflakes[i] = this.createSnowflake();
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#fff';
    this.snowflakes.forEach(s => {
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}

// Rain Drops
export class RainDrops extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { dropCount: 100, ...options });
    this.drops = [];
  }

  onResize() {
    this.drops = [];
    for (let i = 0; i < this.options.dropCount; i++) {
      this.drops.push(this.createDrop());
    }
  }

  createDrop() {
    return {
      x: random(0, this.width),
      y: random(-this.height, 0),
      vy: random(10, 20),
      length: random(10, 30)
    };
  }

  update() {
    this.drops.forEach((d, i) => {
      d.y += d.vy;
      if (d.y > this.height) this.drops[i] = this.createDrop();
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
    this.ctx.lineWidth = 1;
    this.drops.forEach(d => {
      this.ctx.beginPath();
      this.ctx.moveTo(d.x, d.y);
      this.ctx.lineTo(d.x, d.y + d.length);
      this.ctx.stroke();
    });
  }
}

// Fireworks Explosion
export class FireworksExplosion extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.fireworks = [];
    this.lastFirework = 0;
  }

  update() {
    const now = Date.now();
    if (now - this.lastFirework > 1000) {
      this.fireworks.push({
        x: random(this.width * 0.3, this.width * 0.7),
        y: random(this.height * 0.3, this.height * 0.7),
        particles: Array.from({ length: 50 }, () => ({
          angle: random(0, Math.PI * 2),
          speed: random(2, 8),
          life: 1,
          color: randomColor()
        }))
      });
      this.lastFirework = now;
    }

    this.fireworks.forEach((fw, i) => {
      fw.particles.forEach(p => {
        p.life -= 0.02;
      });
      fw.particles = fw.particles.filter(p => p.life > 0);
      if (fw.particles.length === 0) this.fireworks.splice(i, 1);
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.fireworks.forEach(fw => {
      fw.particles.forEach(p => {
        const x = fw.x + Math.cos(p.angle) * p.speed * (1 - p.life) * 100;
        const y = fw.y + Math.sin(p.angle) * p.speed * (1 - p.life) * 100;

        this.ctx.fillStyle = p.color.replace(')', `, ${p.life})`).replace('rgb', 'rgba');
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);
        this.ctx.fill();
      });
    });
  }
}

// Floating Bubbles
export class FloatingBubbles extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { bubbleCount: 30, ...options });
    this.bubbles = [];
  }

  onResize() {
    this.bubbles = [];
    for (let i = 0; i < this.options.bubbleCount; i++) {
      this.bubbles.push(this.createBubble());
    }
  }

  createBubble() {
    return {
      x: random(0, this.width),
      y: this.height + 50,
      vy: random(-1, -2),
      vx: random(-0.5, 0.5),
      radius: random(10, 40),
      life: 1
    };
  }

  update() {
    this.bubbles.forEach((b, i) => {
      b.y += b.vy;
      b.x += b.vx;
      if (b.y < -50) {
        this.bubbles[i] = this.createBubble();
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 50, 100, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.bubbles.forEach(b => {
      const gradient = this.ctx.createRadialGradient(
        b.x - b.radius * 0.3, b.y - b.radius * 0.3, 0,
        b.x, b.y, b.radius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.1)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
  }
}

// Continue with remaining animations...
// For brevity, I'll add a few more key ones and then create the registry

// Heartbeat Pulse
export class HeartbeatPulse extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.pulses = [];
    this.lastPulse = 0;
  }

  update() {
    const now = Date.now();
    if (now - this.lastPulse > 800) {
      this.pulses.push({ radius: 0, alpha: 1 });
      this.lastPulse = now;
    }

    this.pulses.forEach((p, i) => {
      p.radius += 5;
      p.alpha -= 0.01;
      if (p.alpha <= 0) this.pulses.splice(i, 1);
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;

    this.pulses.forEach(p => {
      this.ctx.strokeStyle = `rgba(255, 50, 100, ${p.alpha})`;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, p.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
  }
}

// Retro Grid
export class RetroGrid extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.offset = 0;
  }

  update() {
    this.offset += 2;
    if (this.offset > 50) this.offset = 0;
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Create perspective grid
    this.ctx.strokeStyle = '#ff006e';
    this.ctx.lineWidth = 2;

    const gridSize = 50;
    const vanishingPoint = this.height * 0.3;

    // Horizontal lines
    for (let y = 0; y < 20; y++) {
      const yPos = this.height - (y * gridSize) + this.offset;
      const scale = (this.height - yPos) / this.height;

      this.ctx.beginPath();
      this.ctx.moveTo(0, yPos);
      this.ctx.lineTo(this.width, yPos);
      this.ctx.globalAlpha = scale;
      this.ctx.stroke();
    }

    // Vertical lines
    for (let x = -10; x < 30; x++) {
      const xPos = (this.width / 2) + (x * gridSize);

      this.ctx.beginPath();
      this.ctx.moveTo(xPos, this.height);
      this.ctx.lineTo(this.width / 2, vanishingPoint);
      this.ctx.globalAlpha = 0.5;
      this.ctx.stroke();
    }

    this.ctx.globalAlpha = 1;
  }
}
