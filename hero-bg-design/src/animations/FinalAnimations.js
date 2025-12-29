import { BaseAnimation } from '../core/BaseAnimation.js';
import { random, randomInt, randomColor, distance, PerlinNoise } from '../core/utils.js';

// Hologram Flicker
export class HologramFlicker extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.scanline = 0;
    this.glitchOffset = 0;
  }

  update() {
    this.scanline = (this.scanline + 2) % this.height;
    this.glitchOffset = Math.random() > 0.9 ? random(-5, 5) : 0;
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 20, 40, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Scanlines
    for (let y = 0; y < this.height; y += 4) {
      this.ctx.fillStyle = `rgba(0, 255, 200, ${(y === this.scanline) ? 0.3 : 0.05})`;
      this.ctx.fillRect(this.glitchOffset, y, this.width, 2);
    }

    // Hologram grid
    this.ctx.strokeStyle = 'rgba(0, 255, 200, 0.2)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
  }
}

// Vine Growth
export class VineGrowth extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { vineCount: 5, ...options });
    this.vines = [];
  }

  onResize() {
    this.vines = [];
    for (let i = 0; i < this.options.vineCount; i++) {
      this.vines.push({
        segments: [{x: random(0, this.width), y: this.height}],
        angle: -Math.PI / 2 + random(-0.5, 0.5),
        growing: true,
        color: `hsl(${random(80, 140)}, 60%, 40%)`
      });
    }
  }

  update() {
    this.vines.forEach(vine => {
      if (vine.growing && vine.segments.length < 50) {
        const last = vine.segments[vine.segments.length - 1];
        vine.angle += random(-0.3, 0.3);

        vine.segments.push({
          x: last.x + Math.cos(vine.angle) * 5,
          y: last.y + Math.sin(vine.angle) * 5
        });

        if (Math.random() > 0.95) vine.growing = false;
      } else if (Math.random() > 0.99) {
        vine.growing = true;
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(240, 248, 240, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.vines.forEach(vine => {
      this.ctx.strokeStyle = vine.color;
      this.ctx.lineWidth = 3;
      this.ctx.lineCap = 'round';

      this.ctx.beginPath();
      vine.segments.forEach((seg, i) => {
        if (i === 0) this.ctx.moveTo(seg.x, seg.y);
        else this.ctx.lineTo(seg.x, seg.y);
      });
      this.ctx.stroke();
    });
  }
}

// Sand Dunes
export class SandDunes extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.offset = 0;
  }

  update() {
    this.offset += 0.5;
  }

  render() {
    this.ctx.fillStyle = '#f4e4c1';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let layer = 0; layer < 5; layer++) {
      this.ctx.fillStyle = `rgba(194, 154, 97, ${0.2 + layer * 0.1})`;
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 10) {
        const y = this.height * 0.6 +
                  Math.sin((x + this.offset * (layer + 1)) * 0.01) * 50 +
                  Math.sin((x + this.offset * (layer + 1)) * 0.02) * 30 +
                  layer * 40;
        this.ctx.lineTo(x, y);
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

// Ocean Waves
export class OceanWaves extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { waveCount: 4, ...options });
    this.time = 0;
  }

  update() {
    this.time += 0.02;
  }

  render() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#0066cc');
    gradient.addColorStop(1, '#003366');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.options.waveCount; i++) {
      const alpha = 0.3 - i * 0.05;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 5) {
        const y = this.height * 0.7 +
                  Math.sin((x * 0.01) + this.time + i * 0.5) * 30 +
                  Math.sin((x * 0.02) + this.time * 1.5 + i * 0.3) * 15 +
                  i * 20;
        this.ctx.lineTo(x, y);
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

// Mosaic Reveal
export class MosaicReveal extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { tileSize: 20, ...options });
    this.tiles = [];
    this.progress = 0;
  }

  onResize() {
    this.tiles = [];
    const cols = Math.ceil(this.width / this.options.tileSize);
    const rows = Math.ceil(this.height / this.options.tileSize);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.tiles.push({
          x: x * this.options.tileSize,
          y: y * this.options.tileSize,
          revealed: false,
          delay: random(0, 100),
          color: randomColor()
        });
      }
    }
  }

  update() {
    this.progress += 0.5;
    this.tiles.forEach(tile => {
      if (this.progress > tile.delay) tile.revealed = true;
    });

    if (this.progress > 150) this.progress = 0;
  }

  render() {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.tiles.forEach(tile => {
      if (tile.revealed) {
        this.ctx.fillStyle = tile.color;
        this.ctx.fillRect(tile.x, tile.y, this.options.tileSize - 2, this.options.tileSize - 2);
      }
    });
  }
}

