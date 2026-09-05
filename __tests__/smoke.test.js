const fs = require('fs');
const path = require('path');

describe('Static site smoke tests', () => {
  describe('HTML files', () => {
    it('index.html exists and contains <html> tags', () => {
      const filePath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
    });

    it('about.html exists and contains <html> tags', () => {
      const filePath = path.join(__dirname, '..', 'about.html');
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
    });
  });

  describe('CSS files', () => {
    it('assets/styles/app.css exists and is non-empty', () => {
      const filePath = path.join(__dirname, '..', 'assets', 'styles', 'app.css');
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);
    });
  });

  describe('JS files', () => {
    it('assets/scripts/home.js exists and is non-empty', () => {
      const filePath = path.join(__dirname, '..', 'assets', 'scripts', 'home.js');
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);
    });
  });
});

