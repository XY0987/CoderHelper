import { io } from 'socket.io-client'

class Message {
  ws: any
  init(url: string, query: any) {
    console.log(url)

    this.ws = io(url, { query })
    this.onListener(this.ws)
  }
  onListener(ws: any) {
    // 消息监听（用于消息提醒）
    ws.on('sendMessageServer', (data: any) => {
      // messageContent是一个JSON字符串，里边的content是提示内容
      const { messageContent, messageTitle } = JSON.parse(data)
      console.log(JSON.parse(data))
      ;(window as any).publicApi.notic(JSON.parse(messageContent).content, messageTitle)
    })
  }
  sendMessage(info: any) {
    this.ws.emit('getMessageClient', info)
  }
}
const message = new Message()
export default message
