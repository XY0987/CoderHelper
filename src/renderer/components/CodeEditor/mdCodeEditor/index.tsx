import MonacoEditor from 'react-monaco-editor'
import { debounceFn } from '@renderer/coderBox/utils'
import { useState } from 'react'
import md from './mdHight'

export default function MarkdownCodeEditor() {
  const [htmlVaue, setHtmlValue] = useState('')
  const transFn: any = debounceFn(
    (e: string) => {
      setHtmlValue(md.render(e))
    },
    500,
    undefined
  )
  const handleCssCodeChange = (e: string) => {
    transFn(e)
  }
  return (
    <div>
      {/* 编辑markDown代码 */}
      <div id="mdCodeContainer">
        <MonacoEditor
          height={400}
          onChange={handleCssCodeChange}
          language={'typescript'}
          value={''}
        />
      </div>
      {/* 显示内容 */}
      <div dangerouslySetInnerHTML={{ __html: htmlVaue }}></div>
    </div>
  )
}