// DNA Helix
export class DNAHelix extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.rotation = 0;
  }

  update() {
    this.rotation += 0.02;
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const amplitude = 100;
    const frequency = 0.05;

    for (let y = 0; y < this.height; y += 10) {
      const angle = y * frequency + this.rotation;

      const x1 = cx + Math.cos(angle) * amplitude;
      const x2 = cx + Math.cos(angle + Math.PI) * amplitude;

      // Draw strands
      this.ctx.fillStyle = '#00ff88';
      this.ctx.beginPath();
      this.ctx.arc(x1, y, 5, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#ff0088';
      this.ctx.beginPath();
      this.ctx.arc(x2, y, 5, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw connections
      if (y % 30 === 0) {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y);
        this.ctx.lineTo(x2, y);
        this.ctx.stroke();
      }
    }
  }
}

// Clockwork Gears
export class ClockworkGears extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { gearCount: 5, ...options });
    this.gears = [];
  }

  onResize() {
    this.gears = [];
    for (let i = 0; i < this.options.gearCount; i++) {
      this.gears.push({
        x: random(100, this.width - 100),
        y: random(100, this.height - 100),
        radius: random(30, 80),
        teeth: randomInt(8, 16),
        rotation: 0,
        speed: random(-0.02, 0.02)
      });
    }
  }

  update() {
    this.gears.forEach(gear => {
      gear.rotation += gear.speed;
    });
  }

  render() {
    this.ctx.fillStyle = '#2a2a2a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.gears.forEach(gear => {
      this.ctx.save();
      this.ctx.translate(gear.x, gear.y);
      this.ctx.rotate(gear.rotation);

      // Draw gear
      this.ctx.fillStyle = '#c9a961';
      this.ctx.strokeStyle = '#8b7355';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      for (let i = 0; i < gear.teeth; i++) {
        const angle = (Math.PI * 2 / gear.teeth) * i;
        const outerRadius = gear.radius;
        const innerRadius = gear.radius * 0.8;

        const x1 = Math.cos(angle - 0.1) * outerRadius;
        const y1 = Math.sin(angle - 0.1) * outerRadius;
        const x2 = Math.cos(angle + 0.1) * outerRadius;
        const y2 = Math.sin(angle + 0.1) * outerRadius;
        const x3 = Math.cos(angle + 0.15) * innerRadius;
        const y3 = Math.sin(angle + 0.15) * innerRadius;
        const x4 = Math.cos(angle - 0.15) * innerRadius;
        const y4 = Math.sin(angle - 0.15) * innerRadius;

        if (i === 0) this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x4, y4);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Draw center
      this.ctx.fillStyle = '#5a5a5a';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, gear.radius * 0.3, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }
}

