import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('interfaceApi', {
      sendGet: (url: string, data: any) => {
        console.log('传递的数据', url, data)
        return ipcRenderer.invoke('interface-GET', url, data)
      },
      sendPostFile: (url: string, data: any, filePath: string) => {
        return ipcRenderer.invoke('interface-POST-File', url, data, filePath)
      }
    })
    contextBridge.exposeInMainWorld('publicApi', {
      notic: () => {
        return ipcRenderer.invoke('public-notic')
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
