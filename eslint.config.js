import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
// Add TS resolver to support path aliases
const tsResolver = {
  typescript: {
    // Use project's tsconfig for paths
    project: './tsconfig.json',
  },
};
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  // Global variables for browser and node environments
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
  },

  // JavaScript and TypeScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ...tsResolver,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      // React recommended rules
      ...reactPlugin.configs.recommended.rules,

      // TypeScript recommended rules
      ...typescriptEslintPlugin.configs.recommended.rules,

      // Custom rules
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off',
      'react/display-name': 'off', // Allow anonymous components in tests
      'react/no-unknown-property': [
        'error',
        { ignore: ['animate', 'transition', 'initial', 'layout'] },
      ], // Framer Motion props
      'no-unused-vars': 'off', // Using TypeScript's version instead
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error', // Enforce no-any as an error
      '@typescript-eslint/no-require-imports': 'off', // Allow require in tests
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'tailwindcss/classnames-order': 'warn', // Warn instead of error
    },
  },

  // Test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },

  // Ignore patterns - removed TypeScript file ignores
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'dist/**',
      'coverage/**',
      '**/*.min.js',
      'eslint.config.js',
    ],
  },
];
