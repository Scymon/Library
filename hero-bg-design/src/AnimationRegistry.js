// Import all animations
import { GooeyMetaballs } from './animations/GooeyMetaballs.js';
import { ParticleNetworks } from './animations/ParticleNetworks.js';
import { FlowingGradientFields } from './animations/FlowingGradientFields.js';
import { NeonWavePulses } from './animations/NeonWavePulses.js';
import { RibbonTrails } from './animations/RibbonTrails.js';
import { AuroraGradients } from './animations/AuroraGradients.js';
import { VortexSwirls } from './animations/VortexSwirls.js';
import { ConfettiBursts } from './animations/ConfettiBursts.js';
import { StarfieldDepth } from './animations/StarfieldDepth.js';
import { MatrixRain } from './animations/MatrixRain.js';
import {
  FireSmoke,
  WaterRipples,
  BokehLights,
  FractalTrees,
  PlasmaEffects,
  GlitchDistortion,
  LavaLampBlobs,
  SnowfallParticles,
  RainDrops,
  FireworksExplosion,
  FloatingBubbles,
  HeartbeatPulse,
  RetroGrid
} from './animations/AllAnimations.js';
import {
  WormholeTunnel,
  KaleidoscopeSymmetry,
  PerlinNoiseClouds,
  ElectricArcs,
  OrbitalTrails,
  NeuralNetwork,
  GalaxySpiral,
  PixelatedDistortion,
  CircuitBoard,
  ButterflySwarm,
  MeteorShower
} from './animations/MoreAnimations.js';
import {
  HologramFlicker,
  VineGrowth,
  SandDunes,
  OceanWaves,
  MosaicReveal,
  DNAHelix,
  ClockworkGears,
  LeafFall,
  CometTails,
  FogLayers,
  Bioluminescence,
  FractalFlames,
  SoundWaveVisualizer
} from './animations/FinalAnimations.js';

/**
 * Registry mapping CSS class names to animation constructors
 */
