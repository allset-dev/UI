/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const path = require('path');

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': path.resolve(__dirname, './jest-mock-scss.js'),
  },
  rootDir: process.cwd(),
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: [`/node_modules/(?!@ionic|ionicons|gsap|@stencil)`],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
};
