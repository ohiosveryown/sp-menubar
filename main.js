const { app, BrowserWindow, ipcMain, Tray, nativeImage } = require('electron')
const path = require('path')

const assetsDir = path.join(__dirname, 'assets')

let tray = undefined
let window = undefined

app.on('ready', () => {
  let icon = nativeImage.createFromDataURL(base64Icon)
  tray = new Tray(icon)

  tray.on('click', function(event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })

  // Don't show the app in the doc
  app.dock.hide()

  window = new BrowserWindow({
    width: 400,
    height: 288,
    show: false,
    frame: false,
    resizable: false,
  })

  window.loadURL(`file://${path.join(__dirname, 'index.html')}`)

  window.on('blur', () => {
    if(!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
})

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = window.getBounds()
  let x, y = 0
  if (process.platform == 'darwin') {
    x = Math.round(trayPos.x + 0)
    y = Math.round(trayPos.y + 30)
  } else {
    x = Math.round(trayPos.x + 0)
    y = Math.round(trayPos.y + 30)
  }


  window.setPosition(x, y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Tray Icon
let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAABGdBTUEAALGPC/xhBQAAAJVJREFUSA3tVAsKgCAMlW7XrdZZ6x61QQ9GMLehRYgPxJXvYyMtZWLUDqz8YTuPUw3i2gLxguaKVjzCyITBlLh4hmLNnSF0iQbB1C+G4LXXtcCtITWtpYYwSHt4wGuAuUc7Uh7yW6cEzNcgfhCPMMxzFHQw9bVjEfTO0azA47bBTilgKxzwhQ4PqV18fnm7O5qE33TgAgLcMCmttPafAAAAAElFTkSuQmCC`
