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
    console.log('starting')

    let menu = electron.Menu.buildFromTemplate(template);
    electron.Menu.setApplicationMenu(null);

    mainWindow = new BrowserWindow({
        width: 1200, 
        height: 720,
        // only for debuggint purposes
        webPreferences: {
            webSecurity: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    mainWindow.webContents.on('did-navigate-in-page', (event, url) => {
        console.log(`in page: ${url}`);
    });

    mainWindow.webContents.on('did-navigate', (event, url) => {
        console.log(`navigated to: ${url}`);
    });
});