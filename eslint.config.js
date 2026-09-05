const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'assets/scripts/vendor.js',
      'basics-10-function-refactoring/assets/scripts/vendor.js',
      '**/*.min.js'
    ]
  },
  {
    files: ['__tests__/**/*.js', '**/*.test.js', '**/*.spec.js', 'jest.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'error'
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.node,
        renderHeader: 'writable',
        replaceHeader: 'writable',
        userInput: 'readonly',
        outputResult: 'readonly',
        addBtn: 'readonly',
        subtractBtn: 'readonly',
        multiplyBtn: 'readonly',
        divideBtn: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'error',
      'no-redeclare': 'off'
    }
  }
];



