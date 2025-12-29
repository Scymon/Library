import { BaseAnimation } from '../core/BaseAnimation.js';
import { random, randomInt, randomColor, distance, PerlinNoise, lerp } from '../core/utils.js';

// Wormhole Tunnel
export class WormholeTunnel extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.rotation = 0;
  }

  update() {
    this.rotation += 0.02;
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;

    for (let i = 50; i > 0; i--) {
      const radius = i * 10;
      const hue = (i * 10 + this.rotation * 100) % 360;

      this.ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
      this.ctx.lineWidth = 2;

      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.rotate(this.rotation + i * 0.1);

      for (let j = 0; j < 8; j++) {
        const angle = (Math.PI * 2 / 8) * j;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }

      this.ctx.restore();
    }
  }
}

// Kaleidoscope Symmetry
export class KaleidoscopeSymmetry extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { segments: 8, ...options });
    this.rotation = 0;
  }

  update() {
    this.rotation += 0.01;
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;

    for (let i = 0; i < this.options.segments; i++) {
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.rotate((Math.PI * 2 / this.options.segments) * i + this.rotation);

      const gradient = this.ctx.createLinearGradient(0, 0, 200, 200);
      const hue = (i * (360 / this.options.segments) + this.rotation * 100) % 360;
      gradient.addColorStop(0, `hsl(${hue}, 70%, 50%)`);
      gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 30%)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(200, -50);
      this.ctx.lineTo(200, 50);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    }
  }
}

// Perlin Noise Clouds
export class PerlinNoiseClouds extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.noise = new PerlinNoise();
    this.time = 0;
  }

  update() {
    this.time += 0.01;
  }

  render() {
    const scale = 0.005;

    for (let y = 0; y < this.height; y += 4) {
      for (let x = 0; x < this.width; x += 4) {
        const noise = this.noise.noise(x * scale, y * scale + this.time);
        const brightness = Math.floor(((noise + 1) / 2) * 255);

        this.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 50})`;
        this.ctx.fillRect(x, y, 4, 4);
      }
    }
  }
}

// Electric Arcs
export class ElectricArcs extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { arcCount: 3, ...options });
    this.arcs = [];
  }

  update() {
    if (Math.random() > 0.9) {
      this.arcs = [];
      for (let i = 0; i < this.options.arcCount; i++) {
        this.arcs.push({
          x1: random(0, this.width),
          y1: random(0, this.height),
          x2: random(0, this.width),
          y2: random(0, this.height),
          life: 1
        });
      }
    }

    this.arcs.forEach(arc => {
      arc.life -= 0.1;
    });
    this.arcs = this.arcs.filter(arc => arc.life > 0);
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 20, 0.2)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.arcs.forEach(arc => {
      this.drawLightning(arc.x1, arc.y1, arc.x2, arc.y2, arc.life);
    });
  }

  drawLightning(x1, y1, x2, y2, alpha) {
    const segments = 10;
    const points = [{x: x1, y: y1}];

    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const x = lerp(x1, x2, t) + random(-20, 20);
      const y = lerp(y1, y2, t) + random(-20, 20);
      points.push({x, y});
    }
    points.push({x: x2, y: y2});

    this.ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
    this.ctx.lineWidth = 3;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#00ffff';

    this.ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) this.ctx.moveTo(p.x, p.y);
      else this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();

    this.ctx.shadowBlur = 0;
  }
}

// Orbital Trails
export class OrbitalTrails extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { orbitCount: 5, ...options });
    this.orbits = [];
    this.angle = 0;
  }

  onResize() {
    this.orbits = [];
    for (let i = 0; i < this.options.orbitCount; i++) {
      this.orbits.push({
        radius: (i + 1) * 50,
        speed: 0.02 + i * 0.01,
        color: randomColor()
      });
    }
  }

  update() {
    this.angle += 0.01;
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;

    this.orbits.forEach((orbit, i) => {
      const angle = this.angle * orbit.speed;
      const x = cx + Math.cos(angle) * orbit.radius;
      const y = cy + Math.sin(angle) * orbit.radius;

      this.ctx.fillStyle = orbit.color;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = orbit.color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.shadowBlur = 0;
  }
}

// Neural Network
export class NeuralNetwork extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { nodeCount: 50, ...options });
    this.nodes = [];
    this.connections = [];
  }

  onResize() {
    this.nodes = [];
    for (let i = 0; i < this.options.nodeCount; i++) {
      this.nodes.push({
        x: random(0, this.width),
        y: random(0, this.height),
        pulse: random(0, Math.PI * 2)
      });
    }

    this.connections = [];
    this.nodes.forEach((node, i) => {
      const closest = this.nodes
        .map((n, idx) => ({idx, dist: distance(node.x, node.y, n.x, n.y)}))
        .filter(n => n.idx !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      closest.forEach(c => {
        this.connections.push({from: i, to: c.idx, strength: 0});
      });
    });
  }

  update() {
    this.nodes.forEach(node => {
      node.pulse += 0.05;
    });

    this.connections.forEach(conn => {
      conn.strength = Math.sin(this.nodes[conn.from].pulse) * 0.5 + 0.5;
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw connections
    this.connections.forEach(conn => {
      const from = this.nodes[conn.from];
      const to = this.nodes[conn.to];

      this.ctx.strokeStyle = `rgba(100, 150, 255, ${conn.strength * 0.5})`;
      this.ctx.lineWidth = conn.strength * 2;
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    });

    // Draw nodes
    this.nodes.forEach(node => {
      const pulse = Math.sin(node.pulse) * 0.5 + 0.5;
      this.ctx.fillStyle = `rgba(100, 200, 255, ${pulse})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#64c8ff';
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 5 + pulse * 3, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.shadowBlur = 0;
  }
}

