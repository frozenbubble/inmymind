const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const template = require('./menu.js');

require('electron-debug')({showDevTools: true});

let mainWindow;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    let menu = electron.Menu.buildFromTemplate(template);
    electron.Menu.setApplicationMenu(null);

    mainWindow = new BrowserWindow({width: 1200, height: 720});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null
    });
});