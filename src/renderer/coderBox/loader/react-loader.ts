import { getCssLibs, getJsLibs, getEsmsInitOptions } from './index'
import { transform } from '@babel/standalone'
import BaseLoader from './base-loader'
import { LoaderFunctionType } from '@renderer/types/coderBox'
// 第一个value是编写框的值，第二个是首次传入的配置对象
const coderBoxReactLoader: LoaderFunctionType = async function (value, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)

  const esModules = { '__APP__.jsx': transform(value, { presets: ['react'] }).code }
  const content = `
    ${cssLibs.join('\n')}
    <div id="root"></div>
    ${jsLibs.join('\n')}
    <script>${getEsmsInitOptions(esModules)}</script>
    <script async>${await this.getResource(
      'https://ga.jspm.io/npm:es-module-shims@1.8.2/dist/es-module-shims.js'
    )}</script>
    <script type="importmap-shim">${JSON.stringify(config['importMap'] || {})}</script>
    <script type="module-shim">
      import React from 'react'
      import ReactDOM from 'react-dom'
      import App from './__APP__.jsx'
      ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById("root"))
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default coderBoxReactLoader