// Galaxy Spiral
export class GalaxySpiral extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { starCount: 1000, ...options });
    this.stars = [];
    this.rotation = 0;
  }

  onResize() {
    this.stars = [];
    for (let i = 0; i < this.options.starCount; i++) {
      const angle = random(0, Math.PI * 2);
      const distance = random(0, Math.min(this.width, this.height) / 2);
      const spiralOffset = distance * 0.01;

      this.stars.push({
        angle: angle + spiralOffset,
        distance,
        size: random(1, 3),
        speed: 0.001 + distance * 0.00001
      });
    }
  }

  update() {
    this.rotation += 0.001;
    this.stars.forEach(star => {
      star.angle += star.speed;
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;

    this.stars.forEach(star => {
      const x = cx + Math.cos(star.angle + this.rotation) * star.distance;
      const y = cy + Math.sin(star.angle + this.rotation) * star.distance;

      const brightness = 1 - star.distance / (Math.min(this.width, this.height) / 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}

// Pixelated Distortion
export class PixelatedDistortion extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { pixelSize: 20, ...options });
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

  render() {
    const pixelSize = this.options.pixelSize;

    for (let y = 0; y < this.height; y += pixelSize) {
      for (let x = 0; x < this.width; x += pixelSize) {
        const dist = distance(x, y, this.mouseX, this.mouseY);
        const distortion = Math.max(0, 1 - dist / 200);

        const offsetX = (x - this.mouseX) * distortion * 0.5;
        const offsetY = (y - this.mouseY) * distortion * 0.5;

        const hue = (dist + Date.now() * 0.05) % 360;
        this.ctx.fillStyle = `hsl(${hue}, 70%, ${50 + distortion * 30}%)`;
        this.ctx.fillRect(x + offsetX, y + offsetY, pixelSize, pixelSize);
      }
    }
  }

  destroy() {
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    super.destroy();
  }
}

// Circuit Board
export class CircuitBoard extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, options);
    this.circuits = [];
    this.generateCircuits();
  }

  generateCircuits() {
    this.circuits = [];
    for (let i = 0; i < 20; i++) {
      const path = [];
      let x = random(0, this.width);
      let y = random(0, this.height);

      for (let j = 0; j < 5; j++) {
        path.push({x, y});
        x += random(-100, 100);
        y += random(-100, 100);
      }

      this.circuits.push({
        path,
        pulse: random(0, Math.PI * 2),
        speed: random(0.02, 0.05)
      });
    }
  }

  update() {
    this.circuits.forEach(circuit => {
      circuit.pulse += circuit.speed;
    });
  }

  render() {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.circuits.forEach(circuit => {
      const pulse = Math.sin(circuit.pulse) * 0.5 + 0.5;

      this.ctx.strokeStyle = `rgba(0, 255, 100, ${0.3 + pulse * 0.5})`;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#00ff64';

      this.ctx.beginPath();
      circuit.path.forEach((point, i) => {
        if (i === 0) this.ctx.moveTo(point.x, point.y);
        else this.ctx.lineTo(point.x, point.y);

        // Draw nodes
        this.ctx.fillStyle = `rgba(0, 255, 100, ${pulse})`;
        this.ctx.fillRect(point.x - 3, point.y - 3, 6, 6);
      });
      this.ctx.stroke();
    });

    this.ctx.shadowBlur = 0;
  }
}

