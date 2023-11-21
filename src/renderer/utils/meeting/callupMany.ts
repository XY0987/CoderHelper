import { io } from 'socket.io-client'
import { $serverSocketUrl, handleError } from './callupOne'

var PeerConnection = window.RTCPeerConnection

// 存储所有的建立连接（一对多）
var RtcPcMaps = new Map()

// var localDevice: any = null;
// 添加音视频轨道
// function initInnerLocalDevice(this: any) {
//   const that: any = this as any;
//   localDevice = {
//     audioIn: [],
//     videoIn: [],
//     audioOut: [],
//   };
//   let constraints = { video: true, audio: true };
//   if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
//     console.log("浏览器不支持");
//     return;
//   }
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(function (stream) {
//       stream.getTracks().forEach((trick) => {
//         trick.stop();
//       });

//       // List cameras and microphones.
//       navigator.mediaDevices
//         .enumerateDevices()
//         .then(function (devices) {
//           devices.forEach(function (device) {
//             let obj = {
//               id: device.deviceId,
//               kind: device.kind,
//               label: device.label,
//             };
//             if (device.kind === "audioinput") {
//               if (
//                 localDevice.audioIn.filter((e: any) => e.id === device.deviceId)
//                   .length === 0
//               ) {
//                 localDevice.audioIn.push(obj);
//               }
//             }
//             if (device.kind === "audiooutput") {
//               if (
//                 localDevice.audioOut.filter(
//                   (e: any) => e.id === device.deviceId
//                 ).length === 0
//               ) {
//                 localDevice.audioOut.push(obj);
//               }
//             } else if (device.kind === "videoinput") {
//               if (
//                 localDevice.videoIn.filter((e: any) => e.id === device.deviceId)
//                   .length === 0
//               ) {
//                 localDevice.videoIn.push(obj);
//               }
//             }
//           });
//         })
//         .catch(handleError);
//     })
//     .catch(handleError);
// }

class CallupMany {
  localDevice: any
  formInline: any = {}
  talkingTimer: any
  localStream: any
  linkSocket: any
  centerDialogVisible: boolean = false
  roomUserList: any[] = []
  rtcPcParams = {
    // iceTransportPolicy: 'relay', //强制走中继
    iceServers: [
      // {urls: 'turn:124.70.x.x:3478', username:'suc', credential:'suc001'},
    ]
  }
  mediaStatus = {
    audio: false,
    video: false
  }
  statsTimerMap = new Map() //计时器
  lastPeerStatsMap = new Map() //上一次统计信息
  setUserList: any
  async getLocalStreamSettings() {
    let videoTrack = this.localStream.getVideoTracks()[0]
    console.log('本地媒体流最新参数', videoTrack.getSettings())
  }

  // 初始化
  init(nickname: any, roomId: any, userId: any, setUserList: any) {
    console.log(nickname, roomId, userId)
    this.formInline.nickname = nickname
    this.formInline.roomId = roomId
    this.formInline.userId = userId
    // 用户
    this.setUserList = setUserList
    this.clientWS()
  }
  clientWS() {
    const that = this
    this.linkSocket = io($serverSocketUrl, {
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
      query: that.formInline
    })
    this.linkSocket.on('connect', async (e: any) => {
      console.log('server init connect success', that.linkSocket)
      that.centerDialogVisible = false //加入后
      //获取房间用户列表（新用户进房间后需要和房间内每个用户进行RTC连接 后进入着主动push offer）
      that.linkSocket.emit('roomUserList', {
        roomId: that.formInline.roomId
      })
    })
    // 用户列表(加入会议的人)
    this.linkSocket.on('roomUserList', (e: any) => {
      that.roomUserList = e
      that.setUserList(e)
      //拿到房间用户列表之后开始建立RTC连接
      that.initMeetingRoomPc()
    })
    this.linkSocket.on('msg', async (e: any) => {
      console.log('msg', e)
      if (e['type'] === 'join' || e['type'] === 'leave') {
        const userId = e['data']['userId']
        const nickname = e['data']['nickname']
        if (e['type'] === 'join') {
          console.log('加入房间')
          that.roomUserList.push({
            userId: userId,
            nickname: nickname,
            roomId: that.formInline.roomId
          })
        } else {
          console.log('离开房间')
          RtcPcMaps.delete(that.formInline.userId + '-' + userId)
          that.removeChildVideoDom(userId)
        }
      }
      if (e['type'] === 'offer') {
        await that.onRemoteOffer(e['data']['userId'], e['data']['offer'])
      }
      if (e['type'] === 'answer') {
        await that.onRemoteAnswer(e['data']['userId'], e['data']['answer'])
      }
      // 候选信息
      if (e['type'] === 'candidate') {
        that.onCandiDate(e['data']['userId'], e['data']['candidate'])
      }
    })
    this.linkSocket.on('error', (e: any) => {
      console.log('error', e)
    })
  }
  // 设置流媒体
  async setDomVideoStream(domId: any, newStream: any) {
    let video = document.getElementById(domId) as any
    let stream = video.srcObject
    if (stream) {
      stream.getAudioTracks().forEach((e: any) => {
        stream.removeTrack(e)
      })
      stream.getVideoTracks().forEach((e: any) => {
        stream.removeTrack(e)
      })
    }
    video.srcObject = newStream
    video.muted = true
  }
  // 会议有人离开了，要把video元素给删除掉
  removeChildVideoDom(domId: any) {
    let video = document.getElementById(domId) as any
    if (video) {
      video.parentNode.removeChild(video)
    }
  }
  // 有人进入会议创建标签
  createRemoteDomVideoStream(domId: any, trick: any) {
    let parentDom = document.getElementById('allVideo') as any
    let id = domId + '-media'
    let video = document.getElementById(id) as any
    if (!video) {
      video = document.createElement('video')
      video.id = id
      video.controls = true
      video.autoplay = true
      video.muted = false
      video.style.width = '100%'
      video.style.height = '100%'
    }
    let stream = video.srcObject
    console.log('stream==>trick', stream, trick)
    if (stream) {
      stream.addTrack(trick)
    } else {
      let newStream = new MediaStream()
      newStream.addTrack(trick)
      video.srcObject = newStream
      video.muted = false
      parentDom.appendChild(video)
    }
  }
  // 候选信息
  onCandiDate(fromUid: any, candidate: any) {
    const localUid = this.formInline.userId
    let pcKey = localUid + '-' + fromUid
    let pc = RtcPcMaps.get(pcKey)
    pc.addIceCandidate(candidate)
  }
  // 遍历建立联系
  async initMeetingRoomPc() {
    const that = this
    if (!this.localStream) {
      this.localStream = await this.getLocalUserMedia()
      //开始静音和关闭摄像头
      this.initMediaStatus()
    }
    this.setDomVideoStream('localdemo01', this.localStream)
    const localUid = this.formInline.userId
    let others = this.roomUserList
      .filter((e: any) => e.userId !== localUid)
      .map((e: any) => {
        return e.userId
      })
    // 遍历其他用户，建立连接
    others.forEach(async (uid: any) => {
      let pcKey = localUid + '-' + uid
      let pc = RtcPcMaps.get(pcKey)
      if (!pc) {
        pc = new PeerConnection(that.rtcPcParams)
        RtcPcMaps.set(pcKey, pc)
      }
      for (const track of that.localStream.getTracks()) {
        pc.addTrack(track)
      }
      //创建offer
      let offer = await pc.createOffer({ iceRestart: true })
      //设置offer未本地描述
      await pc.setLocalDescription(offer)
      //发送offer给被呼叫端
      let params = { targetUid: uid, userId: localUid, offer: offer }
      that.linkSocket.emit('offer', params)
      that.onPcEvent(pc, localUid, uid)
    })
  }
  // 获取设备信息
  async getLocalUserMedia() {
    const audioId = this.formInline.audioInId
    const videoId = this.formInline.videoId
    const constraints = {
      audio: { deviceId: audioId ? { exact: audioId } : undefined },
      video: {
        deviceId: videoId ? { exact: videoId } : undefined,
        width: 640,
        height: 480,
        frameRate: { ideal: 20, max: 24 }
      }
    }
    if ((window as any).stream) {
      ;(window as any).stream.getTracks().forEach((track: any) => {
        track.stop()
      })
    }
    return await navigator.mediaDevices.getUserMedia(constraints).catch(handleError)
  }
  // 事件监听
  onPcEvent(pc: any, localUid: any, remoteUid: any) {
    const that = this
    pc.ontrack = function (event: any) {
      that.createRemoteDomVideoStream(remoteUid, event.track)
    }
    pc.onicecandidate = (event: any) => {
      if (event.candidate) {
        that.linkSocket.emit('candidate', {
          targetUid: remoteUid,
          userId: localUid,
          candidate: event.candidate
        })
      } else {
        /* 在此次协商中，没有更多的候选了 */
        console.log('在此次协商中，没有更多的候选了')
      }
    }
  }
  // 创建offer
  async onRemoteOffer(fromUid: any, offer: any) {
    const localUid = this.formInline.userId
    let pcKey = localUid + '-' + fromUid
    let pc = RtcPcMaps.get(pcKey)
    if (!pc) {
      pc = new PeerConnection(this.rtcPcParams)
      RtcPcMaps.set(pcKey, pc)
    }
    this.onPcEvent(pc, localUid, fromUid)
    for (const track of this.localStream.getTracks()) {
      pc.addTrack(track)
    }
    // this.localStream.getAudioTracks[0];
    await pc.setRemoteDescription(offer)
    let answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    let params = { targetUid: fromUid, userId: localUid, answer: answer }
    this.linkSocket.emit('answer', params)
  }
  // 创建answer
  async onRemoteAnswer(fromUid: any, answer: any) {
    const localUid = this.formInline.userId
    let pcKey = localUid + '-' + fromUid
    let pc = RtcPcMaps.get(pcKey)
    await pc.setRemoteDescription(answer)
  }
  // 打开或关闭麦克风
  audioControl(b: any) {
    RtcPcMaps.forEach((v, k) => {
      const senders = v.getSenders()
      const send = senders.find((s: any) => s.track.kind === 'audio')
      send.track.enabled = b
      this.mediaStatus.audio = send.track.enabled
    })
    this.localStream.getAudioTracks()[0].enabled = b
    this.mediaStatus.audio = b
  }
  // 打开或关闭视频
  videoControl(b: any) {
    RtcPcMaps.forEach((v) => {
      const senders = v.getSenders()
      const send = senders.find((s: any) => s.track.kind === 'video')
      send.track.enabled = b
      this.mediaStatus.video = send.track.enabled
    })
    this.localStream.getVideoTracks()[0].enabled = b
    this.mediaStatus.video = b
  }
  // 默认静音和关闭摄像头
  initMediaStatus() {
    this.localStream.getVideoTracks()[0].enabled = false
    this.localStream.getAudioTracks()[0].enabled = false
    console.log('进入房间默认已关闭你的麦克风和摄像头，请手动打开')
  }
  // 监听当前是否再在视频或语音
  listenerIsTalking() {
    RtcPcMaps.forEach((v, i) => {
      let senders = v.getSenders()
      //获取音频或者视频 判断是否激活状态 如果是则表明正在视频或者正在语音
    })
  }
  getAudioStatus(domId: any) {
    console.log('domId', domId)
    let video = document.getElementById(domId) as any
    let stream = video.srcObject
    return stream.getAudioTracks()[0].enabled
  }
}
const callupMeeting = new CallupMany()
export default callupMeeting
