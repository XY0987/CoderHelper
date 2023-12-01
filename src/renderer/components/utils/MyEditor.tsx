import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

type editorType = {
  handelChange: (value: any, txt: any) => void
}

export const MyEditor = ({ handelChange }: editorType) => {
  const [editor, setEditor] = useState<any>(null) // 存储 editor 实例
  const [html, setHtml] = useState<string>('')

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: '请输入内容...',
    autoFocus: false,
    //插入图片
    MENU_CONF: {
      uploadImage: {
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 4 * 1024 * 1024, // 4M
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,
        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        // 用户自定义上传图片
        async customUpload(file: any, insertFn: any) {
          const formdata = new FormData()
          formdata.append('file', file)
        }
      }
    }
  }

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            setHtml(editor.getHtml().replace(/(^\s*)|(\s*$)/g, ''))
            handelChange(editor.getHtml().replace(/(^\s*)|(\s*$)/g, ''), editor.getText())
          }}
          mode="default"
          style={{ height: '300px' }}
        />
      </div>
    </>
  )
}