// Leaf Fall
export class LeafFall extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { leafCount: 30, ...options });
    this.leaves = [];
  }

  onResize() {
    this.leaves = [];
    for (let i = 0; i < this.options.leafCount; i++) {
      this.leaves.push(this.createLeaf());
    }
  }

  createLeaf() {
    return {
      x: random(0, this.width),
      y: random(-100, -10),
      vx: random(-1, 1),
      vy: random(1, 3),
      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(-0.1, 0.1),
      color: `hsl(${random(20, 50)}, 70%, 40%)`
    };
  }

  update() {
    this.leaves.forEach((leaf, i) => {
      leaf.x += leaf.vx + Math.sin(leaf.y * 0.01) * 0.5;
      leaf.y += leaf.vy;
      leaf.rotation += leaf.rotationSpeed;

      if (leaf.y > this.height + 10) {
        this.leaves[i] = this.createLeaf();
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(245, 245, 235, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.leaves.forEach(leaf => {
      this.ctx.save();
      this.ctx.translate(leaf.x, leaf.y);
      this.ctx.rotate(leaf.rotation);

      this.ctx.fillStyle = leaf.color;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, 10, 20, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }
}

// Comet Tails
export class CometTails extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { cometCount: 10, ...options });
    this.comets = [];
  }

  onResize() {
    this.comets = [];
    for (let i = 0; i < this.options.cometCount; i++) {
      this.comets.push(this.createComet());
    }
  }

  createComet() {
    const angle = random(0, Math.PI / 4);
    return {
      x: random(-100, this.width),
      y: random(-100, this.height / 2),
      vx: Math.cos(angle) * random(3, 8),
      vy: Math.sin(angle) * random(3, 8),
      trail: [],
      color: randomColor()
    };
  }

  update() {
    this.comets.forEach((comet, i) => {
      comet.x += comet.vx;
      comet.y += comet.vy;

      comet.trail.push({x: comet.x, y: comet.y});
      if (comet.trail.length > 20) comet.trail.shift();

      if (comet.x > this.width + 100 || comet.y > this.height + 100) {
        this.comets[i] = this.createComet();
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.comets.forEach(comet => {
      // Draw trail
      comet.trail.forEach((point, i) => {
        const alpha = i / comet.trail.length;
        this.ctx.fillStyle = comet.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 3 * alpha, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Draw comet head
      this.ctx.fillStyle = comet.color;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = comet.color;
      this.ctx.beginPath();
      this.ctx.arc(comet.x, comet.y, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }
}

// Fog Layers
export class FogLayers extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { layerCount: 4, ...options });
    this.layers = [];
  }

  onResize() {
    this.layers = [];
    for (let i = 0; i < this.options.layerCount; i++) {
      this.layers.push({
        offset: random(0, this.width),
        speed: 0.2 + i * 0.1,
        alpha: 0.2 - i * 0.03,
        y: (this.height / this.options.layerCount) * i
      });
    }
  }

  update() {
    this.layers.forEach(layer => {
      layer.offset += layer.speed;
      if (layer.offset > this.width) layer.offset = -this.width;
    });
  }

  render() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f0f1a');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.layers.forEach(layer => {
      this.ctx.fillStyle = `rgba(200, 200, 220, ${layer.alpha})`;
      this.ctx.filter = 'blur(30px)';

      for (let i = -1; i <= 1; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(i * this.width + layer.offset, layer.y + this.height);

        for (let x = 0; x <= this.width; x += 20) {
          const y = layer.y + Math.sin((x + layer.offset) * 0.01) * 50;
          this.ctx.lineTo(i * this.width + x + layer.offset, y);
        }

        this.ctx.lineTo(i * this.width + this.width + layer.offset, layer.y + this.height);
        this.ctx.closePath();
        this.ctx.fill();
      }
    });

    this.ctx.filter = 'none';
  }
}

// Bioluminescence
export class Bioluminescence extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { glowCount: 40, ...options });
    this.glows = [];
  }

  onResize() {
    this.glows = [];
    for (let i = 0; i < this.options.glowCount; i++) {
      this.glows.push({
        x: random(0, this.width),
        y: random(0, this.height),
        radius: random(5, 20),
        pulse: random(0, Math.PI * 2),
        speed: random(0.02, 0.05),
        color: `hsl(${random(160, 200)}, 80%, 50%)`
      });
    }
  }

  update() {
    this.glows.forEach(glow => {
      glow.pulse += glow.speed;
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 10, 20, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.glows.forEach(glow => {
      const pulse = Math.sin(glow.pulse) * 0.5 + 0.5;
      const radius = glow.radius * (0.5 + pulse * 0.5);

      const gradient = this.ctx.createRadialGradient(
        glow.x, glow.y, 0,
        glow.x, glow.y, radius
      );
      gradient.addColorStop(0, glow.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(glow.x, glow.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}

// Fractal Flames
export class FractalFlames extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.points = [];
    this.time = 0;
  }

  onResize() {
    this.points = [];
    for (let i = 0; i < 1000; i++) {
      this.points.push({
        x: random(-1, 1),
        y: random(-1, 1)
      });
    }
  }

  update() {
    this.time += 0.01;

    this.points.forEach(p => {
      const r = Math.sqrt(p.x * p.x + p.y * p.y);
      const theta = Math.atan2(p.y, p.x);

      // Flame transform
      p.x = Math.sin(theta + this.time) * r * 0.99;
      p.y = Math.cos(theta - this.time) * r * 0.99;
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;
    const scale = Math.min(this.width, this.height) * 0.3;

    this.points.forEach(p => {
      const x = cx + p.x * scale;
      const y = cy + p.y * scale;
      const dist = Math.sqrt(p.x * p.x + p.y * p.y);

      const hue = (dist * 200 + this.time * 50) % 360;
      this.ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.1)`;
      this.ctx.fillRect(x, y, 2, 2);
    });
  }
}

// Sound Wave Visualizer (animated without audio)
export class SoundWaveVisualizer extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { barCount: 64, ...options });
    this.bars = [];
  }

  onResize() {
    this.bars = Array(this.options.barCount).fill(0).map(() => random(0, 1));
  }

  update() {
    this.bars = this.bars.map(() => {
      return Math.max(0.1, this.bars[Math.floor(random(0, this.bars.length))] * random(0.7, 1.3));
    });
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const barWidth = this.width / this.options.barCount;
    const centerY = this.height / 2;

    this.bars.forEach((value, i) => {
      const height = value * this.height * 0.4;
      const x = i * barWidth;

      const hue = (i / this.options.barCount) * 360;
      this.ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
      this.ctx.fillRect(x, centerY - height, barWidth - 2, height * 2);
    });
  }
}
