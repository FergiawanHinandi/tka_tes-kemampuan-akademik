const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    alwaysOnTop: true,
    kiosk: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    },
  });

  win.loadFile('src/index.html');
  
  // Anti-cheat: Deteksi Multi-monitor
  const checkDisplays = () => {
    const displays = screen.getAllDisplays();
    if (displays.length > 1) {
      console.log('Multi-monitor detected!');
      win.webContents.send('security-alert', {
        type: 'CRITICAL',
        activity: `Terdeteksi ${displays.length} monitor aktif. Harap gunakan hanya satu monitor.`
      });
    }
  };

  // Cek saat startup dan saat ada perubahan monitor
  checkDisplays();
  screen.on('display-added', checkDisplays);
  screen.on('display-removed', checkDisplays);

  win.on('blur', () => {
    if (app.isReady()) {
      win.focus();
    }
  });

  // Anti-cheat: Cegah penutupan window secara paksa (kecuali lewat logout/selesai)
  win.on('close', (e) => {
    // e.preventDefault(); 
    // Aktifkan ini di produksi untuk mengunci total
  });
}

app.whenReady().then(() => {
  createWindow();

  // Anti-cheat: Registrasi global shortcut untuk mematikan shortcut berbahaya
  const shortcuts = [
    'Alt+Tab',
    'Alt+F4',
    'Control+C',
    'Control+V',
    'Control+Shift+I',
    'F12',
    'CommandOrControl+R'
  ];

  shortcuts.forEach(shortcut => {
    globalShortcut.register(shortcut, () => {
      console.log(`Blocked shortcut: ${shortcut}`);
      return false;
    });
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});
