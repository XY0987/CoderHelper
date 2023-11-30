import { Select } from 'antd'
import MonacoEditor from 'react-monaco-editor'

import style from './index.module.scss'
import { useState } from 'react'
export default function CodeEditor() {
  const [theme, setTheme] = useState<string>('vs')

  const [language, setlanguage] = useState<string>('typescript')

  const handleCssCodeChange = (_e) => {
    // console.log(e)
  }

  const handleChange = (value) => {
    setTheme(value)
  }

  const langulangeChange = (value: any) => {
    setlanguage(value)
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Select
          defaultValue="vs"
          style={{ width: 120, marginRight: 15 }}
          onChange={handleChange}
          options={[
            { value: 'vs', label: 'vs' },
            { value: 'vs-dark', label: 'vs-dark' },
            { value: 'hc-black', label: 'hc-black' },
            { value: 'hc-light', label: 'hc-light' }
          ]}
        />
        <Select
          defaultValue="typescript"
          style={{ width: 120 }}
          onChange={langulangeChange}
          options={[
            { value: 'javascript', label: 'javascript' },
            { value: 'typescript', label: 'typescript' },
            { value: 'css', label: 'css' },
            { value: 'json', label: 'json' },
            { value: 'md', label: 'markdown' },
            { value: 'react', label: 'react' }
          ]}
        />
      </div>
      <div className={style.codeEditor}>
        <MonacoEditor
          height={400}
          onChange={handleCssCodeChange}
          language={language}
          theme={theme}
          value={''}
        />
      </div>
    </div>
  )
}

// import { useRef } from 'react'
// import MonacoEditor from 'react-monaco-editor'
// const Index = () => {
//   const editorRef = useRef()
//   const transSug = (items) => {
//     const newSug = [...items, 'and', 'or', '(', ')'].map((item) => {
//       return {
//         label: item, // 显示的label
//         detail: !items.includes(item) ? '符号' : '字段', // 描述
//         insertText: item, // 选择后插入的value
//         icon: items.includes(item)
//       }
//     })
//     return newSug
//   }
//   const editorDidMount = (editor, monaco) => {
//     const suggestions = transSug(['代码提示'])
//     if (suggestions.length) {
//       editorRef.current = monaco.languages.registerCompletionItemProvider('plaintext', {
//         provideCompletionItems() {
//           return {
//             suggestions: suggestions.map((item) => ({
//               ...item,
//               kind: item.icon
//                 ? monaco.languages.CompletionItemKind.Variable // 图标
//                 : null
//             }))
//           }
//         },
//         triggerCharacters: ['a', 'b'] // 触发代码提示的关键字，ps：可以有多个
//       })
//     }
//   }
//   return (
//     <div>
//       <MonacoEditor
//         width="500px"
//         theme="vs-dark"
//         height="300px"
//         language="plaintext" //注意此处language必须与 monaco 注册的代码提示里的保持一致
//         editorDidMount={editorDidMount}
//       />
//     </div>
//   )
// }

// export default Index
