import { CapacitorConfig } from '@capacitor/cli';
import { address } from 'ip';

import { PORT } from './config/env-variables';

const config: CapacitorConfig = {
  appId: 'io.ionic.allset',
  appName: 'allset',
  webDir: 'build',
  cordova: {},
  bundledWebRuntime: false,
  server: {
    url: `http://${address()}:${PORT}/`,
    cleartext: true,
  },
};

export default config;
