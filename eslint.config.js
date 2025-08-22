import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Add the plugins section
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Add the simple-import-sort rule with your custom groups
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Side effect imports
            ['^\\u0000'],
            // 2. React and packages
            ['^react$', '^@?\\w'],
            // 3. Absolute imports and other imports
            ['^@', '^'],
            // 4. Relative imports from the same folder "./"
            ['^\\./'],
            // 5. Style module imports
            ['^.+\\.(module.css|module.scss)$'],
            // 6. Media imports
            ['^.+\\.(gif|png|svg|jpg)$'],
          ],
        },
      ],
    },
  },
]);