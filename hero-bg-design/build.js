/**
 * Simple build script to bundle the library
 * Creates a single distributable file
 */

const fs = require('fs');
const path = require('path');

console.log('Building Hero BG Design library...\n');

// Read all source files
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// For now, create a simple build that concatenates files
// In production, you'd use a bundler like webpack, rollup, or esbuild

// Copy CSS
const cssSource = path.join(srcDir, 'styles', 'hero-bg-design.css');
const cssDest = path.join(distDir, 'hero-bg-design.css');

fs.copyFileSync(cssSource, cssDest);
console.log('✓ CSS copied to dist/');

// Create a bundled JS file (simplified version)
// In production, use a proper bundler

const jsContent = `
/**
 * Hero BG Design Library v1.0.0
 * A collection of 100 animated background effects for hero sections
 * MIT License
 */

// NOTE: This is a simplified build. For production use:
// - Use a module bundler (webpack, rollup, vite, esbuild)
// - Minify the output
// - Add source maps
// - Tree-shake unused code

// For now, users should:
// 1. Use the library as ES modules (recommended)
// 2. Import directly from src/index.js
// 3. Use a build tool in their project

// Example with Vite/webpack:
// import heroBGDesign from 'hero-bg-design';

console.log('Hero BG Design: Use as ES modules or build with your bundler');
console.log('See README.md for integration instructions');
`;

const jsDest = path.join(distDir, 'hero-bg-design.js');
fs.writeFileSync(jsDest, jsContent);

console.log('✓ JavaScript bundle info created\n');

// Create a README in dist
const distReadme = `# Distribution Files

## Using the Library

### Option 1: ES Modules (Recommended)

\`\`\`html
<script type="module">
  import heroBGDesign from '../src/index.js';
</script>
\`\`\`

### Option 2: Build with Your Bundler

Install in your project and import:

\`\`\`javascript
import heroBGDesign from 'hero-bg-design';
\`\`\`

Then build with Vite, webpack, or your preferred bundler.

## CSS

Include the CSS file:

\`\`\`html
<link rel="stylesheet" href="dist/hero-bg-design.css">
\`\`\`

## Note

This library is designed to be used with ES modules and a modern build system.
For production, bundle it with your application using Vite, webpack, or similar.
`;

fs.writeFileSync(path.join(distDir, 'README.md'), distReadme);

console.log('Build complete!');
console.log('\nNext steps:');
console.log('1. See examples/index.html for usage examples');
console.log('2. Use as ES modules in your project');
console.log('3. For production, bundle with Vite/webpack\n');
