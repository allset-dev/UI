import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.allset',
  appName: 'allset',
  webDir: 'build',
  cordova: {},
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.84:3001/',
    cleartext: true,
  },
};

export default config;
