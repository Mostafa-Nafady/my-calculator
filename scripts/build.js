'use strict';

/**
 * Build script: copies the entire project root to dist/,
 * excluding node_modules, .git, dist, and scripts directories.
 * Uses rimraf to clean dist/ first if it exists.
 */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

// Directories to exclude from the copy
const excludedDirs = ['node_modules', '.git', 'dist', 'scripts'];

/**
 * Filter function for fs.cpSync — skips excluded directories.
 * @param {string} src - Source path being considered for copy
 * @returns {boolean} True if the path should be copied, false to skip
 */
function filter(src) {
  const relative = path.relative(projectRoot, src);
  if (!relative) {
    return true; // root itself
  }
  const topLevel = relative.split(path.sep)[0];
  return !excludedDirs.includes(topLevel);
}

// Clean dist/ if it already exists
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist/ directory...');
  rimraf.sync(distDir);
}

// Copy project root to dist/
console.log('Copying project files to dist/...');
fs.cpSync(projectRoot, distDir, {
  recursive: true,
  filter: filter
});

console.log('Build complete! Output is in dist/');

