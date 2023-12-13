import { app, Menu, type BrowserWindow, type Tray } from 'electron'

export function addMenus(win: BrowserWindow, tray: Tray) {
  const trayMenuTemplate = [
    {
      label: '打开',
      click: () => {
        win.show()
      }
    },
    {
      label: '退出',
      click: () => {
        app.quit()
        app.quit() //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ]
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  //设置此托盘图标的悬停提示内容
  tray.setToolTip('coderHelper')
  //设置此图标的上下文菜单
  tray.setContextMenu(contextMenu)
  //单击右下角小图标显示应用左键
  tray.on('click', function () {
    win.show()
  })
  //右键
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayMenuTemplate as unknown as Menu)
  })
}
