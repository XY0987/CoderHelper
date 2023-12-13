import * as monaco from 'monaco-editor'
import { debounceFn } from '@renderer/coderBox/utils'
import { useEffect, useRef, useState } from 'react'

import prettier from 'prettier/standalone'
import parseBabel from 'prettier/plugins/babel'
import parseHtml from 'prettier/plugins/html'
import parseEsTree from 'prettier/plugins/estree'
import parseMd from 'prettier/plugins/markdown'

import md from './mdHight'

export default function MarkdownCodeEditor({
  value,
  setValue,
  defaultValue
}: {
  value?: string
  setValue?: any
  defaultValue?: string
}) {
  const [htmlVaue, setHtmlValue] = useState('')
  const edtior = useRef<any>(null)
  const transFn: any = debounceFn(
    (e: string) => {
      setHtmlValue(md.render(e))
    },
    500,
    undefined
  )
  const handleCodeChange = () => {
    const value = edtior.current.getValue()
    transFn(value)
    setValue && setValue(value)
  }
  useEffect(() => {
    const edit = monaco.editor.create(document.querySelector('.coderBox-code') as any, {
      language: 'typescript',
      value: value
    })
    edit.onDidChangeModelContent(handleCodeChange)
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      provideDocumentFormattingEdits(model) {
        let code = model.getValue()
        prettier
          .format(code, {
            parser: 'markdown',
            jsxSingleQuote: true,
            plugins: [parseBabel, parseEsTree, parseMd, parseHtml],
            vueIndentScriptAndStyle: true
          })
          .then((res) => {
            model.setValue(res)
          })
        return []
      }
    })
    edtior.current = edit
    return () => {
      edit.dispose()
      edtior.current = null
    }
  }, [])

  useEffect(() => {
    if (!defaultValue) {
      return
    }
    setHtmlValue(md.render(defaultValue))
    edtior.current && edtior.current.setValue(defaultValue)
  }, [defaultValue])
  return (
    <div>
      <div className="coderBox-body" style={{ display: 'flex' }}>
        <div className="coderBox-code" style={{ width: '50%' }}></div>
        <div
          className="coderBox-gutter"
          style={{
            marginLeft: '10px',
            borderLeft: '1px solid #333',
            width: '50%',
            padding: '0px 10px',
            minHeight: '500px'
          }}
        >
          <div
            style={{
              fontSize: 16
            }}
            dangerouslySetInnerHTML={{ __html: htmlVaue }}
          ></div>
        </div>
      </div>
    </div>
  )
}