export const AnimationRegistry = {
  // 1-10
  'hero-bg-gooey-metaballs': GooeyMetaballs,
  'hero-bg-particle-networks': ParticleNetworks,
  'hero-bg-flowing-gradient-fields': FlowingGradientFields,
  'hero-bg-neon-wave-pulses': NeonWavePulses,
  'hero-bg-ribbon-trails': RibbonTrails,
  'hero-bg-aurora-gradients': AuroraGradients,
  'hero-bg-vortex-swirls': VortexSwirls,
  'hero-bg-confetti-bursts': ConfettiBursts,
  'hero-bg-starfield-depth': StarfieldDepth,
  'hero-bg-matrix-rain': MatrixRain,

  // 11-20
  'hero-bg-fire-smoke': FireSmoke,
  'hero-bg-water-ripples': WaterRipples,
  'hero-bg-bokeh-lights': BokehLights,
  'hero-bg-fractal-trees': FractalTrees,
  'hero-bg-plasma-effects': PlasmaEffects,
  'hero-bg-glitch-distortion': GlitchDistortion,
  'hero-bg-pixelated-distortion': PixelatedDistortion,
  'hero-bg-orbital-trails': OrbitalTrails,
  'hero-bg-lava-lamp-blobs': LavaLampBlobs,
  'hero-bg-snowfall-particles': SnowfallParticles,

  // 21-30
  'hero-bg-rain-drops': RainDrops,
  'hero-bg-fireworks-explosion': FireworksExplosion,
  'hero-bg-floating-bubbles': FloatingBubbles,
  'hero-bg-wormhole-tunnel': WormholeTunnel,
  'hero-bg-kaleidoscope-symmetry': KaleidoscopeSymmetry,
  'hero-bg-perlin-noise-clouds': PerlinNoiseClouds,
  'hero-bg-electric-arcs': ElectricArcs,
  'hero-bg-heartbeat-pulse': HeartbeatPulse,
  'hero-bg-vine-growth': VineGrowth,
  'hero-bg-crystal-growth': VineGrowth, // Similar to vine growth

  // 31-40
  'hero-bg-sand-dunes': SandDunes,
  'hero-bg-ocean-waves': OceanWaves,
  'hero-bg-galaxy-spiral': GalaxySpiral,
  'hero-bg-neural-network': NeuralNetwork,
  'hero-bg-circuit-board': CircuitBoard,
  'hero-bg-hologram-flicker': HologramFlicker,
  'hero-bg-magnetic-fields': OrbitalTrails, // Similar orbital pattern
  'hero-bg-butterfly-swarm': ButterflySwarm,
  'hero-bg-leaf-fall': LeafFall,
  'hero-bg-comet-tails': CometTails,

  // 41-50
  'hero-bg-fog-layers': FogLayers,
  'hero-bg-gem-reflections': BokehLights, // Similar light effects
  'hero-bg-ink-bleed': GooeyMetaballs, // Similar blob effects
  'hero-bg-tessellation-patterns': FlowingGradientFields, // Similar pattern approach
  'hero-bg-mandelbrot-zoom': FractalTrees, // Fractal-based
  'hero-bg-bioluminescence': Bioluminescence,
  'hero-bg-retro-grid': RetroGrid,
  'hero-bg-sound-wave-visualizer': SoundWaveVisualizer,
  'hero-bg-portal-rings': HeartbeatPulse, // Similar expanding rings
  'hero-bg-shard-explosion': ConfettiBursts, // Similar particle explosion

  // 51-60
  'hero-bg-vine-entangle': VineGrowth,
  'hero-bg-aurora-borealis': AuroraGradients,
  'hero-bg-ember-drift': FireSmoke,
  'hero-bg-bubble-cluster': FloatingBubbles,
  'hero-bg-lightning-storm': ElectricArcs,
  'hero-bg-flower-bloom': VineGrowth, // Similar growth pattern
  'hero-bg-clockwork-gears': ClockworkGears,
  'hero-bg-dna-helix': DNAHelix,
  'hero-bg-solar-flares': ElectricArcs, // Similar arc pattern
  'hero-bg-mosaic-reveal': MosaicReveal,

  // 61-70
  'hero-bg-heat-haze': FlowingGradientFields, // Similar wave distortion
  'hero-bg-feather-drift': LeafFall, // Similar falling pattern
  'hero-bg-rune-glow': Bioluminescence, // Similar pulsing glows
  'hero-bg-pixel-rain': MatrixRain, // Similar falling effect
  'hero-bg-nebula-clouds': PerlinNoiseClouds,
  'hero-bg-ripple-pond': WaterRipples,
  'hero-bg-vine-lattice': VineGrowth,
  'hero-bg-spark-trails': RibbonTrails, // Similar trail effect
  'hero-bg-frost-patterns': VineGrowth, // Similar growth pattern
  'hero-bg-echo-waves': HeartbeatPulse,

  // 71-80
  'hero-bg-swarm-intelligence': ParticleNetworks, // Similar particle behavior
  'hero-bg-crystal-cave': BokehLights, // Similar reflective lights
  'hero-bg-wind-currents': FlowingGradientFields, // Similar flowing pattern
  'hero-bg-luminous-jellyfish': FloatingBubbles, // Similar floating entities
  'hero-bg-geometric-morph': KaleidoscopeSymmetry,
  'hero-bg-volcanic-ash': FireSmoke,
  'hero-bg-butterfly-migration': ButterflySwarm,
  'hero-bg-holographic-grid': RetroGrid,
  'hero-bg-ink-swirls': LavaLampBlobs, // Similar blob mixing
  'hero-bg-starburst-rays': StarfieldDepth, // Similar star pattern

  // 81-90
  'hero-bg-cobweb-growth': VineGrowth,
  'hero-bg-pulsar-beats': HeartbeatPulse,
  'hero-bg-coral-reef': VineGrowth, // Similar organic growth
  'hero-bg-meteor-shower': MeteorShower,
  'hero-bg-fog-roll': FogLayers,
  'hero-bg-rune-circle': KaleidoscopeSymmetry, // Similar rotating pattern
  'hero-bg-vine-bloom': VineGrowth,
  'hero-bg-echo-particles': ParticleNetworks, // Similar particle trails
  'hero-bg-fractal-flames': FractalFlames,
  'hero-bg-biolume-waves': Bioluminescence,

  // 91-100
  'hero-bg-shard-drift': FloatingBubbles, // Similar floating pattern
  'hero-bg-neural-pulse': NeuralNetwork,
  'hero-bg-sandstorm': SandDunes, // Similar sand movement
  'hero-bg-feather-storm': LeafFall,
  'hero-bg-portal-vortex': VortexSwirls,
  'hero-bg-crystal-pulse': Bioluminescence, // Similar pulsing effect
  'hero-bg-ink-drop': GooeyMetaballs, // Similar blob spreading
  'hero-bg-lightning-web': ElectricArcs,
  'hero-bg-aurora-rings': HeartbeatPulse, // Similar expanding rings
  'hero-bg-galaxy-birth': GalaxySpiral
};

/**
 * Get all available animation class names
 */
export function getAvailableAnimations() {
  return Object.keys(AnimationRegistry);
}

/**
 * Get animation constructor by class name
 */
export function getAnimation(className) {
  return AnimationRegistry[className];
}
