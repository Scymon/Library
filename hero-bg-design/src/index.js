import { AnimationRegistry, getAvailableAnimations, getAnimation } from './AnimationRegistry.js';

/**
 * HeroBGDesign - Main library class
 */
class HeroBGDesign {
  constructor() {
    this.instances = new Map();
    this.observer = null;
  }

  /**
   * Initialize the library - automatically finds and animates elements
   */
  init() {
    // Find all elements with hero-bg-* classes
    this.scanAndInitialize();

    // Set up mutation observer to handle dynamically added elements
    this.setupObserver();

    return this;
  }

  /**
   * Scan the DOM and initialize animations
   */
  scanAndInitialize() {
    const animations = getAvailableAnimations();

    animations.forEach(className => {
      const elements = document.querySelectorAll(`.${className}`);

      elements.forEach(element => {
        this.createAnimation(element, className);
      });
    });
  }

  /**
   * Create and start an animation for an element
   */
  createAnimation(element, className) {
    // Check if already initialized
    if (this.instances.has(element)) {
      return this.instances.get(element);
    }

    const AnimationClass = getAnimation(className);

    if (!AnimationClass) {
      console.warn(`Animation "${className}" not found in registry`);
      return null;
    }

    // Get options from data attributes
    const options = this.getOptionsFromElement(element);

    // Create and start animation
    const animation = new AnimationClass(element, options);
    animation.start();

    // Store instance
    this.instances.set(element, {
      animation,
      className
    });

    return animation;
  }

  /**
   * Extract options from element data attributes
   */
  getOptionsFromElement(element) {
    const options = {};
    const dataset = element.dataset;

    // Convert data-hero-bg-* attributes to options
    Object.keys(dataset).forEach(key => {
      if (key.startsWith('heroBg')) {
        const optionKey = key.replace('heroBg', '');
        const optionName = optionKey.charAt(0).toLowerCase() + optionKey.slice(1);

        // Try to parse as JSON, otherwise use as string
        try {
          options[optionName] = JSON.parse(dataset[key]);
        } catch (e) {
          options[optionName] = dataset[key];
        }
      }
    });

    return options;
  }

  /**
   * Set up mutation observer to handle dynamic elements
   */
  setupObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.checkAndInitializeElement(node);

            // Check children too
            const children = node.querySelectorAll('*');
            children.forEach(child => this.checkAndInitializeElement(child));
          }
        });
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Check if an element has a hero-bg class and initialize if needed
   */
  checkAndInitializeElement(element) {
    const animations = getAvailableAnimations();

    animations.forEach(className => {
      if (element.classList.contains(className)) {
        this.createAnimation(element, className);
      }
    });
  }

  /**
   * Stop an animation for a specific element
   */
  stop(element) {
    const instance = this.instances.get(element);
    if (instance) {
      instance.animation.stop();
    }
  }

  /**
   * Start an animation for a specific element
   */
  start(element) {
    const instance = this.instances.get(element);
    if (instance) {
      instance.animation.start();
    }
  }

  /**
   * Destroy an animation for a specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (instance) {
      instance.animation.destroy();
      this.instances.delete(element);
    }
  }

  /**
   * Destroy all animations and clean up
   */
  destroyAll() {
    this.instances.forEach((instance) => {
      instance.animation.destroy();
    });

    this.instances.clear();

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Get all active animation instances
   */
  getInstances() {
    return this.instances;
  }
}

// Create global instance
const heroBGDesign = new HeroBGDesign();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    heroBGDesign.init();
  });
} else {
  heroBGDesign.init();
}

// Export for manual control
export default heroBGDesign;
export { AnimationRegistry, getAvailableAnimations, getAnimation };
