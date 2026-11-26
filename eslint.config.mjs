import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['playwright-report/**', 'test-results/**', 'blob-report/**', 'playwright/.cache/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
];
