import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'node:path';
import { AgentManager } from './services/agent-manager.js';
import { registerAgentHandlers } from './ipc/agent-handlers.js';
import { registerWindowHandlers } from './ipc/window-handlers.js';

let mainWindow: BrowserWindow | null = null;
let agentManager: AgentManager;

function setupContentSecurityPolicy() {
  const isDev = !app.isPackaged && process.env.ELECTRON_IS_PACKAGED !== 'true';

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = [
      "default-src 'self'",
      // In dev, allow Vite dev server; in prod, only self
      `script-src 'self'${isDev ? " 'unsafe-inline'" : ''}`,
      `style-src 'self' 'unsafe-inline'`,
      `connect-src 'self'${isDev ? ' ws://localhost:* http://localhost:*' : ''}`,
      `img-src 'self' data:`,
      `font-src 'self' data:`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ');

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp],
      },
    });
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    backgroundColor: '#0a0a0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false, // needed for preload to use Node APIs
    },
  });

  // In dev, load from Vite dev server; in prod, load the built file
  // Allow CI testing by checking ELECTRON_IS_PACKAGED env var
  const isDev = !app.isPackaged && process.env.ELECTRON_IS_PACKAGED !== 'true';
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(
      path.join(__dirname, '../../renderer/dist/index.html')
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

app.whenReady().then(() => {
  agentManager = new AgentManager();

  // Set up Content Security Policy before creating windows
  setupContentSecurityPolicy();

  const win = createWindow();

  // Register IPC handlers
  registerAgentHandlers(ipcMain, agentManager, win);
  registerWindowHandlers(ipcMain, win);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const newWin = createWindow();
      registerAgentHandlers(ipcMain, agentManager, newWin);
      registerWindowHandlers(ipcMain, newWin);
    }
  });
});

app.on('window-all-closed', () => {
  agentManager.dispose();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
