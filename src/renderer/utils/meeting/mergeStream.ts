declare global {
  interface Window {
    AudioContext: AudioContext
    webkitAudioContext: any
    VideoStreamMerger: VideoStreamMerger
  }
  interface AudioContext {
    createGainNode: any
  }
  interface HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream
  }
  interface HTMLMediaElement {
    _mediaElementSource: any
  }
  interface HTMLVideoElement {
    playsInline: boolean
  }
}

export interface DrawFunction {
  (context: CanvasRenderingContext2D, frame: CanvasImageSource, done: () => void): void
}

export interface AudioEffect {
  (sourceNode: AudioNode, destinationNode: MediaStreamAudioDestinationNode): void
}

export interface ConstructorOptions {
  width: number
  height: number
  fps: number
  clearRect: boolean
  audioContext: AudioContext
}

export interface AddStreamOptions {
  x: number
  y: number
  width: number
  height: number
  index?: number
  mute: boolean
  muted?: boolean
  draw?: DrawFunction
  audioEffect?: AudioEffect
}

/**
合并多个mediastream的视频。还通过WebAudio API合并音频。

 -发送多个视频在一个单一的WebRTC MediaConnection
 -无需担心重新协商或延迟的热插拔流
 -裁剪，缩放和旋转现场视频
 -通过画布API添加疯狂的效果
*/
export class VideoStreamMerger {
  // 合并流的宽度
  public width = 720

  // 合并流的高度
  public height = 405
  public fps = 25
  private _streams: any[] = []
  private _frameCount = 0

  public clearRect = true
  public started = false

  // 合并流的最终结果
  public result: MediaStream | null = null
  public supported: boolean | null = null

  private _canvas: HTMLCanvasElement | null = null
  private _ctx: CanvasRenderingContext2D | null = null
  private _videoSyncDelayNode: DelayNode | null = null
  private _audioDestination: MediaStreamAudioDestinationNode | null = null
  private _audioCtx: AudioContext | null = null

  constructor(options: Partial<ConstructorOptions> = {}) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const audioSupport = !!(window.AudioContext && new AudioContext().createMediaStreamDestination)
    const canvasSupport = !!document.createElement('canvas').captureStream
    const supported = (this.supported = audioSupport && canvasSupport)

    if (!supported) {
      return
    }

    this.setOptions(options)

    const audioCtx = (this._audioCtx = new AudioContext())
    const audioDestination = (this._audioDestination = audioCtx?.createMediaStreamDestination())

    // 延迟的时间
    this._videoSyncDelayNode = audioCtx.createDelay(5.0)
    this._videoSyncDelayNode.connect(audioDestination)

    this._setupConstantNode()

    this.started = false
    this.result = null

