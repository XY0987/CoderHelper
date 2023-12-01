import { message } from 'antd'

export const getParams = (queryName: string) => {
  const url = window.location.href
  const query = decodeURI(url.split('?')[1])
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === queryName) {
      return pair[1]
    }
  }
  return null
}
//复制到粘贴板
export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      message.success('复制成功')
    })
    .catch(function (err) {
      message.error('无法复制', err)
    })
}
