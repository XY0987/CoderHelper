import * as monaco from 'monaco-editor'
import { debounceFn, getQuery, FileLoader, encode, decode, define, setQuery } from './utils'
import {
  OptionsType,
  ResourceType,
  PublicConfigType,
  LocalFileType,
  DefaultConfigType,
  EventsType,
  LoadersType
} from '@renderer/types/coderBox'
import { allIcon } from './config'
import HTMLLoader from './loader/html-loader'

import prettier from 'prettier/standalone'
import parserTypeScript from 'prettier/plugins/typescript'
import parseBabel from 'prettier/plugins/babel'
import parseHtml from 'prettier/plugins/html'
import parseEsTree from 'prettier/plugins/estree'
import parseMd from 'prettier/plugins/markdown'
import parseCss from 'prettier/plugins/postcss'

import './style/index.scss'
import './style/theme.scss'

// let name = '1.0'
let version = '1.0'

export default class MiniCoderBox {
  static version = version
  static encode = encode
  static decode = decode
  readonly version = version
  el!: HTMLDivElement
  files: { [filename: string]: LocalFileType } = {}
  fileList!: Required<LocalFileType>[]
  loaders!: LoadersType
  resource!: Required<ResourceType>
  publicConfig!: Required<PublicConfigType>
  defaultConfig!: Required<DefaultConfigType>
  events!: Required<EventsType>
  editor!: any
  fileIndex: number = 0
  currFile!: LocalFileType
  currTemplate!: LocalFileType
  templateTypeSet!: Set<string>
  loading = false
  isClick = false
  iframe!: HTMLIFrameElement
  loadEl!: HTMLDivElement
  codeEl!: HTMLDivElement
  editorEl!: HTMLDivElement
  lineEl!: HTMLDivElement
  bodyEl!: HTMLDivElement
  ldqResource: string[] = []
  public run: Function
  type: string | undefined
  // 初始化
  constructor(options = {} as OptionsType) {
    this.type = options.type ? options.type : 'react'
    this.initRegLanguange()
    // 初始化配置项
    this.initOptions(options)
    // 初始化一些 getter
    define(this, 'currFile', () => this.fileList[this.fileIndex])
    // 设置防抖
    this.run = this.render
    // 初始化
    this.init().then(() => {
      this.events.onLoad?.()
    })
  }

  // 初始化配置项
  initOptions(options: OptionsType) {
    const query = getQuery()
    // 初始化loader
    this.loaders = {
      '.html': [HTMLLoader],
      ...options.loaders
    }
    this.templateTypeSet = new Set(Object.keys(this.loaders).concat('.html'))
    // 初始化 files
    this.fileIndex = 0
    this.fileList = Object.keys(options.files || {}).map((filename) => {
      const file = options.files![filename]
      const htmlStr = decode(query[file.urlField || ''])
      const _file = {
        defaultValue: '',
        cssLibs: [],
        jsLibs: [],
        css: '',
        js: '',
        head: [],
        body: [],
        urlField: '',
        title: '',
        module: 'iife' as const,
        hidden: false,
        ...file,
        filename: filename.lastIndexOf('.') > -1 ? filename : filename + '.html',
        value: htmlStr || file.defaultValue || '',
        type: ''
      }
      _file.type = _file.filename.slice(_file.filename.lastIndexOf('.'))
      if (!this.currTemplate && this.templateTypeSet.has(_file.type)) {
        this.currTemplate = _file
      }
      this.files[filename] = _file
      return _file
    })
    // 初始化公共静态资源
    this.resource = {
      cssLibs: [],
      jsLibs: [],
      css: '',
      js: '',
      ...options.resource
    }
    // 初始化公共配置
    this.publicConfig = {
      head: [],
      body: [],
      ...options.publicConfig
    }
    // 初始化默认配置
    this.defaultConfig = {
      theme: 'light',
      autoRun: true,
      autoRunInterval: 300,
      height: '300px',
      editorRange: '50%',
      renderRange: 'auto',
      draggable: true,
      direction: 'row',
      toolbar: ['reset', 'reload'],
      ...options.defaultConfig
    }
    this.events = {
      onFocus: () => {},
      onBlur: () => {},
      onChange: () => {},
      onLoad: () => {},
      ...options.events
    }
    // 初始化 dom
    if (!options.el) throw new Error('缺少配置项 => el 属性')
    this.el = (
      typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    ) as HTMLDivElement
    if (!this.el) throw new Error(`获取元素失败 => ${options.el}`)
  }

