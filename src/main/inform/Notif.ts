import { is } from '@electron-toolkit/utils'
import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Tray,
  screen,
  Notification,
  NotificationConstructorOptions
} from 'electron'
import { join } from 'path'

export type NotifiType = 'Nomal' | 'Custom'

interface OptionsType extends BrowserWindowConstructorOptions {
  // 显示的hash路径
  hash?: string
  // 是否图标闪动
  isFlash?: boolean
  // 是否自动关闭刷新
  removeClose?: boolean
}

interface NomalOptionsType extends NotificationConstructorOptions {}

interface flashOptions {
  time: number //闪动的时间间隔
}
// 闪动图标，关闭函数
interface flashReturn {
  close: () => void
}

/*
需要传递Tray
内置提醒，配置对象，点击执行函数
自定义提醒（创建一个新窗口），是否闪动图标，新窗口配置对象，新窗口显示的路径
*/

// 默认显示图标
export const DEFAULTIMGURL = '../../resources/icon.png'
// 突变闪动时切换的图标
export const FLICKERIMGURL = '../../resources/empty-icon.png'

const defaultOptions: OptionsType = {
  width: 300,
  height: 100,
  show: false,
  frame: false,
  alwaysOnTop: true,
  isFlash: true
}
const defaultNomalOptions: NomalOptionsType = {
  title: '测试',
  icon: join(__dirname, DEFAULTIMGURL),
  body: '测试body'
}
let listenerFn: any = null
export class NotifiCoustom {
  // 是否离开的定时器
  protected leaveInter: any
  // 闪动图标的定时器
  protected flashInter: any
  protected trayBounds: any
  protected point: any
  protected isLeave: boolean = true
  protected tray: Tray
  protected messagePreview: any
  protected options: OptionsType | NomalOptionsType = defaultOptions
  constructor(tray: Tray) {
    this.tray = tray
  }
  // 显示
  show({
    type,
    options,
    clickFn
  }: {
    type: NotifiType
    options?: OptionsType | NomalOptionsType
    clickFn?: (event: any) => void
  }) {
    if (type === 'Nomal') {
      this.options = options ? { ...options, icon: defaultNomalOptions.icon } : defaultNomalOptions
      this.nomalNotification(clickFn)
    } else {
      this.options = options ? options : defaultOptions
      // 执行自定义(自定义图标闪动是固定的500ms)
      this.customNotification()
    }
  }

  // 闪动图标
  flashIcon(options: flashOptions): flashReturn {
    let count = 0
    if (this.flashInter) {
      clearInterval(this.flashInter)
    }
    this.flashInter = setInterval(() => {
      count += 1
      if (count % 2 === 0) {
        this.tray.setImage(join(__dirname, DEFAULTIMGURL))
      } else {
        this.tray.setImage(join(__dirname, FLICKERIMGURL))
      }
    }, options.time)

    return { close: this.close.bind(this) }
  }
  // 关闭闪动
  close() {
    clearInterval(this.flashInter)
    this.tray.setImage(join(__dirname, DEFAULTIMGURL))
  }
  // 移除监听事件
  removeListener() {
    this.tray.removeListener('mouse-move', listenerFn)
    listenerFn = null
  }

  private nomalNotification(clickFn?: (event: any) => void) {
    new Notification(this.options)
      .on('click', (event) => {
        clickFn && clickFn(event)
      })
      .show()
  }

  private customNotification() {
    this.customInit()
  }

  private listener() {
    // 鼠标移入停止闪烁
    this.close()
    if (this.isLeave) {
      this.messagePreview = new BrowserWindow(this.options)
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        this.messagePreview.loadURL(
          `${process.env['ELECTRON_RENDERER_URL']}/#${(this.options as OptionsType).hash}`
        )
      } else {
        this.messagePreview.loadFile(join(__dirname, '../renderer/index.html'), {
          hash: (this.options as OptionsType).hash
        })
      }
      const position = this.tray.getBounds()
      this.messagePreview.setPosition(position.x, position.y - 100)
      this.messagePreview.show()
      //触发mouse-enter
      this.isLeave = false
      this.checkTrayLeave()
    }
  }

  private customInit() {
    if ((this.options as OptionsType).isFlash) {
      this.flashIcon({ time: 500 })
    }
    // 监听过了，不再监听
    if (listenerFn) {
      this.close()
      return
    }
    listenerFn = this.listener.bind(this)
    this.tray.on('mouse-move', listenerFn)
  }

  private checkTrayLeave() {
    clearInterval(this.leaveInter)
    this.leaveInter = setInterval(() => {
      this.trayBounds = this.tray.getBounds()
      this.point = screen.getCursorScreenPoint()
      if (
        !(
          this.trayBounds.x < this.point.x &&
          this.trayBounds.y < this.point.y &&
          this.point.x < this.trayBounds.x + this.trayBounds.width &&
          this.point.y < this.trayBounds.y + this.trayBounds.height
        )
      ) {
        //触发mouse-leave
        if (
          this.point.x - this.trayBounds.x < 0 ||
          this.point.x - this.trayBounds.x > (this.options as any).width ||
          this.point.y < this.trayBounds.y - (this.options as any).height
        ) {
          this.isLeave = true
          if ((this.options as OptionsType).removeClose) {
            this.removeListener()
          }
          this.messagePreview.close()
          clearInterval(this.leaveInter)
        }
      }
    }, 100)
  }
}
