/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const { PORT } = require('./env-variables');

function killPort() {
  try {
    const isPortBusy = execSync(`lsof -i:${PORT}`);

    if (isPortBusy) {
      console.log(`Killing process on port ${PORT}`);
      const stdout = execSync(`npx kill-port ${PORT}`);
      console.log(`${stdout}`);
    }
  } catch {
    console.log(`Port ${PORT} is free`);
  }
}

exports.killPort = killPort;
