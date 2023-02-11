const { app, BrowserWindow } = require('electron');
const path = require('path');

// This removes the security warning that comes with having
// node integration enabled, but that's needed...
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 920,
        icon: path.join(__dirname, '../../img/logo_small.ico'),
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    win.loadURL(`file://${__dirname}/../../../public/index.html`);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    });
}

// Create window once app ready
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

// Listen for IPC messages from the renderer process
app.on('web-contents-created', (event, contents) => {
    contents.on('ipc-message', (event, channel, data) => {
        switch(channel) {
            case 'minimize-window': win.minimize(); break;
            case 'maximize-window': win.maximize(); break;
            case 'unmaximize-window': win.unmaximize(); break;
            case 'close-window': win.close(); break;
        }
    });
});