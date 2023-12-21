// main.js
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 864,
    height: 936,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 특정 URL을 로드합니다.
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', function () {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
