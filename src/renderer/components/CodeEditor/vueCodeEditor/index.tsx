import MiniCoderBox from '@renderer/coderBox'
import { useEffect } from 'react'
import { getConfig } from './getVueConfig'

export default function VueCodeEditor() {
  useEffect(() => {
    new MiniCoderBox(getConfig() as any)
  })
  return <div style={{ height: '800px' }} id="coderBoxVueContainer"></div>
}
