/**
 * Base class for all background animations
 * Handles canvas creation, resizing, and animation loop
 */
export class BaseAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      fps: 60,
      alpha: true,
      ...options
    };

    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.isRunning = false;
    this.width = 0;
    this.height = 0;

    this.init();
  }

  init() {
    this.createCanvas();
    this.setupResizeObserver();
    this.resize();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';

    this.ctx = this.canvas.getContext('2d', { alpha: this.options.alpha });

    // Ensure element has position context
    const position = window.getComputedStyle(this.element).position;
    if (position === 'static') {
      this.element.style.position = 'relative';
    }

    this.element.appendChild(this.canvas);
  }

  setupResizeObserver() {
    const resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    resizeObserver.observe(this.element);
  }

  resize() {
    const rect = this.element.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.onResize?.();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.update();
    this.render();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // Override these in subclasses
  update() {}
  render() {}
  onResize() {}

  destroy() {
    this.stop();
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
