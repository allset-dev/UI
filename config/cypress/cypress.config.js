/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('cypress');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  downloadsFolder: './downloads',
  fixturesFolder: './fixtures',
  screenshotsFolder: './screenshots',
  videosFolder: './videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins')(on, config);
    },
    specPattern: '../../src/**/*.spec.{js,ts,jsx,tsx}',
    supportFile: './support',
  },
});
