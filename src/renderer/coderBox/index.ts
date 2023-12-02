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
    // 初始化编辑器
    this.initCodeMirror()
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
    // 绑定事件
    const addEvent = (className: string, cb: () => void) => {
      el.querySelector(className)?.addEventListener('click', cb)
    }
    addEvent('.coderBox-icon-reset', () => {
      this.reset()
      this.run(true)
    })
    addEvent('.coderBox-icon-reload', () => this.run(true))
    // 点击 tab 标签页
    const tabBar = el.querySelector('.coderBox-tab')!
    tabBar.addEventListener('click', (e) => {
      const targetEl = (e['path'] as HTMLElement[]).find(
        (dom) => dom.className === 'coderBox-tab-item'
      )
      if (targetEl) {
        this.fileIndex = Number(targetEl.getAttribute('data-index'))
        // 设置样式
        const items = tabBar.children
        for (const item of items) {
          item.className = 'coderBox-tab-item'
        }
        this.addClass(targetEl!, 'coderBox-tab-active')
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

  // 设置内容(解析后的内容)
  public setValue(value: string) {
    this.editor.setValue(value)
    this.run(true)
  }
  // 获取内容
  public getValue() {
    return this.editor.getValue()
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