  // 初始化
  public async init() {
    // 初始化dom结构
    this.initDom()
    // 初始化事件
    this.initEvent()
    // 初始化编辑器
    this.initCodeMirror()
    // 初始化菜单栏
    this.initMenu()
    // 初始主题
    this.triggleTheme()
    // 初始化编辑器内容
    const currFile = this.currFile
    const query = getQuery()
    const htmlStr = query[currFile.urlField]
    if (htmlStr) {
      // 如果顶部 url 有值, 优先渲染
      this.setValue(decode(htmlStr))
    } else if (currFile.defaultValue) {
      // 如果当前tab页有默认值, 则重置
      this.reset()
    } else {
      // 否则就渲染
      this.render()
    }
    // this.changeLang()
  }

  // 重置
  public reset() {
    this.setValue(this.currFile.defaultValue)
  }

  // 初始化dom结构
  private initDom() {
    const { el, defaultConfig } = this
    this.addClass(el, 'mini-coderBox')
    this.setStyle(el, {
      height: defaultConfig.height
    })
    const toolbarHTML = defaultConfig.toolbar
      .map((key, index) => {
        return `<span class="coderBox-icon icon-active coderBox-icon-${key}" title="${key}" style="order: ${index}">${allIcon[key]}</span>`
      })
      .join('\n')
    el.innerHTML = `
      <div class="coderBox-head">
        <div class="coderBox-setting">
          <span class="coderBox-icon icon-active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44771 12 8 12.4477 8 13C8 13.5523 8.44771 14 9 14Z" fill="currentColor" /><path d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 11.1637 19.8717 10.3574 19.6337 9.59973C18.7991 9.82556 17.9212 9.94604 17.0152 9.94604C13.2921 9.94604 10.0442 7.91139 8.32277 4.89334C5.75469 6.22486 4 8.90751 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor" /></svg>
          <span>
        </div>
        &ensp;
        <div class="coderBox-tab">
          ${this.fileList
            .filter((file) => !file.hidden)
            .map((file, index) => {
              const className =
                'coderBox-tab-item' + (this.fileIndex === index ? ' coderBox-tab-active' : '')
              return `
              <div class="${className}" data-index="${index}">
                <span>${file.title || file.filename}</span>
                <!-- <span class="coderBox-icon icon-close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" /></svg>
                </span> -->
              </div>
            `
            })
            .join('\n')}
        </div>
        ${toolbarHTML}
      </div>
      <div class="coderBox-body">
        <div class="coderBox-code" style="width: ${defaultConfig.editorRange}"></div>
        <div class="coderBox-gutter"></div>
        <div class="coderBox-render">
          <iframe></iframe>
          <div class="coderBox-loading"></div>
        </div>
      </div>
      <div class="coderBox-mask"></div>
    `
    this.iframe = el.querySelector('iframe')!
    this.loadEl = el.querySelector('.coderBox-loading')!
    this.codeEl = el.querySelector('.coderBox-code')!
    this.lineEl = el.querySelector('.coderBox-gutter')!
    this.bodyEl = el.querySelector('.coderBox-body')!
    // 布局
    this.triggleDirection(defaultConfig.direction)
    // 绑定事件
    const addEvent = (className: string, cb: () => void) => {
      el.querySelector(className)?.addEventListener('click', cb)
    }
    addEvent('.coderBox-icon-reset', () => {
      this.reset()
      this.run(true)
    })
    addEvent('.coderBox-icon-reload', () => this.run(true))
    addEvent('.coderBox-icon-left-layout', () => this.triggleDirection('row'))
    addEvent('.coderBox-icon-right-layout', () => this.triggleDirection('row-reverse'))
    addEvent('.coderBox-icon-top-layout', () => this.triggleDirection('column'))
    addEvent('.coderBox-icon-bottom-layout', () => this.triggleDirection('column-reverse'))
    // 点击 tab 标签页
    const tabBar = el.querySelector('.coderBox-tab')!
    tabBar.addEventListener('click', (e) => {
      const targetEl = (e['path'] as HTMLElement[]).find(
        (dom) => dom.className === 'coderBox-tab-item'
      )
      if (targetEl) {
        this.fileIndex = Number(targetEl.getAttribute('data-index'))
        // 切换 tab 页面
        this.changeTab()
        // 设置样式
        const items = tabBar.children
        for (const item of items) {
          item.className = 'coderBox-tab-item'
        }
        this.addClass(targetEl!, 'coderBox-tab-active')
      }
    })
  }

