import MiniCoderBox from '@renderer/coderBox'
import { useEffect } from 'react'
import { getConfig } from './getReactConfig'
import { setQuery } from '@renderer/coderBox/utils'

export default function ReactCodeEditor() {
  useEffect(() => {
    setQuery({ code: '' })
    const edit = new MiniCoderBox(getConfig() as any)
    return () => {
      edit.editor.dispose()
    }
  })
  return <div style={{ height: '100%' }} id="coderBoxContainerReact"></div>
}
