export const filttersMessage = (alldata: any[], type: any) => {
  return alldata.filter((item) => item.messageType == type)
}