// Butterfly Swarm
export class ButterflySwarm extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { butterflyCount: 20, ...options });
    this.butterflies = [];
  }

  onResize() {
    this.butterflies = [];
    for (let i = 0; i < this.options.butterflyCount; i++) {
      this.butterflies.push({
        x: random(0, this.width),
        y: random(0, this.height),
        vx: random(-1, 1),
        vy: random(-1, 1),
        wingAngle: 0,
        color: randomColor()
      });
    }
  }

  update() {
    this.butterflies.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      b.wingAngle += 0.2;

      if (b.x < 0 || b.x > this.width) b.vx *= -1;
      if (b.y < 0 || b.y > this.height) b.vy *= -1;

      // Random direction changes
      if (Math.random() > 0.98) {
        b.vx += random(-0.5, 0.5);
        b.vy += random(-0.5, 0.5);
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(240, 248, 255, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.butterflies.forEach(b => {
      this.ctx.save();
      this.ctx.translate(b.x, b.y);

      const wingFlap = Math.sin(b.wingAngle) * 20;

      // Draw wings
      this.ctx.fillStyle = b.color;
      this.ctx.beginPath();
      this.ctx.ellipse(-5, 0, 10, 15 + wingFlap, -Math.PI / 4, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.ellipse(5, 0, 10, 15 + wingFlap, Math.PI / 4, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw body
      this.ctx.fillStyle = '#333';
      this.ctx.fillRect(-1, -10, 2, 20);

      this.ctx.restore();
    });
  }
}

// Meteor Shower
export class MeteorShower extends BaseAnimation {
  constructor(element, options = {}) {
    super(element, { meteorCount: 15, ...options });
    this.meteors = [];
  }

  onResize() {
    this.meteors = [];
    for (let i = 0; i < this.options.meteorCount; i++) {
      this.meteors.push(this.createMeteor());
    }
  }

  createMeteor() {
    return {
      x: random(0, this.width),
      y: random(-100, -10),
      vx: random(2, 5),
      vy: random(5, 10),
      length: random(40, 100),
      size: random(1, 3)
    };
  }

  update() {
    this.meteors.forEach((m, i) => {
      m.x += m.vx;
      m.y += m.vy;

      if (m.y > this.height || m.x > this.width) {
        this.meteors[i] = this.createMeteor();
      }
    });
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.meteors.forEach(m => {
      const gradient = this.ctx.createLinearGradient(
        m.x, m.y,
        m.x - m.vx * 10, m.y - m.vy * 10
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = m.size;
      this.ctx.beginPath();
      this.ctx.moveTo(m.x, m.y);
      this.ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10);
      this.ctx.stroke();
    });
  }
}
