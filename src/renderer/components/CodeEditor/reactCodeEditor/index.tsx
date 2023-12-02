import MiniCoderBox from '@renderer/coderBox'
import { useEffect } from 'react'
import { getConfig } from './getReactConfig'

export default function ReactCodeEditor() {
  useEffect(() => {
    new MiniCoderBox(getConfig() as any)
  })
  return <div style={{ height: '800px' }} id="coderBoxContainerReact"></div>
}
