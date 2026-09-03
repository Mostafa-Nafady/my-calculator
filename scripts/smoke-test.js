'use strict';

/**
 * Smoke test: verifies that all expected HTML files exist and are non-empty.
 * Exits with code 1 if any check fails, 0 on success.
 */

const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'about.html',
  'addop.html',
  'aqwss.html',
  'asd.html',
  'ASDSFSF.html',
  'basics-10-function-refactoring/index.html',
  'basics-10-function-refactoring/home.html',
  'xpy/index.html',
  'uyt/index.html'
];

const projectRoot = path.resolve(__dirname, '..');

let allPassed = true;

console.log('Running smoke tests for HTML files...\n');

htmlFiles.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  let exists = false;
  let nonEmpty = false;
  let size = 0;

  if (fs.existsSync(filePath)) {
    exists = true;
    const stat = fs.statSync(filePath);
    size = stat.size;
    if (size > 0) {
      nonEmpty = true;
    }
  }

  const passed = exists && nonEmpty;
  if (!passed) {
    allPassed = false;
  }

  const status = passed ? 'PASS' : 'FAIL';
  let detail = '';
  if (!exists) {
    detail = 'file not found';
  } else if (!nonEmpty) {
    detail = 'file is empty (0 bytes)';
  } else {
    detail = `${size} bytes`;
  }

  console.log(`  [${status}] ${file} — ${detail}`);
});

console.log('\n--- Summary ---');
if (allPassed) {
  console.log(`All ${htmlFiles.length} HTML files passed checks.`);
  process.exit(0);
} else {
  console.log(`Some HTML files failed checks. See details above.`);
  process.exit(1);
}

