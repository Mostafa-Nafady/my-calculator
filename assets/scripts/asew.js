/**
 * ASEW Page Script
 * Handles header rendering and initialization for the ASEW calculator page
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'ASEW Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD Calculator', href: 'asd.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' },
      { label: 'UYT Calculator', href: 'uyt/index.html' }
    ]);
  } else {
    console.error('renderHeader function not found. Make sure Header.js is loaded.');
  }
});

