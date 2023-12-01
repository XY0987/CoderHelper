import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import prettier from 'prettier/standalone'
import parserTypeScript from 'prettier/plugins/typescript'
import parseBabel from 'prettier/plugins/babel'
import parseHtml from 'prettier/plugins/html'
import parseEsTree from 'prettier/plugins/estree'
import parseMd from 'prettier/plugins/markdown'

import { getFileApi } from './aRequest/user'

self.MonacoEnvironment = {
  // 提供一个定义worker路径的全局变量
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker() // 基础功能文件， 提供了所有语言通用功能 无论使用什么语言，monaco都会去加载他。
  }
}

// 关闭报错
monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true
})

// 自定义
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  ['declare class and {', 'static top()', 'static left()', '}'].join('\n')
)

var reader = new FileReader()
const res = await getFileApi()
let str: any = ''
reader.readAsText(res, 'utf-8')
reader.onload = function () {
  str = reader.result
  try {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(str)
  } catch (error) {
    console.log(error)
  }
}

monaco.languages.registerDocumentFormattingEditProvider('typescript', {
  provideDocumentFormattingEdits(model) {
    let code = model.getValue()
    prettier
      .format(code, {
        parser: 'typescript',
        jsxSingleQuote: true,
        plugins: [parseBabel, parseEsTree, parserTypeScript, parseMd, parseHtml],
        vueIndentScriptAndStyle: true
      })
      .then((res) => {
        model.setValue(res)
      })
    return []
  }
})

// monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
// var jsCode = ['"use strict"', '', 'Rectangle1.top()'].join('\n')
// monaco.editor.create(document.getElementById('a') as any, {
//   language: 'typescript',
//   value: ''
// })
// const transSug = (items) => {
//   const newSug = [...items, 'and', 'or', '(', ')'].map((item) => {
//     return {
//       label: item, // 显示的label
//       detail: !items.includes(item) ? '符号' : '字段', // 描述
//       insertText: item, // 选择后插入的value
//       icon: items.includes(item)
//     }
//   })
//   return newSug
// }
// monaco.languages.registerCompletionItemProvider('typescript', {
//   // @ts-ignore
//   provideCompletionItems: () => {
//     const suggestions = transSug(['代码提示'])
//     return {
//       suggestions: suggestions.map((item) => ({
//         ...item,
//         kind: item.icon
//           ? monaco.languages.CompletionItemKind.Variable // 图标
//           : null
//       }))
//     }
//   },
//   triggerCharacters: ['a', 'b'] // 触发代码提示的关键字，ps：可以有多个
// })
