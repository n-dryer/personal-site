/**
 * Jest configuration (ESM) for running unit tests in this Vite + React project.
 * Uses babel-jest with React, TypeScript, and modern JS presets.
 */
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  testMatch: [
    '<rootDir>/src/styles/css-variables.test.ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
