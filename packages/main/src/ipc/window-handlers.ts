import { type IpcMain, type BrowserWindow, app, dialog } from 'electron';
import { IPC } from '@grimoire/shared';

export function registerWindowHandlers(
  ipcMain: IpcMain,
  win: BrowserWindow
): void {
  // App utilities
  ipcMain.handle(IPC.APP_GET_CWD, () => {
    return app.getPath('home');
  });

  // Dialog
  ipcMain.handle(IPC.DIALOG_OPEN_FOLDER, async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle(IPC.WINDOW_MINIMIZE, () => {
    win.minimize();
  });

  ipcMain.handle(IPC.WINDOW_MAXIMIZE, () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.handle(IPC.WINDOW_CLOSE, () => {
    win.close();
  });
}
