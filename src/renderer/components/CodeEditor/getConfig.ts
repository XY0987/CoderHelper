export const getCodeBoxConfig = (
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
    }
  }
}
