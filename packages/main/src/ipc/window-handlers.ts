import { type IpcMain, type BrowserWindow, app } from 'electron';
import { IPC } from '@grimoire/shared';

export function registerWindowHandlers(
  ipcMain: IpcMain,
  win: BrowserWindow
): void {
  // App utilities
  ipcMain.handle(IPC.APP_GET_CWD, () => {
    return app.getPath('home');
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