  // 初始化菜单
  private initMenu() {}

  // 初始化事件
  private initEvent() {
    const { el, codeEl, defaultConfig } = this
    if (!defaultConfig.draggable) {
      this.addClass(this.lineEl, 'no-dragging')
      return
    }
    const maskEl = el.querySelector('.coderBox-mask') as HTMLDivElement
    let boxW: number, boxH: number, boxX: number, boxY: number, lineX: number, lineY: number
    this.lineEl.addEventListener('mousedown', (e) => {
      lineX = e.offsetX
      lineY = e.offsetY
      this.isClick = true
      const { x, y, width, height } = this.bodyEl.getBoundingClientRect()
      boxW = width
      boxH = height
      boxX = x
      boxY = y
      maskEl.style.display = 'block'
    })
    el.addEventListener('mouseup', (_e) => {
      this.isClick = false
      maskEl.style.display = 'none'
    })
    el.addEventListener('mousemove', (e) => {
      if (!this.isClick) return
      let val: number = 0.5
      switch (defaultConfig.direction) {
        case 'row':
          val = (e.clientX - boxX - lineX) / boxW
          codeEl.style.width = val * 100 + '%'
          break
        case 'row-reverse':
          val = 1 - (e.clientX - boxX + lineX) / boxW
          codeEl.style.width = val * 100 + '%'
          break
        case 'column':
          val = (e.clientY - boxY - lineY) / boxH
          codeEl.style.height = val * 100 + '%'
          break
        case 'column-reverse':
          val = 1 - (e.clientY - boxY + lineY) / boxH
          codeEl.style.height = val * 100 + '%'
          break
      }
    })
  }
  // 注册格式化语言
  private initRegLanguange() {
    const type = this.type
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      provideDocumentFormattingEdits(model) {
        let code = model.getValue()
        prettier
          .format(code, {
            parser: type === 'vue' ? 'vue' : 'typescript',
            jsxSingleQuote: true,
            plugins: [parseBabel, parseEsTree, parseCss, parserTypeScript, parseMd, parseHtml],
            vueIndentScriptAndStyle: true
          })
          .then((res) => {
            model.setValue(res)
          })
        return []
      }
    })
  }

  // 编辑器内容改变
  private handleChange() {
    const { defaultConfig, events } = this
    const currFile = this.currFile
    const htmlStr = this.getValue()
    // console.log(htmlStr)
    const codeStr = encode(htmlStr)
    // 替换字符串缓存
    currFile.value = htmlStr
    // 替换顶部 url
    if (currFile.urlField) setQuery({ [currFile.urlField]: codeStr })
    // 是否自动运行
    defaultConfig.autoRun && this.run(true)
    // 触发 change 回调
    events.onChange?.()
  }
  // 初始化编辑器
  private initCodeMirror() {
    if (this.editor) {
      return
    }
    this.editor = monaco.editor.create(document.querySelector('.coderBox-code') as any, {
      language: 'typescript'
    })
    this.editor.onDidChangeModelContent(debounceFn(this.handleChange, 500, this))
  }

  // 切换上边的Tab
  private changeTab() {
    const currFile = this.currFile
    if (this.templateTypeSet.has(currFile.type)) {
      this.currTemplate = currFile
    }
    // 切换语言
    this.changeLang()
    this.setValue(currFile.value || currFile.defaultValue)
  }

  // 切换语言
  private changeLang() {}

  // 设置内容(解析后的内容)
  public setValue(value: string) {
    this.editor.setValue(value)
    this.run(true)
  }
  // 获取内容
  public getValue() {
    return this.editor.getValue()
  }

  // 获取json字符串
  public getJSONString() {
    return JSON.stringify(this.getValue()).replace(/<\/script>/g, '<\\/script>')
  }

  // 设置内容(包括解析)
  public setCode(code: string) {
    return this.setValue(decode(code))
  }

  // 获取内容(加密后的字符串或直接获取)
  public getCode(value?: string) {
    return encode(value || this.getValue())
  }

  // 设置style
  public setStyle(el: HTMLDivElement, styles: { [key: string]: string | number }) {
    for (const key in styles) {
      el.style[key] = styles[key]
    }
  }

  // 添加类名
  private addClass(el: HTMLElement, className: string) {
    el.classList.add(className)
  }

  // 获取第三方库的源代码
  public async getResource(src: string): Promise<string> {
    if (!window['ldqResource']) window['ldqResource'] = {}
    const ldqResource: { [key: string]: string | Promise<string> } = window['ldqResource']
    const localFile = this.files[src]
    if (localFile) {
      ldqResource[src] = localFile.value
    }
    if (!ldqResource[src]) {
      ldqResource[src] = FileLoader(src)
    }
    return ldqResource[src]
  }

  // 切换Loading
  private triggleLoading(status: boolean) {
    this.loadEl.style.display = status ? 'block' : 'none'
  }

  // 切换主题
  public triggleTheme(_theme = this.defaultConfig.theme) {}

  // 切换布局模式
  public triggleDirection(direction: DefaultConfigType['direction'] = 'row') {
    const { codeEl, defaultConfig } = this
    const gutter = ['100%', '0%'].indexOf(defaultConfig.editorRange) > -1 ? '0px' : '5px'
    const renderEl = this.el.querySelector('.coderBox-render') as HTMLDivElement
    // 左右布局 / 上下布局
    if (direction.indexOf('row') > -1) {
      this.setStyle(codeEl, {
        width: defaultConfig.editorRange,
        height: '100%'
      })
      this.setStyle(renderEl, {
        width: defaultConfig.renderRange,
        height: '100%'
      })
      this.setStyle(this.lineEl, { width: gutter, height: '100%' })
    } else if (direction.indexOf('column') > -1) {
      this.setStyle(codeEl, {
        width: '100%',
        height: defaultConfig.editorRange
      })
      this.setStyle(renderEl, {
        width: '100%',
        height: defaultConfig.renderRange
      })
      this.setStyle(this.lineEl, { width: '100%', height: gutter })
    } else return
    // 设置flex布局
    defaultConfig.direction = direction
    this.setStyle(this.bodyEl, { 'flex-direction': direction })
  }

  // 将打包的组件渲染到页面
  public async render(isReload = false) {
    // currTemplate是传入的配置对象
    const { loaders, iframe, currTemplate } = this
    if (!currTemplate) return
    const context = currTemplate.value
    // console.log('context', context) //获取要渲染的内容

    this.triggleLoading(true)
    // 等待 iframe 刷新
    if (isReload || ['.html', '.vue'].indexOf(currTemplate.type) > -1) {
      // 如果当前正在刷新，就等到刷新后在执行
      await new Promise<void>((resolve) => {
        const fn = () => {
          resolve()
          iframe.removeEventListener('load', fn)
        }
        iframe.addEventListener('load', fn)
        iframe.contentWindow?.location.reload()
      })
    }
    // 重新获取文档
    const iframeDocument = this.iframe.contentWindow?.document
    if (!iframeDocument) return
    // 渲染模板
    const value = loaders[currTemplate.type]
    // 获取loaders
    let fileLoaders = Array.isArray(value) ? value : [value]
    fileLoaders = fileLoaders
      .slice()
      .reverse()
      .filter((loader) => typeof loader === 'function')
    let template = context
    for (const loader of fileLoaders) {
      // this是当前coderBox实例
      template = await Promise.resolve(loader.call(this, template, currTemplate))
    }
    iframeDocument.open()
    iframeDocument.write(template)
    iframeDocument.close()
    this.triggleLoading(false)
  }
}
