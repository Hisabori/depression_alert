import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;
let popupWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../www/index.html')).then(() => {
    console.log("Main window loaded successfully.");
  }).catch((err) => {
    console.error("Failed to load main window:", err);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createPopup() {
  // @ts-ignore
  // @ts-ignore
  popupWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  popupWindow.loadFile(path.join(__dirname, '../www/popup.html')).then(() => {
    console.log("Popup window loaded successfully.");
  }).catch((err) => {
    console.error("Failed to load popup window:", err);
  });

  popupWindow.on('closed', () => {
    popupWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('open-popup', () => {
  if (popupWindow === null) {
    createPopup();
  }
});
