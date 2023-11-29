import { Select } from 'antd'
import MonacoEditor from 'react-monaco-editor'

import style from './index.module.scss'
import { useState } from 'react'
export default function CodeEditor() {
  const [theme, setTheme] = useState<string>('vs')

  const [language, setlanguage] = useState<string>('typescript')

  const handleCssCodeChange = (e) => {
    console.log(e)
  }

  const handleChange = (value) => {
    setTheme(value)
  }

  const langulangeChange = (value) => {
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
          defaultValue="javascript"
          style={{ width: 120 }}
          onChange={langulangeChange}
          options={[
            { value: 'javascript', label: 'javascript' },
            { value: 'typescript', label: 'typescript' },
            { value: 'css', label: 'css' },
            { value: 'json', label: 'json' },
            { value: 'md', label: 'markdown' }
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
