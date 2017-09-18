const {app, BrowserWindow, ipcMain, Tray, nativeImage} = require('electron')
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
    y = Math.round(trayPos.y + 0)
  } else {
    x = Math.round(trayPos.x + 0)
    y = Math.round(trayPos.y + 0)
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
let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAABGdBTUEAALGPC/xhBQAAAI9JREFUSA3tVEEOwCAIM3vCfrVfsbfuIa4ceiEkgjMxZpIYlLVFyKSUbX/pwIVCH6xqluDsmSBoscpXnbBlElJUsPES83vTk3w2kT5AedTwEU40TchoHA6YoZubTp/mS2ciSxulY3UXP49qS0pH/94UAXhrgoDqhG3ak9EbfhkO4QoJnDIGpwx8Vrz9eh14ASwtPl0K+AaWAAAAAElFTkSuQmCC`
