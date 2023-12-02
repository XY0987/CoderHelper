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
      <div className="coderBox-body" style={{ display: 'flex' }}>
        <div className="coderBox-code" style={{ width: '50%' }}>
          <MonacoEditor
            height={400}
            onChange={handleCssCodeChange}
            language={'typescript'}
            value={''}
          />
        </div>
        <div
          className="coderBox-gutter"
          style={{
            marginLeft: '10px',
            borderLeft: '1px solid #333',
            width: '50%',
            padding: '0px 10px'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlVaue }}></div>
        </div>
      </div>
    </div>
  )
}
