import MiniCoderBox from '@renderer/coderBox'
import { useEffect } from 'react'
import { getConfig } from './getVueConfig'

export default function VueCodeEditor() {
  useEffect(() => {
    const edit = new MiniCoderBox(getConfig() as any)
    return () => {
      edit.editor.dispose()
    }
  })
  return <div style={{ height: '800px' }} id="coderBoxVueContainer"></div>
}
