import MiniCoderBox from '@renderer/coderBox'
import { useEffect } from 'react'
import { getConfig } from './getVueConfig'
import { setQuery } from '@renderer/coderBox/utils'

export default function VueCodeEditor() {
  useEffect(() => {
    setQuery({ code: '' })
    const edit = new MiniCoderBox(getConfig() as any)
    return () => {
      edit.editor.dispose()
    }
  })
  return <div style={{ height: '100%' }} id="coderBoxVueContainer"></div>
}
