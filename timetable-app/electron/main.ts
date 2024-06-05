import { BrowserWindow } from 'electron';
import * as path from 'path';

// mainWindow는 어딘가에 정의되어 있어야 합니다. 예를 들어, main process에서 생성된 window를 참조합니다.
declare const mainWindow: BrowserWindow;

const createPopup = (): void => {
  let popupWindow: BrowserWindow | null = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    modal: true,
  });

  popupWindow.loadFile(path.join(__dirname, '../popup.html')).then(() => {
    console.log('Popup window loaded successfully.');
  }).catch((err) => {
    console.error('Failed to load popup window', err);
  });

  popupWindow.on('closed', () => {
    popupWindow = null;
  });
};
