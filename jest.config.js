module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'assets/scripts/**/*.js',
    '!assets/scripts/vendor.js',
    '!**/vendor.js'
  ],
  coverageDirectory: 'coverage',
  passWithNoTests: true,
  verbose: true
};

