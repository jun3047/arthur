const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

/** 메인 창 생성 */
function createWindow() {
  
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true  
    }
  }
)

  /** 시작 URL 또는 파일 */
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  /** 시작 포인트 실행 */
  win.loadURL(startUrl);
}

/* Electron =====================================================*/

/** 초기화가 끝나게 되면 실행 */
app.on('ready', () => {
  // 메인 창 생성
  createWindow();
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on('window-all-closed', () => {
  app.quit();
});