    this._backgroundAudioHack()
  }

  setOptions(options: Partial<ConstructorOptions> = {}): void {
    this._audioCtx = options.audioContext || new AudioContext()
    this.width = options.width || this.width
    this.height = options.height || this.height
    this.fps = options.fps || this.fps
    this.clearRect = options.clearRect === undefined ? true : options.clearRect
  }

  // 更改画布和输出视频轨道的大小。
  setOutputSize(width: number, height: number): void {
    this.width = width
    this.height = height

    if (this._canvas) {
      this._canvas.setAttribute('width', this.width.toString())
      this._canvas.setAttribute('height', this.height.toString())
    }
  }

  // 获取合并使用的WebAudio AudioContext。
  getAudioContext(): AudioContext | null {
    return this._audioCtx
  }

  // 获取合并使用的MediaStreamDestination节点。
  getAudioDestination(): MediaStreamAudioDestinationNode | null {
    return this._audioDestination
  }

  getCanvasContext(): CanvasRenderingContext2D | null {
    return this._ctx
  }

  private _backgroundAudioHack() {
    if (this._audioCtx) {
      // 停止浏览器从节流定时器播放几乎无声的音频
      const source = this._createConstantSource()
      const gainNode = this._audioCtx.createGain()
      if (gainNode && source) {
        gainNode.gain.value = 0.001 // 需要防止启动时声音过大
        source.connect(gainNode)
        gainNode.connect(this._audioCtx.destination)
        source.start()
      }
    }
  }

  private _setupConstantNode() {
    if (this._audioCtx && this._videoSyncDelayNode) {
      const constantAudioNode = this._createConstantSource()

      if (constantAudioNode) {
        constantAudioNode.start()

        const gain = this._audioCtx.createGain()
        gain.gain.value = 0

        constantAudioNode.connect(gain)
        gain.connect(this._videoSyncDelayNode)
      }
    }
  }

  private _createConstantSource() {
    if (this._audioCtx) {
      if (this._audioCtx.createConstantSource) {
        return this._audioCtx.createConstantSource()
      }

      // 不是一个真正的常量sourcenode，只是一个循环缓冲区填充偏移值
      const constantSourceNode = this._audioCtx.createBufferSource()
      const constantBuffer = this._audioCtx.createBuffer(1, 1, this._audioCtx.sampleRate)
      const bufferData = constantBuffer.getChannelData(0)
      bufferData[0] = 0 * 1200 + 10
      constantSourceNode.buffer = constantBuffer
      constantSourceNode.loop = true

      return constantSourceNode
    }
  }

  /*
 更新已经添加的流或数据对象的z索引(绘制顺序)。与索引选项相同。
如果您多次添加相同的MediaStream，所有实例将被更新。
 */
  updateIndex(mediaStream: MediaStream | string | { id: string }, index: number): void {
    if (typeof mediaStream === 'string') {
      mediaStream = {
        id: mediaStream
      }
    }

    index = index == null ? 0 : index

    for (let i = 0; i < this._streams.length; i++) {
      if (mediaStream.id === this._streams[i].id) {
        this._streams[i].index = index
      }
    }
    this._sortStreams()
  }

  private _sortStreams() {
    this._streams = this._streams.sort((a, b) => a.index - b.index)
  }

  /*

  一个方便的功能来合并HTML5 MediaElement而不是MediaStream。
  id是一个字符串，用于稍后删除或更新流的索引。
  mediaElement是一个播放HTML5音频或视频的元素。
  选项与addStream的选项相同。
  MediaElements中的流可以通过merge . removestream (id)删除。
  */
  addMediaElement(id: string, element: HTMLMediaElement, opts: any): void {
    opts = opts || {}

    opts.x = opts.x || 0
    opts.y = opts.y || 0
    opts.width = opts.width || this.width
    opts.height = opts.height || this.height
    opts.mute = opts.mute || opts.muted || false

    opts.oldDraw = opts.draw
    opts.oldAudioEffect = opts.audioEffect

    if (element instanceof HTMLVideoElement || element instanceof HTMLImageElement) {
      opts.draw = (ctx: CanvasRenderingContext2D, _: any, done: () => void) => {
        if (opts.oldDraw) {
          opts.oldDraw(ctx, element, done)
        } else {
          // 默认绘画函数
          const width = opts.width == null ? this.width : opts.width
          const height = opts.height == null ? this.height : opts.height
          ctx.drawImage(element, opts.x, opts.y, width, height)
          done()
        }
      }
    } else {
      opts.draw = null
    }

    if (this._audioCtx && !opts.mute) {
      const audioSource =
        element._mediaElementSource || this._audioCtx.createMediaElementSource(element)
      //每个元素只能生成一个源，因此将其存储起来以备以后使用(将源绑定到元素的垃圾收集)
      element._mediaElementSource = audioSource
      audioSource.connect(this._audioCtx.destination) // 播放原始元素的音频

      const gainNode = this._audioCtx.createGain()
      audioSource.connect(gainNode)
      if (
        (element instanceof HTMLVideoElement || element instanceof HTMLAudioElement) &&
        element.muted
      ) {
        // 在合并时有音频时，保持元素“静音”
        element.muted = false
        element.volume = 0.001
        gainNode.gain.value = 1000
      } else {
        gainNode.gain.value = 1
      }
      opts.audioEffect = (_: any, destination: AudioNode) => {
        if (opts.oldAudioEffect) {
          opts.oldAudioEffect(gainNode, destination)
        } else {
          gainNode.connect(destination)
        }
      }
      opts.oldAudioEffect = null
    }

    this.addStream(id, opts)
  }

  /*
   添加要合并的MediaStream。如果您只想提供效果，请使用id字符串。
    添加流的顺序很重要。较早放置的流将落后于较晚放置的流(使用index选项更改此行为)。
   */
  addStream(mediaStream: MediaStream | string, opts: AddStreamOptions | undefined): void {
    if (typeof mediaStream === 'string') {
      return this._addData(mediaStream, opts)
    }

    opts = opts || ({} as AddStreamOptions)
    const stream: any = {}

    stream.isData = false
    stream.x = opts.x || 0
    stream.y = opts.y || 0
    stream.width = opts.width
    stream.height = opts.height
    stream.draw = opts.draw || null
    stream.mute = opts.mute || opts.muted || false
    stream.audioEffect = opts.audioEffect || null
    stream.index = opts.index == null ? 0 : opts.index
    stream.hasVideo = mediaStream.getVideoTracks().length > 0
    stream.hasAudio = mediaStream.getAudioTracks().length > 0

    // 如果是同一个MediaStream，我们可以重复使用video元素(忽略声音)。
    let videoElement: HTMLVideoElement | null = null
    for (let i = 0; i < this._streams.length; i++) {
      if (this._streams[i].id === mediaStream.id) {
        videoElement = this._streams[i].element
      }
    }

    if (!videoElement) {
      videoElement = document.createElement('video')
      videoElement.autoplay = true
      videoElement.muted = true
      videoElement.playsInline = true
      videoElement.srcObject = mediaStream
      videoElement.setAttribute(
        'style',
        'position:fixed; left: 0px; top:0px; pointer-events: none; opacity:0;'
      )
      document.body.appendChild(videoElement)

      const res = videoElement.play()
      res.catch(null)

      if (stream.hasAudio && this._audioCtx && !stream.mute) {
        stream.audioSource = this._audioCtx.createMediaStreamSource(mediaStream)
        stream.audioOutput = this._audioCtx.createGain() // 中间增益节点
        stream.audioOutput.gain.value = 1
        if (stream.audioEffect) {
          stream.audioEffect(stream.audioSource, stream.audioOutput)
        } else {
          stream.audioSource.connect(stream.audioOutput) // 默认为直连
        }
        stream.audioOutput.connect(this._videoSyncDelayNode)
      }
    }

    stream.element = videoElement
    stream.id = mediaStream.id || null
    this._streams.push(stream)
    this._sortStreams()
  }

  /*
   从合并中删除MediaStream。您也可以使用流的ID。
   如果您多次添加相同的MediaStream，所有实例将被删除。
   */
  removeStream(mediaStream: MediaStream | string | { id: string }): void {
    if (typeof mediaStream === 'string') {
      mediaStream = {
        id: mediaStream
      }
    }

    for (let i = 0; i < this._streams.length; i++) {
      const stream = this._streams[i]
      if (mediaStream.id === stream.id) {
        if (stream.audioSource) {
          stream.audioSource = null
        }
        if (stream.audioOutput) {
          stream.audioOutput.disconnect(this._videoSyncDelayNode)
          stream.audioOutput = null
        }
        if (stream.element) {
          stream.element.remove()
        }
        this._streams[i] = null
        this._streams.splice(i, 1)
        i--
      }
    }
  }

  private _addData(key: string, opts: any) {
    opts = opts || {}
    const stream: any = {}

    stream.isData = true
    stream.draw = opts.draw || null
    stream.audioEffect = opts.audioEffect || null
    stream.id = key
    stream.element = null
    stream.index = opts.index == null ? 0 : opts.index

    if (this._videoSyncDelayNode && this._audioCtx && stream.audioEffect) {
      stream.audioOutput = this._audioCtx.createGain() // Intermediate gain node
      stream.audioOutput.gain.value = 1
      stream.audioEffect(null, stream.audioOutput)
      stream.audioOutput.connect(this._videoSyncDelayNode)
    }

    this._streams.push(stream)
    this._sortStreams()
  }

  // 包装requestAnimationFrame和setInterval以避免背景节流
  private _requestAnimationFrame(callback: () => void) {
    let fired = false
    const interval = setInterval(() => {
      if (!fired && document.hidden) {
        fired = true
        clearInterval(interval)
        callback()
      }
    }, 1000 / this.fps)
    requestAnimationFrame(() => {
      if (!fired) {
        fired = true
        clearInterval(interval)
        callback()
      }
    })
  }

  /**
   开始合并并创建merge .result。
  你可以在任何时候调用它，但你只需要调用一次。
    您仍然可以添加/删除流，结果流将自动更新。
   */
  start(): void {
    // Hidden canvas element for merging
    this._canvas = document.createElement('canvas')
    this._canvas.setAttribute('width', this.width.toString())
    this._canvas.setAttribute('height', this.height.toString())
    this._canvas.setAttribute('style', 'position:fixed; left: 110%; pointer-events: none') // Push off screen
    this._ctx = this._canvas.getContext('2d')

    this.started = true
    this._requestAnimationFrame(this._draw.bind(this))

    // 添加视频
    this.result = this._canvas?.captureStream(this.fps) || null

    // 删除“死”音轨
    const deadTrack = this.result?.getAudioTracks()[0]
    if (deadTrack) {
      this.result?.removeTrack(deadTrack)
    }

    // 添加音频
    const audioTracks = this._audioDestination?.stream.getAudioTracks()
    if (audioTracks && audioTracks.length) {
      this.result?.addTrack(audioTracks[0])
    }
  }

  private _updateAudioDelay(delayInMs: number) {
    if (this._videoSyncDelayNode && this._audioCtx) {
      this._videoSyncDelayNode.delayTime.setValueAtTime(
        delayInMs / 1000,
        this._audioCtx.currentTime
      )
    }
  }

  private _draw() {
    if (!this.started) {
      return
    }

    this._frameCount++

    // 每60帧更新一次视频处理延迟
    let t0 = 0
    if (this._frameCount % 60 === 0) {
      t0 = performance.now()
    }

    let awaiting = this._streams.length
    const done = () => {
      awaiting--
      if (awaiting <= 0) {
        if (this._frameCount % 60 === 0) {
          const t1 = performance.now()
          this._updateAudioDelay(t1 - t0)
        }
        this._requestAnimationFrame(this._draw.bind(this))
      }
    }

    if (this.clearRect) {
      this._ctx?.clearRect(0, 0, this.width, this.height)
    }
    this._streams.forEach((stream) => {
      if (stream.draw) {
        // 自定义框架变换
        stream.draw(this._ctx, stream.element, done)
      } else if (!stream.isData && stream.hasVideo) {
        this._drawVideo(stream.element, stream)
        done()
      } else {
        done()
      }
    })

    if (this._streams.length === 0) {
      done()
    }
  }

  private _drawVideo(element: HTMLVideoElement, stream: any) {
    // 默认渲染函数

    const canvasHeight = this.height
    const canvasWidth = this.width

    const height = stream.height || canvasHeight
    const width = stream.width || canvasWidth

    let positionX = stream.x || 0
    let positionY = stream.y || 0

    try {
      this._ctx?.drawImage(element, positionX, positionY, width, height)
    } catch (err) {
      // 忽略可能的错误“IndexSizeError (DOM Exception 1):索引不在允许的范围内。”由于Safari错误。
      console.error(err)
    }
  }

  /*
  清理所有内容并销毁结果流。
   */
  stop(): void {
    this.started = false

    this._canvas = null
    this._ctx = null
    this._streams.forEach((stream) => {
      if (stream.element) {
        stream.element.remove()
      }
    })
    this._streams = []
    this._audioCtx?.close()
    this._audioCtx = null
    this._audioDestination = null
    this._videoSyncDelayNode = null

    this.result?.getTracks().forEach((t) => {
      t.stop()
    })

    this.result = null
  }

  destroy() {
    this.stop()
  }
}

if (typeof window !== 'undefined') {
  ;(window as any).VideoStreamMerger = VideoStreamMerger
}
