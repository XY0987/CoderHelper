import { io } from 'socket.io-client'

class Message {
  ws: any
  init(url: string, query: any) {
    console.log(url)

    this.ws = io(url, { query })
    this.onListener(this.ws)
  }
  onListener(ws: any) {
    ws.on('sendMessageServer', (data: any) => {
      const { type, content, title } = JSON.parse(data)
      console.log(JSON.parse(data))
      ;(window as any).publicApi.notic(type, content, title)
    })
  }
  sendMessage(info: any) {
    this.ws.emit('getMessageClient', info)
  }
}
const message = new Message()
export default message
