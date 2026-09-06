import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  // Ignore patterns
  {
    ignores: ['dist/', 'node_modules/', '.astro/'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Astro recommended rules
  ...astro.configs.recommended,

  // Astro-specific rule overrides
  {
    files: ['**/*.astro'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },

  // JS/TS/Astro file rule overrides
  {
    files: ['**/*.{js,ts,astro}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];



