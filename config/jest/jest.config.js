/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const path = require('path');

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
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
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
};
