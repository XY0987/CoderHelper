import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

export const debounceFn = (fn, delay = 1000, that: any) => {
  let time: any = null
  function _debounce() {
    let args = arguments
    if (time !== null) {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      fn.call(that, ...args)
    }, delay)
  }
  return _debounce.bind(that)
}
// 获取url中的内容
export const getQuery = (search = window.location.search) => {
  const query = {}
  const str = search.split('?')[1]
  if (!str) return query
  str.split('&').forEach((item) => {
    const index = item.indexOf('=')
    query[item.slice(0, index)] = item.slice(index + 1)
  })
  return query
}
// 讲内容设置到url中
export const setQuery = (query: { [key: string]: string | number }) => {
  const oldQuery = getQuery()
  const arr: any[] = []
  for (const key in query) {
    oldQuery[key] = query[key]
  }
  for (const key in oldQuery) {
    arr.push(`${key}=${oldQuery[key]}`)
  }
  const search = '?' + arr.join('&')
  history.pushState(null, '', search)
}
// 生成元素(style和script标签)
export const ElementGenerator = (innerText: string, type?: 'style' | 'script') =>
  type
    ? {
        style: `<style>${innerText || ''}<\/style>`,
        script: `<script>${innerText || ''}<\/script>`
      }[type]
    : innerText

// 加载外部的文件
export const FileLoader = (src: string): Promise<string> => fetch(src).then((res) => res.text())

// 压缩字符串
export const encode = (value: string) => {
  return encodeURIComponent(compressToEncodedURIComponent(value))
}
// 解压字符串
export const decode = (value: string) => {
  return decompressFromEncodedURIComponent(decodeURIComponent(value)) || ''
}
// 讲对象属性合并到指定对象上
export const define = (obj: object, key: string, cb: () => void) => {
  Object.defineProperty(obj, key, {
    set: () => {
      throw new Error('Assignment to constant variable.')
    },
    get: cb
  })
}
