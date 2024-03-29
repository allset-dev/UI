/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, screen: electronScreen } = require('electron');
const { PORT } = require('../env-variables');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
    },
  });
  const startURL = `http://localhost:${PORT}`;
  //   process.env.ELECTRON_START_URL || url.format({
  //   pathname: path.join(__dirname, '../index.html'),
  //   protocol: 'file:',
  //   slashes: true,
  // });

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // mainWindow.webContents.on('new-window', (event, url) => {
  //   event.preventDefault();
  //   mainWindow.loadURL(url);
  // });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
