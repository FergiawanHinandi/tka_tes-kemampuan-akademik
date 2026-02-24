import { app, BrowserWindow } from 'electron'

function createMainWindow(): void {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 640,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  })

  const page = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TKA Client Siswa</title>
        <style>
          :root { font-family: Segoe UI, sans-serif; color: #0f172a; background: #f8fafc; }
          body { margin: 0; min-height: 100vh; display: grid; place-items: center; }
          section { max-width: 640px; border: 1px solid #cbd5e1; border-radius: 16px; background: #ffffff; padding: 24px; }
          h1 { margin: 0 0 8px 0; font-size: 24px; }
          p { margin: 0; line-height: 1.6; color: #475569; }
        </style>
      </head>
      <body>
        <section>
          <h1>TKA Client Siswa</h1>
          <p>Aplikasi peserta untuk mengerjakan ujian dengan mode terkontrol.</p>
        </section>
      </body>
    </html>
  `

  void window.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(page)}`)
}

void app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
