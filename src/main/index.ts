import { app, shell, BrowserWindow, globalShortcut, ipcMain, Tray } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getData, postDataUploadFile } from './interface'
import { NotifiCoustom } from './inform/Notif'
import { addMenus } from './menus'

let tray: Tray
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  tray = new Tray(join(__dirname, '../../resources/icon.png'))
  addMenus(mainWindow, tray)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 配置刷新快捷键
  globalShortcut.register('F5', () => {
    mainWindow.reload()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // 监听接口事件
  ipcMain.handle('interface-GET', async (_event, url: string, data: any) => {
    const res = await getData(url, data)
    return res
  })
  ipcMain.handle(
    'interface-POST-File',
    async (_event, url: string, data: any, filePath: string) => {
      const res = await postDataUploadFile(url, data, filePath)
      return res
    }
  )
  // 系统通知全部原生通知
  ipcMain.handle('public-notic', (_event, message: string, title: string) => {
    const notif = new NotifiCoustom(tray)
    notif.show({
      type: 'Nomal',
      options: {
        title,
        body: message
      }
    })
  })
  ipcMain.handle('', () => {})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
