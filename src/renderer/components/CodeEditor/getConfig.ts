export const getCodeBoxConfigReact = (
  defaultValue: string,
  el: string,
  fileName: string,
  loaders: any,
  importMap: any,
  cssLibs,
  css: string
) => {
  return {
    el,
    files: {
      [fileName]: {
        urlField: 'code',
        defaultValue: defaultValue,
        importMap,
        cssLibs,
        css
      }
    },
    loaders,
    defaultConfig: {
      height: '100vh'
    },
    type: 'react'
  }
}

export const getCodeBoxConfigVue = (
  defaultValue: string,
  el: string,
  fileName: string,
  loaders: any,
  resource: any
) => {
  return {
    el,
    files: {
      [fileName]: {
        urlField: 'code',
        defaultValue
      }
    },
    loaders: loaders,
    resource: resource,
    defaultConfig: {
      height: '100vh'
    },
    type: 'vue'
  }
}
